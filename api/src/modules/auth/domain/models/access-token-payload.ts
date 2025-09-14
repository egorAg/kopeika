export interface AccessTokenPayload {
  sub: string;
  sid: string;
  email: string;
  iat?: number;
  exp?: number;
}
