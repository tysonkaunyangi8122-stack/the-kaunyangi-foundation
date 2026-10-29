import defaultContent from "../../src/content/site.json" with { type: "json" };
import { getSiteContentStore } from "./site-content-store.mjs";

export default async function handler(_request, context) {
  const store = getSiteContentStore(context.deploy.context);
  const savedContent = await store.get("site-content", { type: "json" });
  return Response.json(savedContent ?? defaultContent, {
    headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" },
  });
}
