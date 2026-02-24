import slugify from "slugify";

export function buildIssueSlug(title: string) {
  return `${slugify(title, { lower: true, strict: true })}-${Date.now().toString().slice(-6)}`;
}
