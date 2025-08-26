import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useStatusHistory } from './useStatusHistory';
import type { StatusEntry } from '../components/organisms/StatusHistory/StatusHistory';

vi.mock('../constants', () => ({
  STATUS_URL: 'https://api.example.com/status',
}));

describe('useStatusHistory', () => {
  const mockFetch = vi.fn<typeof fetch>();

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals?.();
    vi.stubGlobal('fetch', mockFetch as unknown as typeof fetch);
    mockFetch.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals?.();
  });

  it('returns early if STATUS_URL is falsy', async () => {
    vi.resetModules();
    vi.doMock('../constants', () => ({ STATUS_URL: '' }));

    const { useStatusHistory: useStatusHistoryWithEmptyUrl } = await import('./useStatusHistory');
    const { result } = renderHook(() => useStatusHistoryWithEmptyUrl());

    act(() => result.current.handleStatusClick());

    expect(mockFetch).not.toHaveBeenCalled();
    expect(result.current.statusHistory).toBeNull();
  });

  it('initializes with showStatus=false and statusHistory=null', () => {
    const { result } = renderHook(() => useStatusHistory());

    expect(result.current.showStatus).toBe(false);
    expect(result.current.statusHistory).toBeNull();
  });

  it('toggles showStatus with handleStatusClick', () => {
    const { result } = renderHook(() => useStatusHistory());

    act(() => result.current.handleStatusClick());

    expect(result.current.showStatus).toBe(true);

    act(() => result.current.handleStatusClick());

    expect(result.current.showStatus).toBe(false);
  });

  it('fetches status history when showStatus becomes true', async () => {
    const mockStatusData: StatusEntry[] = [{ timestamp: '2025-08-14T12:00:00.000Z', status: 'up' }];
    const response = new Response(JSON.stringify(mockStatusData), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
    mockFetch.mockResolvedValueOnce(response);

    const { result } = renderHook(() => useStatusHistory());
    act(() => result.current.handleStatusClick());

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/status');
      expect(result.current.statusHistory).toEqual(mockStatusData);
    });
  });

  it('handles non-ok fetch by setting empty array', async () => {
    const response = new Response('nope', { status: 500 });
    mockFetch.mockResolvedValueOnce(response);

    const { result } = renderHook(() => useStatusHistory());
    act(() => result.current.handleStatusClick());

    await waitFor(() => {
      expect(result.current.statusHistory).toEqual([]);
    });
  });

  it('handles rejected fetch gracefully', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useStatusHistory());
    act(() => result.current.handleStatusClick());

    await waitFor(() => {
      expect(result.current.statusHistory).toEqual([]);
    });
  });

  it('sets statusHistory to null when showStatus becomes false', async () => {
    const mockStatusData: StatusEntry[] = [{ timestamp: '2025-08-14T12:00:00.000Z', status: 'up' }];
    const response = new Response(JSON.stringify(mockStatusData), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
    mockFetch.mockResolvedValueOnce(response);

    const { result } = renderHook(() => useStatusHistory());
    act(() => result.current.handleStatusClick());

    await waitFor(() => {
      expect(result.current.statusHistory).toEqual(mockStatusData);
    });

    act(() => result.current.handleStatusClick());

    expect(result.current.statusHistory).toBeNull();
  });

  it('closes status modal with handleCloseStatusModal', () => {
    const { result } = renderHook(() => useStatusHistory());

    act(() => result.current.handleStatusClick());

    expect(result.current.showStatus).toBe(true);

    act(() => result.current.handleCloseStatusModal());

    expect(result.current.showStatus).toBe(false);
  });

  it('sets empty array when fetch is not available (typeof fetch !== "function")', async () => {
    vi.unstubAllGlobals?.();
    Object.defineProperty(globalThis, 'fetch', {
      value: undefined,
      configurable: true,
      writable: true,
    });

    const { result } = renderHook(() => useStatusHistory());
    act(() => result.current.handleStatusClick());

    await waitFor(() => {
      expect(result.current.statusHistory).toEqual([]);
    });
  });
});
