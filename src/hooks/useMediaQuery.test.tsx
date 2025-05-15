import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMediaQuery } from './useMediaQuery';

interface MutableMediaQueryList extends MediaQueryList {
  matches: boolean;
}

describe('useMediaQuery', () => {
  let matchMediaMock: Mock;
  let sharedMediaList: MutableMediaQueryList;

  beforeEach(() => {
    matchMediaMock = vi.fn().mockImplementation((query) => {
      let listeners: ((ev: MediaQueryListEvent) => void)[] = [];

      const removeEventListener = vi.fn((__dirname, cb) => {
        listeners = listeners.filter((l) => l !== cb);
      });

      sharedMediaList = {
        matches: query === '(min-width: 768px)',
        media: query,
        addEventListener: vi.fn((_, cb) => listeners.push(cb)),
        removeEventListener,
        dispatchEvent: (e: MediaQueryListEvent) => {
          listeners.forEach((cb) => cb(e));
          return true;
        },
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
      };

      return sharedMediaList;
    });

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: matchMediaMock,
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should return true if query matches', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(true);
  });

  it('should return false if query does not match', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 440px)'));
    expect(result.current).toBe(false);
  });

  it('should update when matchMedia emits change event', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 440px)'));
    expect(result.current).toBe(false);

    act(() => {
      sharedMediaList.matches = true;
      sharedMediaList.dispatchEvent({ matches: true } as MediaQueryListEvent);
    });

    expect(result.current).toBe(true);
  });

  it('should return false on initial render if matchMedia is undefined (e.g. SSR', () => {
    const originalMatchMedia = window.matchMedia;

    // @ts-expect-error simulate matchMedia being undefined
    window.matchMedia = undefined;

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));

    expect(result.current).toBe(false);

    window.matchMedia = originalMatchMedia;
  });

  it('should clean up event listener on unmount', () => {
    const { unmount } = renderHook(() => useMediaQuery('(max-width: 400px)'));
    unmount();

    expect(sharedMediaList.removeEventListener).toHaveBeenCalled();
  });
});
