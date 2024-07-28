import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { setCookie } from './cookie';
import { LoginResponse } from './type';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
});

// 로그아웃
export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.location.href = '/';
};

// accessToken 만료 시 refreshToken 전달
export const postRefreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  const response = await axiosInstance.post<LoginResponse>(
    '/api/login/access',
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );
  return response;
};

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // 만료된 accessToken
    if (error && error.code === 'AUTH_3') {
      originalRequest._retry = true;

      try {
        const response = await postRefreshToken();
        if (response.status === 200) {
          const newAccessToken = response.data.data.accessToken;
          const newRefreshToken = response.data.data.refreshToken;
          localStorage.setItem('accessToken', newAccessToken);
          setCookie('refreshToken', newRefreshToken);

          if (originalRequest.headers) {
            originalRequest.headers = {
              Authorization: `Bearer ${newAccessToken}`,
            };
          }
          return axiosInstance(originalRequest);
        }
      } catch (e) {
        return Promise.reject(e);
      }
    }
    // 유효하지 않거나 일치하지 않거나 만료된 refreshToken
    if (
      error &&
      (error.code === 'AUTH_2' ||
        error.code === 'AUTH_5' ||
        error.code === 'AUTH_4')
    ) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      // 사용자에게 알림
      alert('인증 세션이 만료되었습니다. 다시 로그인해 주세요.');
      logout();
    }

    return Promise.reject(error);
  },
);
