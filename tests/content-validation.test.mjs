import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import defaults from "../src/content/site.json" with { type: "json" };
import { validateContent } from "../netlify/functions/content-validation.mjs";
import { adminAuthorization } from "../netlify/functions/authorization.mjs";
import { siteContentStoreName } from "../netlify/functions/site-content-store.mjs";

test("reviewed site content is valid", () => {
  assert.equal(validateContent(defaults), null);
});

test("rejects missing and extra content sections", () => {
  assert.match(validateContent({ programs: [], gallery: [] }), /missing section/);
  assert.match(validateContent({ ...defaults, privateSubmissions: [] }), /unsupported/);
});

test("rejects empty or overlong program text", () => {
  const content = structuredClone(defaults);
  content.programs[0].description = "  ";
  assert.match(validateContent(content), /program needs a title and description/);

  const tooLong = structuredClone(defaults);
  tooLong.programs[0].description = "x".repeat(1201);
  assert.match(validateContent(tooLong), /allowed lengths/);
});

test("rejects remote and path-traversal gallery images", () => {
  const remote = structuredClone(defaults);
  remote.gallery[0].image = "https://example.com/photo.jpg";
  assert.match(validateContent(remote), /local image/);

  const traversal = structuredClone(defaults);
  traversal.gallery[0].image = "/uploads/../private.jpg";
  assert.match(validateContent(traversal), /local image/);
});

test("enforces content entry limits", () => {
  const content = structuredClone(defaults);
  content.programs = Array.from({ length: 21 }, () => ({ title: "Program", description: "Details" }));
  assert.match(validateContent(content), /at most 20/);
});

test("admin access is denied by default and requires the server role", () => {
  assert.equal(adminAuthorization(null).status, 401);
  assert.equal(adminAuthorization({ email: "editor@example.com", roles: ["editor"] }).status, 403);
  assert.equal(adminAuthorization({ email: "admin@example.com", roles: ["admin"] }), null);
});

test("Netlify content storage is isolated by deploy context", () => {
  assert.equal(siteContentStoreName("production"), "kaunyangi-content-production");
  assert.equal(siteContentStoreName("deploy-preview"), "kaunyangi-content-deploy-preview");
  assert.notEqual(siteContentStoreName("production"), siteContentStoreName("deploy-preview"));
  assert.throws(() => siteContentStoreName(undefined), /deploy context is unavailable/);
});

test("website and admin source contain no emoji characters", async () => {
  const files = [];
  async function collect(path) {
    for (const entry of await readdir(path, { withFileTypes: true })) {
      const fullPath = join(path, entry.name);
      if (entry.isDirectory()) await collect(fullPath);
      else if (/\.(jsx?|html|css|json|svg)$/i.test(entry.name)) files.push(fullPath);
    }
  }
  await collect(fileURLToPath(new URL("../src", import.meta.url)));
  await collect(fileURLToPath(new URL("../public", import.meta.url)));
  files.push(fileURLToPath(new URL("../index.html", import.meta.url)));

  const emoji = /\p{Extended_Pictographic}/u;
  for (const file of files) {
    const source = await readFile(file, "utf8");
    assert.equal(emoji.test(source.replace(/[©®™]/gu, "")), false, `emoji found in ${file}`);
  }
});

test("static Netlify form definitions cover all public enquiry types", async () => {
  const html = await readFile(new URL("../public/forms.html", import.meta.url), "utf8");
  for (const [name, fields] of Object.entries({
    contact: ["name", "email", "subject", "message"],
    partnership: ["organization", "email", "phone", "message"],
    volunteer: ["name", "email", "phone", "message"],
  })) {
    const form = html.match(new RegExp(`<form[^>]*name="${name}"[\\s\\S]*?<\\/form>`))?.[0];
    assert.ok(form, `missing static ${name} form`);
    assert.match(form, /data-netlify="true"/);
    assert.match(form, new RegExp(`name="form-name" value="${name}"`));
    assert.match(form, /name="bot-field"/);
    for (const field of fields) assert.match(form, new RegExp(`name="${field}"`));
  }
});
