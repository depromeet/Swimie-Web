import axios from 'axios';
import { cookies } from 'next/headers';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = cookies().get('accessToken')?.value;
    console.log('토큰:', accessToken);

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
