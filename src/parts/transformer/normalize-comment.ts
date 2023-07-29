export default function normalizeComment(comment: string): string {
  return comment
    .replaceAll('\n', ' ')
    .replaceAll(/\s{2,}/g, ' ')
    .trim();
}
