export function trim(path: string) {
  return path.replace(/\/[^/]+$/, '');
}
