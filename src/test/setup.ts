import { beforeAll, vi } from 'vitest';
import '@testing-library/jest-dom';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

const originalWarn = console.warn;
const originalError = console.error;

beforeAll(() => {
  vi.spyOn(console, 'warn').mockImplementation((msg, ...args) => {
    if (
      typeof msg === 'string' &&
      (msg.includes('[WakeLock release]') || msg.includes('Wake Lock API not supported'))
    ) {
      return;
    }

    originalWarn(msg, ...args);
  });

  vi.spyOn(console, 'error').mockImplementation((msg, ...args) => {
    if (
      typeof msg === 'string' &&
      (/wake lock.*release/i.test(msg) || msg.includes('release failed'))
    ) {
      return;
    }
    originalError(msg, ...args);
  });
});

global.ResizeObserver = ResizeObserver;

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});
