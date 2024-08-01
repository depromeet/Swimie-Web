import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name: string, value?: string, options?: object) => {
  return cookies.set(name, value, { ...options });
};

export const getCookie = (name: string): string => {
  return cookies.get(name) as string;
};

export const removeCookie = (name: string) => {
  return cookies.remove(name);
};
