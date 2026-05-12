import { generateSlug } from './generateSlug';
import { Workspace } from '../workspace.model';

export async function generateUniqueSlug(name: string) {
  const base = generateSlug(name);
  let slug = base;
  let counter = 1;

  while (await Workspace.exists({ slug })) {
    slug = `${base}${counter}`;
    counter++;
  }

  return slug;
}
