# The Kaunyangi Foundation

Responsive React and Vite website for The Kaunyangi Foundation. The site is a single-page application with routes for `/`, `/donate`, `/partner`, `/volunteer`, and `/admin`.

## Local preview

```sh
npm install
npm run dev
```

The Vite preview runs locally and does not publish or change the live Netlify site. Use `npm run build` to make a production build in `dist/`.

## Netlify routing and forms

`public/_redirects` maps the content and administrator API routes to Netlify Functions, then sends unmatched browser routes to the React app. This lets the app render its own not-found page while direct routes and refreshes work.

Netlify Forms definitions are in `public/forms.html`; the visible React forms use matching names and fields. The existing Netlify site has form detection enabled and currently lists `partnership` and `volunteer`. After deploying this branch, confirm that `contact` appears in the Forms dashboard before using it. The existing email notifications cover partnership and volunteer submissions; add a contact notification if one is wanted. Local Vite runs cannot confirm delivery to Netlify Forms.

The existing Netlify project is linked to this GitHub repository. Its current deployment settings build Deploy Previews for pull requests, while branch deploys are disabled. The dashboard currently marks both production and Deploy Preview visibility as private; the team has only its owner account. A draft pull request from this branch to `master` is needed to trigger the preview, and it must remain unmerged until production release approval.

## Administrator setup

The dashboard uses Netlify Identity for sign-in, Netlify Functions for server-side authorization, and Netlify Blobs for saved content. It does not contain a default password or public sign-up flow. Content storage is selected by Netlify deploy context, so Deploy Preview writes do not replace the production content store.

Before using `/admin` on a Netlify deploy:

1. Enable Netlify Identity for the site and set registration to invite-only.
2. Invite the owner/admin account and assign it the `admin` role.
3. Confirm Netlify Identity is enabled for the site; Netlify Functions are configured in `netlify.toml`, and Blobs are provisioned by the Netlify Functions runtime.
4. Set `NETLIFY_ACCESS_TOKEN` as a private Netlify environment variable with Forms read access, and set `NETLIFY_SITE_ID` to the project ID if it is not already available to functions.

The Forms API token is used only by `netlify/functions/admin-submissions.mjs`; it is never sent to the browser. Form submissions remain private to administrators. Public website content falls back to the reviewed JSON in `src/content/site.json` until an administrator saves an update.

Gallery edits can use images under `/images/` or `/uploads/`. The six current gallery photos are in `public/images/`. New image uploads are not implemented in this first version.

## Branch safety

Development is on `codex/foundation-completion`. The tracked edits that were present before this work were preserved, and their original patch is saved as `foundation-pre-completion.patch`. This branch is intended for a private Netlify preview; do not merge it into `master` to release production.
