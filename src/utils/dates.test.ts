import { describe, it, expect } from 'vitest';
import { isSameDay, filterToday } from './dates';

describe('isSameDay', () => {
  it('returns true for same date', () => {
    const date1 = new Date(2025, 4, 12, 10);
    const date2 = new Date(2025, 4, 12, 23, 59, 59);
    expect(isSameDay(date1, date2)).toBe(true);
  });

  it('returns false for different days', () => {
    const date1 = new Date(2025, 4, 11, 23, 59, 59);
    const date2 = new Date(2025, 4, 12, 0, 0, 0);
    expect(isSameDay(date1, date2)).toBe(false);
  });

  it('returns false for different months', () => {
    const date1 = new Date(2025, 3, 12, 10);
    const date2 = new Date(2025, 4, 12, 10);
    expect(isSameDay(date1, date2)).toBe(false);
  });

  it('returns false for different years', () => {
    const date1 = new Date(2024, 4, 12, 10);
    const date2 = new Date(2025, 4, 12, 10);
    expect(isSameDay(date1, date2)).toBe(false);
  });
});

describe('filterToday', () => {
  const today = new Date();
  const todayISO = today.toISOString();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const entries = [
    { id: '1', completedAt: todayISO },
    { id: '2', completedAt: todayISO },
    { id: '3', completedAt: yesterday.toISOString() },
  ];

  it('returns only entries from today', () => {
    const result = filterToday(entries);
    expect(result).toHaveLength(2);
    expect(result.map((e) => e.id)).toEqual(['1', '2']);
  });

  it('returns empty array when no entries match today', () => {
    const result = filterToday([{ id: '3', completedAt: yesterday.toISOString() }]);
    expect(result).toHaveLength(0);
  });
});
