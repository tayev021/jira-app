import { getAccessToken } from './tokenStore';
import { API_URL } from '../constants';
import { ApiError } from '../utils/ApiError';

export async function fetchBase(url: string, options: RequestInit = {}) {
  const accessToken = getAccessToken();
  let response: Response;

  try {
    response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: 'include',
    });
  } catch {
    throw new ApiError({ code: 'ERROR', message: 'Network error' });
  }

  return response;
}
