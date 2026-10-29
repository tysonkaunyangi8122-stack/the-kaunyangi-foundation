import { getUser } from "@netlify/identity";
import { adminAuthorization } from "./authorization.mjs";

const allowedForms = new Set(["contact", "partnership", "volunteer"]);
const allowedFields = ["name", "organization", "email", "phone", "subject", "message"];

export default async function handler(request) {
  if (request.method !== "GET") {
    return Response.json({ error: "Method not allowed." }, { status: 405, headers: { Allow: "GET" } });
  }

  const user = await getUser();
  const authResponse = adminAuthorization(user);
  if (authResponse) return authResponse;

  const accessToken = process.env.NETLIFY_ACCESS_TOKEN;
  const siteId = process.env.NETLIFY_SITE_ID;
  if (!accessToken || !siteId) {
    return Response.json({ error: "Submission review is not configured. Set NETLIFY_ACCESS_TOKEN and NETLIFY_SITE_ID in the Netlify function environment." }, { status: 503 });
  }

  const headers = { Authorization: `Bearer ${accessToken}`, Accept: "application/json" };
  try {
    const formsResponse = await fetch(`https://api.netlify.com/api/v1/sites/${encodeURIComponent(siteId)}/forms?per_page=100`, { headers });
    if (!formsResponse.ok) throw new Error(`Forms API returned ${formsResponse.status}`);
    const forms = await formsResponse.json();
    const selectedForms = forms.filter((form) => allowedForms.has(form.name));

    const submissions = (await Promise.all(selectedForms.map(async (form) => {
      const response = await fetch(`https://api.netlify.com/api/v1/forms/${encodeURIComponent(form.id)}/submissions?per_page=100`, { headers });
      if (!response.ok) throw new Error(`Submissions API returned ${response.status}`);
      const records = await response.json();
      return records.map((record) => {
        const data = Object.fromEntries(allowedFields.filter((field) => typeof record.data?.[field] === "string").map((field) => [field, record.data[field]]));
        return { id: record.id, form: form.name, createdAt: record.created_at, data };
      });
    }))).flat().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return Response.json({ submissions }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Could not load form submissions. Check the Netlify API token, site ID, and Forms API access." }, { status: 502 });
  }
}
