import { getUser, verifyRequestOrigin } from "@netlify/identity";
import defaultContent from "../../src/content/site.json" with { type: "json" };
import { adminAuthorization } from "./authorization.mjs";
import { validateContent } from "./content-validation.mjs";
import { getSiteContentStore } from "./site-content-store.mjs";
const contentKey = "site-content";

export default async function handler(request, context) {
  const user = await getUser();
  const authResponse = adminAuthorization(user);
  if (authResponse) return authResponse;

  const store = getSiteContentStore(context.deploy.context);

  if (request.method === "GET") {
    const content = await store.get(contentKey, { type: "json" });
    return Response.json(content ?? defaultContent, { headers: { "Cache-Control": "no-store" } });
  }

  if (request.method !== "PUT") {
    return Response.json({ error: "Method not allowed." }, { status: 405, headers: { Allow: "GET, PUT" } });
  }

  try {
    verifyRequestOrigin(request);
  } catch {
    return Response.json({ error: "Request origin is not allowed." }, { status: 403 });
  }

  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > 150_000) return Response.json({ error: "Content is too large." }, { status: 413 });

  let content;
  try {
    content = await request.json();
  } catch {
    return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const validationError = validateContent(content);
  if (validationError) return Response.json({ error: validationError }, { status: 400 });

  await store.set(contentKey, JSON.stringify(content), {
    metadata: { updatedBy: user.email ?? "admin", updatedAt: new Date().toISOString() },
  });
  return Response.json({ ok: true, content }, { headers: { "Cache-Control": "no-store" } });
}
