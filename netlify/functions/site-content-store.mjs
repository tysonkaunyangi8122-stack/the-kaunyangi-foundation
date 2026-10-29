import { getStore } from "@netlify/blobs";

export function siteContentStoreName(deployContext) {
  if (typeof deployContext !== "string" || !/^[a-z0-9-]{1,40}$/i.test(deployContext)) {
    throw new Error("Netlify deploy context is unavailable; refusing to select a shared content store.");
  }
  const contextName = deployContext.toLowerCase();
  return `kaunyangi-content-${contextName}`;
}

export function getSiteContentStore(deployContext) {
  return getStore(siteContentStoreName(deployContext));
}
