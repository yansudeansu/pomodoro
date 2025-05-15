import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useVisibilityObserver } from './useVisibilityObserver';

type Options = {
  onError?: (err: Error, type: 'request' | 'release') => void;
  onLock?: (lock: WakeLockSentinel) => void;
  onRelease?: (lock: WakeLockSentinel) => void;
};

type UseWakeLockResult = {
  isSupported: boolean;
  isLocked: boolean;
  request: () => void;
  release: () => void;
};

export function useWakeLock(options?: Options): UseWakeLockResult {
  const isVisible = useVisibilityObserver();
  const [isLocked, setIsLocked] = useState(false);
  const [lock, setLock] = useState<WakeLockSentinel | null>(null);

  const wakeLockInFlight = useRef(false);
  const wakeLockReleasedManually = useRef(false);

  const isSupported = typeof navigator !== 'undefined' && 'wakeLock' in navigator;

  const optionsRef = useRef(options);
  const onError = useCallback((err: Error, type: 'request' | 'release') => {
    optionsRef.current?.onError?.(err, type);
  }, []);
  const onLock = useCallback((lock: WakeLockSentinel) => {
    optionsRef.current?.onLock?.(lock);
  }, []);
  const onRelease = useCallback((lock: WakeLockSentinel) => {
    optionsRef.current?.onRelease?.(lock);
  }, []);

  const request = useCallback(async () => {
    if (!isSupported) return;

    if (wakeLockInFlight.current || (lock && !lock.released)) return;

    wakeLockReleasedManually.current = false;
    wakeLockInFlight.current = true;

    try {
      const wakeLock = await navigator.wakeLock.request('screen');

      wakeLock.addEventListener('release', () => {
        setIsLocked(false);
        onRelease(wakeLock);
      });

      setLock(wakeLock);
      setIsLocked(true);
      onLock(wakeLock);
    } catch (err) {
      onError(err instanceof Error ? err : new Error('Unknown request error'), 'request');
    } finally {
      wakeLockInFlight.current = false;
    }
  }, [isSupported, lock, onLock, onRelease, onError]);

  const release = useCallback(async () => {
    if (!isSupported || !lock) return;

    try {
      wakeLockReleasedManually.current = true;
      await lock.release();
    } catch (err) {
      onError(err instanceof Error ? err : new Error('Unknown release error'), 'release'); // not covered
    }
  }, [isSupported, lock, onError]);

  useEffect(() => {
    if (isSupported && isVisible && lock?.released && !wakeLockReleasedManually.current) {
      void request();
    }
  }, [isVisible, isSupported, lock, request]);

  return useMemo(
    () => ({
      isSupported,
      isLocked,
      request,
      release,
    }),
    [isSupported, isLocked, request, release]
  );
}
