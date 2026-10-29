export function adminAuthorization(user) {
  if (!user) return Response.json({ error: "Sign in required." }, { status: 401 });
  if (!user.roles?.includes("admin")) return Response.json({ error: "Administrator access required." }, { status: 403 });
  return null;
}
