import { buildOngoingNotification } from './notificationHelper';

export function startOngoingNotification(title: string, text: string) {
  const notification = buildOngoingNotification(title, text);
  // Real foreground service setup must be implemented natively via plugin.
  // For now we return the notification object so native side or tests can consume it.
  return notification;
}
