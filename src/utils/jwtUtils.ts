import { jwtDecode } from 'jwt-decode';

type TokenPayload = never;

export function decodeJwt(token: string) {
  try {
    return jwtDecode<TokenPayload>(token);
  } catch {
    return '';
  }
}
