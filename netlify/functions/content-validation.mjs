const allowedSections = new Set(["programs", "impactHighlights", "gallery"]);

function validTextItems(items, maxTitle, maxDescription) {
  return items.every((item) =>
    item && Object.keys(item).every((key) => ["title", "description"].includes(key)) &&
    typeof item.title === "string" && item.title.trim().length > 0 && item.title.length <= maxTitle &&
    typeof item.description === "string" && item.description.trim().length > 0 && item.description.length <= maxDescription,
  );
}

export function validateContent(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return "Content must be an object.";
  if (Object.keys(value).some((key) => !allowedSections.has(key)) || [...allowedSections].some((key) => !(key in value))) return "Content has an unsupported or missing section.";
  if (!Array.isArray(value.programs) || value.programs.length > 20) return "Programs must contain at most 20 entries.";
  if (!Array.isArray(value.impactHighlights) || value.impactHighlights.length > 12) return "Impact highlights must contain at most 12 entries.";
  if (!Array.isArray(value.gallery) || value.gallery.length > 36) return "Gallery must contain at most 36 entries.";
  if (!validTextItems(value.programs, 120, 1200)) return "Each program needs a title and description within the allowed lengths.";
  if (!validTextItems(value.impactHighlights, 120, 1200)) return "Each impact highlight needs a title and description within the allowed lengths.";

  const allowedImages = /^\/(images|uploads)\/[a-zA-Z0-9._/-]+$/;
  if (!value.gallery.every((item) =>
    item && Object.keys(item).every((key) => ["title", "image"].includes(key)) &&
    typeof item.title === "string" && item.title.trim().length > 0 && item.title.length <= 120 &&
    typeof item.image === "string" && allowedImages.test(item.image) && !item.image.split("/").includes(".."),
  )) {
    return "Gallery items need a title and a local image under /images or /uploads.";
  }

  return null;
}
