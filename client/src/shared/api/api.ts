import { fetchBase } from './fetchBase';
import { refresh } from './refresh';

export async function api(
  url: string,
  options: RequestInit = {},
  retry = true
) {
  let response = await fetchBase(url, options);

  if (response.status === 401 && retry) {
    const accessToken = await refresh();

    response = await fetchBase(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return response;
}
