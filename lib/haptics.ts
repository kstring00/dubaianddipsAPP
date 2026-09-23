import * as Haptics from 'expo-haptics';

/**
 * Intentional haptic vocabulary:
 *  - tap: light touch on secondary elements (category tickets, rows)
 *  - select: tab changes and toggles
 *  - primary: main CTAs (Start order, Toast handoff)
 *  - success: reserved for future confirmed states
 *
 * All calls are fire-and-forget and swallow failures (e.g. web, simulators).
 */

function fire(run: () => Promise<void>) {
  run().catch(() => {});
}

export const haptics = {
  tap: () => fire(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)),
  select: () => fire(() => Haptics.selectionAsync()),
  primary: () => fire(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)),
  success: () =>
    fire(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)),
};
