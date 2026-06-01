import { getAccessToken } from './tokenStore';
import { API_URL } from '../constants';
import { ApiError } from '../utils/ApiError';

export async function fetchBase(
  url: string,
  options: RequestInit & { isRefresh?: boolean } = {}
) {
  const { isRefresh = false, ...restOptions } = options;
  const accessToken = getAccessToken();
  const isFormData = restOptions.body instanceof FormData;
  let response: Response;

  try {
    response = await fetch(`${API_URL}${url}`, {
      ...restOptions,
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...(isRefresh ? {} : { Authorization: `Bearer ${accessToken}` }),
        ...restOptions.headers,
      },
      credentials: 'include',
    });
  } catch {
    throw new ApiError({ code: 'ERROR', message: 'Network error' });
  }

  return response;
}
