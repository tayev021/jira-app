import { getAccessToken } from './tokenStore';
import { API_URL } from '../constants';
import { ApiError } from '../utils/ApiError';

export async function fetchBase(url: string, options: RequestInit = {}) {
  const accessToken = getAccessToken();
  const isFormData = options.body instanceof FormData;
  let response: Response;

  try {
    response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        Authorization: `Bearer ${accessToken}`,
        ...options.headers,
      },
      credentials: 'include',
    });
  } catch {
    throw new ApiError({ code: 'ERROR', message: 'Network error' });
  }

  return response;
}
