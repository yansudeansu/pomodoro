import { describe, it, vi, expect, beforeEach } from 'vitest';
import { playAlarm, playStartSound } from './sound';

const playMock = vi.fn(() => Promise.resolve());
const pauseMock = vi.fn();

beforeEach(() => {
  playMock.mockClear();
  pauseMock.mockClear();

  vi.restoreAllMocks();

  vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(playMock);
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(pauseMock);
});

describe('sound', () => {
  it('plays alarm sound and stops others', () => {
    playAlarm();

    expect(pauseMock).toHaveBeenCalled();
    expect(playMock).toHaveBeenCalled();
  });

  it('plays start sound and stops others', () => {
    playStartSound();

    expect(pauseMock).toHaveBeenCalled();
    expect(playMock).toHaveBeenCalled();
  });
});
