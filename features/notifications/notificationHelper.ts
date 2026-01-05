export function buildOngoingNotification(title: string, text: string) {
  // Placeholder: foreground service notifications require native Android code.
  // This helper provides a minimal JS shape for notification metadata.
  return {
    id: 'velox_ongoing',
    title,
    text,
    ongoing: true,
    smallIcon: 'ic_notification'
  };
}
