import { useEffect, useState } from "react";
import { getUser, handleAuthCallback, login, logout } from "@netlify/identity";
import defaults from "../content/site.json";

async function readJson(response) {
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || `Request failed (${response.status}).`);
  return result;
}

function Admin() {
  const [authState, setAuthState] = useState("checking");
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [content, setContent] = useState(defaults);
  const [submissions, setSubmissions] = useState([]);
  const [submissionState, setSubmissionState] = useState({ state: "loading", message: "Loading submissions…" });
  const [saveState, setSaveState] = useState({ state: "idle", message: "" });

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        await handleAuthCallback();
        const currentUser = await getUser();
        if (!active) return;
        setUser(currentUser);
        setAuthState("ready");
      } catch {
        if (active) {
          setAuthError("Sign-in could not be checked. Confirm that Netlify Identity is enabled for this site.");
          setAuthState("ready");
        }
      }
    })();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!user?.roles?.includes("admin")) return;
    let active = true;
    fetch("/api/admin-content", { headers: { Accept: "application/json" } })
      .then(readJson)
      .then((savedContent) => { if (active) setContent(savedContent); })
      .catch((error) => { if (active) setSaveState({ state: "error", message: error.message }); });

    fetch("/api/admin-submissions", { headers: { Accept: "application/json" } })
      .then(readJson)
      .then(({ submissions: items }) => {
        if (active) {
          setSubmissions(items);
          setSubmissionState({ state: "ready", message: "" });
        }
      })
      .catch((error) => { if (active) setSubmissionState({ state: "error", message: error.message }); });

    return () => { active = false; };
  }, [user]);

  async function handleLogin(event) {
    event.preventDefault();
    setAuthError("");
    setAuthState("signing-in");
    try {
      const authenticatedUser = await login(email.trim(), password);
      setPassword("");
      setUser(authenticatedUser);
      setAuthState("ready");
    } catch {
      setAuthError("Sign-in failed. Check your details or ask the site owner to invite your administrator account.");
      setAuthState("ready");
    }
  }

  async function handleLogout() {
    try {
      await logout();
      setUser(null);
      setContent(defaults);
      setSubmissions([]);
      setSaveState({ state: "idle", message: "" });
      setSubmissionState({ state: "loading", message: "Loading submissions…" });
    } catch {
      setAuthError("Could not end the session. Please close this browser tab and sign out of the Netlify session.");
    }
  }

  async function handleSave(event) {
    event.preventDefault();
    setSaveState({ state: "saving", message: "Saving website content…" });
    try {
      const response = await fetch("/api/admin-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(content),
      });
      const result = await readJson(response);
      setContent(result.content);
      setSaveState({ state: "success", message: "Website content saved." });
    } catch (error) {
      setSaveState({ state: "error", message: error.message || "Could not save website content." });
    }
  }

  function updateItem(section, index, field, value) {
    setContent((current) => ({
      ...current,
      [section]: current[section].map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item),
    }));
  }

  function removeItem(section, index) {
    setContent((current) => ({ ...current, [section]: current[section].filter((_, itemIndex) => itemIndex !== index) }));
  }

  function addItem(section, item) {
    setContent((current) => ({ ...current, [section]: [...current[section], item] }));
  }

  if (authState === "checking") {
    return <section className="admin-page"><p role="status">Checking administrator access…</p></section>;
  }

  if (!user) {
    return (
      <section className="admin-page">
        <div className="admin-login">
          <h1>Foundation administration</h1>
          <p>Sign in with an invited administrator account. Public registration is disabled.</p>
          <form className="engagement-form" onSubmit={handleLogin}>
            <label htmlFor="admin-email">Email address<input id="admin-email" type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
            <label htmlFor="admin-password">Password<input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
            {authError && <p className="form-feedback" data-state="error" role="alert">{authError}</p>}
            <button type="submit" className="primary-btn" disabled={authState === "signing-in"}>{authState === "signing-in" ? "Signing in…" : "Sign in"}</button>
          </form>
          <p className="admin-setup-note">An owner must enable Netlify Identity, invite the administrator, and assign the <code>admin</code> role in Netlify before this dashboard can be used.</p>
        </div>
      </section>
    );
  }

  if (!user.roles?.includes("admin")) {
    return (
      <section className="admin-page">
        <div className="admin-login">
          <h1>Administrator access required</h1>
          <p>This account is signed in, but it does not have the administrator role.</p>
          <button type="button" className="secondary-btn" onClick={handleLogout}>Sign out</button>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-page">
      <div className="admin-dashboard">
        <div className="admin-heading">
          <div><p className="admin-eyebrow">Private tools</p><h1>Foundation dashboard</h1><p>Signed in as {user.email}</p></div>
          <button type="button" className="secondary-btn" onClick={handleLogout}>Sign out</button>
        </div>

        <div className="admin-notice"><strong>Content only</strong><span>Impact highlights are narrative. Add numbers to public materials only after verifying them.</span></div>

        <form className="admin-content-form" onSubmit={handleSave}>
          <section className="admin-section">
            <div className="admin-section-heading"><div><h2>Programs</h2><p>Edit the program cards shown on the homepage.</p></div><button type="button" className="secondary-btn" onClick={() => addItem("programs", { title: "", description: "" })}>Add a program</button></div>
            {content.programs.map((item, index) => (
              <fieldset className="admin-item" key={`program-${index}`}>
                <legend>Program {index + 1}</legend>
                <label>Title<input value={item.title} maxLength={120} onChange={(event) => updateItem("programs", index, "title", event.target.value)} required /></label>
                <label>Description<textarea value={item.description} maxLength={1200} rows="3" onChange={(event) => updateItem("programs", index, "description", event.target.value)} required /></label>
                <button type="button" className="text-button" onClick={() => removeItem("programs", index)}>Remove program</button>
              </fieldset>
            ))}
          </section>

          <section className="admin-section">
            <div className="admin-section-heading"><div><h2>Impact highlights</h2><p>Keep these descriptions factual; they do not display totals.</p></div><button type="button" className="secondary-btn" onClick={() => addItem("impactHighlights", { title: "", description: "" })}>Add a highlight</button></div>
            {content.impactHighlights.map((item, index) => (
              <fieldset className="admin-item" key={`impact-${index}`}>
                <legend>Highlight {index + 1}</legend>
                <label>Title<input value={item.title} maxLength={120} onChange={(event) => updateItem("impactHighlights", index, "title", event.target.value)} required /></label>
                <label>Description<textarea value={item.description} maxLength={1200} rows="3" onChange={(event) => updateItem("impactHighlights", index, "description", event.target.value)} required /></label>
                <button type="button" className="text-button" onClick={() => removeItem("impactHighlights", index)}>Remove highlight</button>
              </fieldset>
            ))}
          </section>

          <section className="admin-section">
            <div className="admin-section-heading"><div><h2>Gallery</h2><p>Use an existing local image path under /images or /uploads.</p></div><button type="button" className="secondary-btn" onClick={() => addItem("gallery", { title: "", image: "/images/community-outreach.jpg" })}>Add a gallery item</button></div>
            {content.gallery.map((item, index) => (
              <fieldset className="admin-item" key={`gallery-${index}`}>
                <legend>Gallery item {index + 1}</legend>
                <label>Photo title<input value={item.title} maxLength={120} onChange={(event) => updateItem("gallery", index, "title", event.target.value)} required /></label>
                <label>Image path<input value={item.image} maxLength={240} pattern="/(images|uploads)/[a-zA-Z0-9._/-]+" onChange={(event) => updateItem("gallery", index, "image", event.target.value)} required /></label>
                <button type="button" className="text-button" onClick={() => removeItem("gallery", index)}>Remove gallery item</button>
              </fieldset>
            ))}
          </section>

          <div className="admin-save-bar">
            <p className="form-feedback" data-state={saveState.state} role="status" aria-live="polite">{saveState.message}</p>
            <button type="submit" className="primary-btn" disabled={saveState.state === "saving"}>{saveState.state === "saving" ? "Saving…" : "Save website content"}</button>
          </div>
        </form>

        <section className="admin-section admin-submissions">
          <h2>Form submissions</h2>
          <p>Contact, partnership, and volunteer submissions are available only to administrators.</p>
          {submissionState.state === "loading" && <p role="status">{submissionState.message}</p>}
          {submissionState.state === "error" && <p className="form-feedback" data-state="error" role="alert">{submissionState.message}</p>}
          {submissionState.state === "ready" && submissions.length === 0 && <p className="admin-empty">No submissions to show yet.</p>}
          {submissions.map((submission) => (
            <article className="submission-card" key={submission.id}>
              <div className="submission-heading"><h3>{submission.data.subject || submission.data.organization || submission.data.name || "Enquiry"}</h3><span>{submission.form}</span></div>
              <p><time dateTime={submission.createdAt}>{new Date(submission.createdAt).toLocaleString()}</time></p>
              {submission.data.email && <p><a href={`mailto:${submission.data.email}`}>{submission.data.email}</a></p>}
              {submission.data.phone && <p><a href={`tel:${submission.data.phone}`}>{submission.data.phone}</a></p>}
              {submission.data.message && <p className="submission-message">{submission.data.message}</p>}
            </article>
          ))}
        </section>

        <p className="admin-setup-note">This dashboard needs Netlify Identity and Blobs enabled. Submission review also needs the server-only Netlify API environment variables shown in the project setup notes.</p>
      </div>
    </section>
  );
}

export default Admin;
