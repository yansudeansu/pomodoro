let requested = false;

export const requestNotificationPermission = async () => {
  if (requested || !('Notification' in window)) return;
  requested = true;

  const result = await Notification.requestPermission();
  if (result !== 'granted') {
    console.warn('Notification permission denied');
  }
};
