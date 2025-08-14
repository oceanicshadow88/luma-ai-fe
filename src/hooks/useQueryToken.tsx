import { useSearchParams } from 'react-router-dom';
import { decodeJwt } from '@utils/jwtUtils';
import { hasExpiry } from '@utils/dataUtils';

interface TokenPayload {
  exp?: number;
  [key: string]: unknown;
}

export const useQueryToken = (tokenRequired = true) => {
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token') ?? '';
  const decodedPayload = token ? (decodeJwt(token) as unknown as TokenPayload) : null;

  if (tokenRequired) {
    return { isValidToken: token && decodedPayload && decodedPayload.exp && !hasExpiry(decodedPayload.exp), token };
  }

  return { isValidToken: decodedPayload && decodedPayload.exp && !hasExpiry(decodedPayload.exp), token: token };
};