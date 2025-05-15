import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useWakeLock } from './useWakeLock';

type MockWakeLockSentinel = {
  released: boolean;
  addEventListener: (event: 'release', callback: () => void) => void;
  release: () => Promise<void>;
};

class FakeWakeLockSentinel implements MockWakeLockSentinel {
  released = false;
  private onReleaseCallback: (() => void) | null = null;

  addEventListener(event: 'release', callback: () => void) {
    if (event === 'release') {
      this.onReleaseCallback = callback;
    }
  }

  async release() {
    this.released = true;
    if (this.onReleaseCallback) {
      this.onReleaseCallback();
    }
  }
}

let wakeLockRequestMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  wakeLockRequestMock = vi.fn().mockResolvedValue(new FakeWakeLockSentinel());

  Object.defineProperty(global.navigator, 'wakeLock', {
    configurable: true,
    writable: true,
    value: {
      request: wakeLockRequestMock,
    },
  });
});

afterEach(() => {
  Object.defineProperty(navigator, 'wakeLock', {
    configurable: true,
    writable: true,
    value: undefined,
  });
});

describe('useWakeLock', () => {
  it('should detect if wake lock is supported', () => {
    const { result } = renderHook(() => useWakeLock());
    expect(result.current.isSupported).toBe(true);
  });

  it('should acquire wake lock and call onLock', async () => {
    const onLock = vi.fn();
    const { result } = renderHook(() => useWakeLock({ onLock }));

    await act(() => result.current.request());

    expect(onLock).toHaveBeenCalledTimes(1);
    expect(result.current.isLocked).toBe(true);
  });

  it('should release wake lock and call onRelease', async () => {
    const onRelease = vi.fn();
    const { result } = renderHook(() => useWakeLock({ onRelease }));

    await act(() => result.current.request());
    await act(() => result.current.release());

    expect(onRelease).toHaveBeenCalledTimes(1);
    expect(result.current.isLocked).toBe(false);
  });

  it('should not request again if already in-flight', async () => {
    const { result } = renderHook(() => useWakeLock());

    await act(() => result.current.request());
    await act(() => result.current.request());

    expect(wakeLockRequestMock).toHaveBeenCalledTimes(1);
  });

  it('should call onError on request failure', async () => {
    const error = new Error('fail');
    const failingRequest = vi.fn().mockRejectedValueOnce(error);

    Object.defineProperty(global.navigator, 'wakeLock', {
      configurable: true,
      writable: true,
      value: { request: failingRequest },
    });

    const onError = vi.fn();
    const { result } = renderHook(() => useWakeLock({ onError }));

    await act(() => result.current.request());

    expect(onError).toHaveBeenCalledWith(error, 'request');
  });

  it('should call onError on release failure', async () => {
    const error = new Error('release fail');
    const mockSentinel: MockWakeLockSentinel = {
      released: false,
      addEventListener: vi.fn(),
      release: vi.fn().mockRejectedValue(error),
    };

    const failingRequest = vi.fn().mockResolvedValue(mockSentinel);

    Object.defineProperty(global.navigator, 'wakeLock', {
      configurable: true,
      writable: true,
      value: { request: failingRequest },
    });

    const onError = vi.fn();
    const { result } = renderHook(() => useWakeLock({ onError }));

    await act(() => result.current.request());
    await act(() => result.current.release());

    expect(onError).toHaveBeenCalledWith(error, 'release');
  });

  it('should reacquire lock on visibility regain if lock was released and not manually', async () => {
    const wakeLock = new FakeWakeLockSentinel();
    wakeLock.released = true;

    wakeLockRequestMock = vi.fn().mockResolvedValue(wakeLock);

    Object.defineProperty(global.navigator, 'wakeLock', {
      configurable: true,
      writable: true,
      value: {
        request: wakeLockRequestMock,
      },
    });

    vi.mock('./useVisibilityObserver', () => ({
      useVisibilityObserver: () => true,
    }));

    const { result, rerender } = renderHook(() => useWakeLock());

    await act(() => result.current.request());
    await act(() => result.current.release());

    await act(() => rerender());

    expect(wakeLockRequestMock).toHaveBeenCalledTimes(2);
  });

  it('calls onError with generic error if thrown error is not instance of Error', async () => {
    const onError = vi.fn();
    const badError: unknown = 'string error';

    const failingRequest = vi.fn().mockRejectedValueOnce(badError);

    Object.defineProperty(navigator, 'wakeLock', {
      configurable: true,
      writable: true,
      value: { request: failingRequest },
    });

    const { result } = renderHook(() => useWakeLock({ onError }));

    await act(() => result.current.request());

    expect(onError).toHaveBeenCalledWith(expect.any(Error), 'request');
    expect(onError.mock.calls[0][0].message).toMatch(/Unknown request error/);
  });

  it('calls onError with generic error if thrown during release is not an instance of Error', async () => {
    const onError = vi.fn();

    const sentinel: MockWakeLockSentinel = {
      released: false,
      addEventListener: vi.fn(),
      release: vi.fn().mockRejectedValueOnce('non-error string' as unknown),
    };

    const mockRequest = vi.fn().mockResolvedValueOnce(sentinel);

    Object.defineProperty(global.navigator, 'wakeLock', {
      configurable: true,
      writable: true,
      value: { request: mockRequest },
    });

    const { result } = renderHook(() => useWakeLock({ onError }));

    await act(() => result.current.request());
    await act(() => result.current.release());

    expect(onError).toHaveBeenCalledWith(expect.any(Error), 'release');
    expect(onError.mock.calls[0][0].message).toBe('Unknown release error');
  });
});
