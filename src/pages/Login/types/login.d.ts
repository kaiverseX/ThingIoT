export interface ILoginForm {
  username: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  refreshToken: string;
  scope?: string | null;
}
