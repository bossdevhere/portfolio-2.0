import { useState, useEffect } from 'react';

export interface MobileOrientationState {
  isMobile: boolean;
  isPortrait: boolean;
  isMobilePortrait: boolean;
}

export function useMobileOrientation(): MobileOrientationState {
  const [state, setState] = useState<MobileOrientationState>(() => {
    if (typeof window === 'undefined') {
      return { isMobile: false, isPortrait: false, isMobilePortrait: false };
    }

    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || '';
    const isMobileUA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isIPad = /iPad/i.test(userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isMobileDevice = isMobileUA || isIPad;

    const isPortraitOrientation = window.innerHeight > window.innerWidth;

    return {
      isMobile: isMobileDevice,
      isPortrait: isPortraitOrientation,
      isMobilePortrait: isMobileDevice && isPortraitOrientation,
    };
  });

  useEffect(() => {
    const handleCheck = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || '';
      const isMobileUA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isIPad = /iPad/i.test(userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      const isMobileDevice = isMobileUA || isIPad;

      const isPortraitOrientation = window.innerHeight > window.innerWidth;

      setState({
        isMobile: isMobileDevice,
        isPortrait: isPortraitOrientation,
        isMobilePortrait: isMobileDevice && isPortraitOrientation,
      });
    };

    window.addEventListener('resize', handleCheck);
    window.addEventListener('orientationchange', handleCheck);

    return () => {
      window.removeEventListener('resize', handleCheck);
      window.removeEventListener('orientationchange', handleCheck);
    };
  }, []);

  return state;
}
