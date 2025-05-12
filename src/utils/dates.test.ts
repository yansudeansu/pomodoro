import { describe, it, expect, beforeAll, vi, afterAll } from 'vitest';
import { isSameDay, filterToday, getWeeklySummary } from './dates';

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

describe('getWeeklySummary', () => {
  const mockToday = new Date('2025-05-14T12:00:00.000Z'); // Tuesday

  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockToday);
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('returns 7 days starting from Monday', () => {
    const summary = getWeeklySummary([]);
    expect(summary).toHaveLength(7);
    expect(summary[0].date.getDay()).toBe(1); // Monday
    expect(summary[6].date.getDay()).toBe(0); // Sunday
  });

  it('counts completed entries on the correct day', () => {
    const entries = [
      { completedAt: '2025-05-13T10:00:00.000Z' }, // Tue
      { completedAt: '2025-05-13T11:00:00.000Z' }, // Tue
      { completedAt: '2025-05-14T12:00:00.000Z' }, // Wed
    ];
    const summary = getWeeklySummary(entries);

    const tuesday = summary.find((d) => d.date.toISOString().startsWith('2025-05-13'));
    const wednesday = summary.find((d) => d.date.toISOString().startsWith('2025-05-14'));

    expect(tuesday?.count).toBe(2);
    expect(wednesday?.count).toBe(1);
  });

  it('returns zero count for days with no entries', () => {
    const entries = [
      { completedAt: '2025-05-12T08:00:00.000Z' }, // Mon
    ];
    const summary = getWeeklySummary(entries);

    const counts = summary.map((d) => d.count);
    expect(counts.filter((c) => c === 0).length).toBe(6);
    expect(counts.filter((c) => c === 1).length).toBe(1);
  });

  it('ignores entries outside the current week', () => {
    const entries = [
      { completedAt: '2025-05-11T23:59:59.000Z' }, // Sunday before
      { completedAt: '2025-05-19T00:00:00.000Z' }, // Next Monday
    ];
    const summary = getWeeklySummary(entries);
    const total = summary.reduce((sum, d) => sum + d.count, 0);
    expect(total).toBe(0);
  });
});
