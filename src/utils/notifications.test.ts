import { describe, it, vi, beforeEach, afterEach, expect, Mock } from 'vitest';

let requestNotificationPermission: typeof import('./notifications').requestNotificationPermission;

describe('requestNotificationPermission', () => {
  let originalNotification: typeof globalThis.Notification;
  let requestPermissionMock: Mock;

  beforeEach(async () => {
    vi.resetModules();

    requestNotificationPermission = (await import('./notifications')).requestNotificationPermission;

    originalNotification = globalThis.Notification;

    requestPermissionMock = vi.fn().mockResolvedValue('granted');

    globalThis.Notification = {
      requestPermission: requestPermissionMock,
      permission: 'default',
    } as unknown as typeof Notification;
  });

  afterEach(() => {
    globalThis.Notification = originalNotification;
  });

  it('calls Notification.requestPermission once and sets requested flag', async () => {
    await requestNotificationPermission();
    expect(requestPermissionMock).toHaveBeenCalledTimes(1);

    await requestNotificationPermission();
    expect(requestPermissionMock).toHaveBeenCalledTimes(1);
  });

  it('logs a warning when permission is denied', async () => {
    requestPermissionMock.mockResolvedValueOnce('denied');
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    await requestNotificationPermission();

    expect(warnSpy).toHaveBeenCalledWith('Notification permission denied');
    warnSpy.mockRestore();
  });

  it('does nothing if Notification is not in window', async () => {
    // @ts-expect-error intentionally removing for test
    delete globalThis.Notification;

    await expect(requestNotificationPermission()).resolves.toBeUndefined();
  });
});
