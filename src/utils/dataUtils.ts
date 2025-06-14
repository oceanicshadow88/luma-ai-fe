import { fromUnixTime, isAfter, startOfToday } from 'date-fns';

export const hasExpiry = (unixTime: number) => {
  const expiryDate = fromUnixTime(unixTime);

  // Compare with start of today
  if (isAfter(expiryDate, startOfToday())) {
    return false;
  }
  return true;
};
