import { jwtDecode } from 'jwt-decode';

export type TokenPayload = never;

export function decodeJwt(token: string) {
  try {
    return jwtDecode<TokenPayload>(token);
  } catch {
    return null;
  }
}
