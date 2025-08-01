import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { authService } from '@api/auth/auth';

export type PageStatus = 'ok' | 'guide' | 'notfound';

const mainDomains = ['lumaai.com', 'lumaai.localhost'];
const allowedMainDomainPaths = ['/', '/auth/signup/admin', '/auth/signup/institution'];

export const usePageStatus = (): PageStatus | null => {
    const [status, setStatus] = useState<PageStatus | null>(null);
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;

        const safeSetStatus = (value: PageStatus) => {
            if (isMounted) setStatus(value);
        };

        const determineStatus = async () => {
            try {
                const hostname = window.location.hostname;
                const pathname = location.pathname;

                const isMainDomain = mainDomains.includes(hostname);
                const isSubdomain = mainDomains.some(domain => hostname.endsWith(`.${domain}`));

                if (isMainDomain) {
                    if (allowedMainDomainPaths.includes(pathname)) {
                        safeSetStatus('ok');
                    } else if (pathname === '/dashboard') {
                        safeSetStatus('notfound');
                    } else {
                        safeSetStatus('guide');
                    }
                } else if (isSubdomain) {
                    const isValidSubdomain = await authService.verifySubdomain();
                    safeSetStatus(isValidSubdomain ? 'ok' : 'notfound');
                } else {
                    safeSetStatus('notfound');
                }
            } catch (error) {
                console.error('[usePageStatus] Domain validation failed::', error);
                safeSetStatus('notfound');
            }
        };

        determineStatus();

        return () => {
            isMounted = false;
        };
    }, [location.pathname]);

    return status;
};
