export const isMainDomain = (): boolean => {
  const mainDomains = ['lumaai.com', 'lumaai.localhost'];
  const hostname = window.location.hostname;
  return mainDomains.includes(hostname);
}