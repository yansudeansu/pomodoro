import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useVisibilityObserver } from './useVisibilityObserver';

describe('useVisibilityObserver', () => {
  let originalVisibilityState: PropertyDescriptor | undefined;

  beforeEach(() => {
    originalVisibilityState = Object.getOwnPropertyDescriptor(document, 'visibilityState');
  });

  const setVisibilityState = (state: DocumentVisibilityState) => {
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get: () => state,
    });

    act(() => {
      document.dispatchEvent(new Event('visibilitychange'));
    });
  };

  afterEach(() => {
    if (originalVisibilityState) {
      Object.defineProperty(document, 'visibilityState', originalVisibilityState);
    }
  });

  it('should return true if document is initially visible', () => {
    setVisibilityState('visible');
    const { result } = renderHook(() => useVisibilityObserver());
    expect(result.current).toBe(true);
  });

  it('should return false if document is initially hidden', () => {
    setVisibilityState('hidden');
    const { result } = renderHook(() => useVisibilityObserver());
    expect(result.current).toBe(false);
  });

  it('should update on true when visibility changes to visible', () => {
    setVisibilityState('hidden');
    const { result } = renderHook(() => useVisibilityObserver());

    expect(result.current).toBe(false);

    setVisibilityState('visible');
    expect(result.current).toBe(true);
  });

  it('should update to false when visibility changes to hidden', () => {
    setVisibilityState('visible');
    const { result } = renderHook(() => useVisibilityObserver());

    expect(result.current).toBe(true);

    setVisibilityState('hidden');
    expect(result.current).toBe(false);
  });
});
