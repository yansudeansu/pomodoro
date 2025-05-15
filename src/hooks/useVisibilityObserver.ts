import { useState, useEffect } from 'react';

export function useVisibilityObserver(): boolean {
  const [isVisible, setIsVisible] = useState(() => document.visibilityState === 'visible');

  useEffect(() => {
    const handleVisibleChange = () => {
      setIsVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibleChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibleChange);
    };
  }, []);

  return isVisible;
}
