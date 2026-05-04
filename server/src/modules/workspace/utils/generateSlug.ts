export function generateSlug(name: string): string {
  return name
    .toUpperCase()
    .replace(/[^A-Z0-9 ]/g, '')
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 3);
}
