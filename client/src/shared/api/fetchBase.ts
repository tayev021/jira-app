import { API_URL } from '../constants';
import { getAccessToken } from './tokenStore';

export async function fetchBase(url: string, options: RequestInit = {}) {
  const { headers, ...rest } = options;
  const token = getAccessToken();

  const response = await fetch(`${API_URL}${url}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    credentials: 'include',
  });

  return response;
}
