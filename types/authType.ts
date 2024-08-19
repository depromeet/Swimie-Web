export interface LoginResponse {
  status: number;
  code: string;
  message: string;
  data: {
    userId: number;
    nickname: string;
    accessToken: string;
    refreshToken: string;
    isSignUpComplete: boolean;
  };
}

export interface AuthResponse {
  status: number;
  code: string;
  message: string;
  data: {
    data: {
      userId: number;
      nickname: string;
      accessToken: string;
      refreshToken: string;
      isSignUpComplete: boolean;
    };
  };
}
