import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useChartVisibility } from './useChartVisibility';

describe('useChartVisibility', () => {
  it('initializes with showChart as false', () => {
    const { result } = renderHook(() => useChartVisibility());

    expect(result.current.showChart).toBe(false);
  });

  it('toggles showChart when toggleChart is called', () => {
    const { result } = renderHook(() => useChartVisibility());

    act(() => {
      result.current.toggleChart();
    });

    expect(result.current.showChart).toBe(true);

    act(() => {
      result.current.toggleChart();
    });

    expect(result.current.showChart).toBe(false);
  });
});
