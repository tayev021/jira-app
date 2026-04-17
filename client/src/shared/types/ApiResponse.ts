import type { ApiErrorDto } from './ApiErrorDto';

export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: ApiErrorDto };
