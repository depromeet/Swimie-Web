export interface LoginResponse {
  status: number;
  code: string;
  message: string;
  data: {
    userId: number;
    accessToken: string;
    refreshToken: string;
  };
}

export interface AuthResponse {
  status: number;
  code: string;
  message: string;
  data: {
    data: {
      userId: number;
      accessToken: string;
      refreshToken: string;
    };
  };
}
