import { fetchBase } from './fetchBase';
import { refresh } from './refresh';
import { clearAccessToken } from './tokenStore';

export async function api(
  url: string,
  options: RequestInit & { requiresAuth?: boolean } = {}
) {
  const { requiresAuth = true, ...restOptions } = options;

  let response = await fetchBase(url, restOptions);

  if (response.status === 401 && requiresAuth) {
    try {
      await refresh();
      response = await fetchBase(url, restOptions);
    } catch (error) {
      clearAccessToken();
      throw error;
    }
  }

  return response;
}
