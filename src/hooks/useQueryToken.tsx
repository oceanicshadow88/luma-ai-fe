import { useSearchParams } from 'react-router-dom';
import { decodeJwt } from '@utils/jwtUtils';
import { hasExpiry } from '@utils/dataUtils';

export const useQueryToken = (tokenRequired = true) => {
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token') ?? '';
  const decodedPayload: any = token ? decodeJwt(token) : null;

  if (tokenRequired) {
    return { isValidToken: token && decodedPayload && !hasExpiry(decodedPayload?.exp), token };
  }

  return { isValidToken: decodedPayload && !hasExpiry(decodedPayload?.exp), token: token };
};
