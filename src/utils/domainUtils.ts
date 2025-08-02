export const isMainDomain = (): boolean => {
  const mainDomains = ['lumaai.com', 'lumaai.localhost'];
  const hostname = window.location.hostname;
  return mainDomains.includes(hostname);
}

export const getSubdomain = (): string => {
  const hostname = window.location.hostname;
  const parts = hostname.split('.');
  return parts[0]
};