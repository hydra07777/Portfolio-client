import { useState, useEffect } from 'react';

export function useDeviceType() {
  const [deviceType, setDeviceType] = useState({ isMobile: false, isTablet: false, isDesktop: true });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        setDeviceType({
          isMobile: width < 768,
          isTablet: width >= 768 && width < 1024,
          isDesktop: width >= 1024
        });
      }
    };

    handleResize();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  if (!mounted) {
    return { isMobile: false, isTablet: false, isDesktop: true };
  }

  return deviceType;
}
