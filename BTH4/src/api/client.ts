import { BASE_URL, TIMEOUT } from '../config';

export type ErrorType = 'network' | 'timeout' | 'http';

export interface ApiError {
  type: ErrorType;
  status?: number;
  message: string;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export async function request<T = any>(
  method: HttpMethod,
  endpoint: string,
  body?: any,
  customHeaders?: Record<string, string>
): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => {
    controller.abort();
  }, TIMEOUT);

  const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${BASE_URL}${formattedEndpoint}`;

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...customHeaders,
    };

    const options: RequestInit = {
      method,
      headers,
      signal: controller.signal,
    };

    if (body && method !== 'GET') {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    clearTimeout(timer);

    if (!response.ok) {
      const error: ApiError = {
        type: 'http',
        status: response.status,
        message: `Yêu cầu thất bại với mã lỗi HTTP ${response.status}`,
      };
      throw error;
    }

    const data = await response.json();
    return data as T;
  } catch (err: any) {
    clearTimeout(timer);

    if (err.name === 'AbortError') {
      const error: ApiError = {
        type: 'timeout',
        message: 'Hết thời gian chờ phản hồi từ máy chủ (10s).',
      };
      throw error;
    }

    if (err.type === 'http') {
      throw err;
    }

    const networkError: ApiError = {
      type: 'network',
      message: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra mạng hoặc server.',
    };
    throw networkError;
  }
}

