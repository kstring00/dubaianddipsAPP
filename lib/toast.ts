import { Alert, Linking } from 'react-native';

const env = process.env;

export const toastLinks = {
  order: env.EXPO_PUBLIC_TOAST_ORDER_URL ?? '',
  frappes: env.EXPO_PUBLIC_TOAST_FRAPPES_URL ?? '',
  matcha: env.EXPO_PUBLIC_TOAST_MATCHA_URL ?? '',
  coffee: env.EXPO_PUBLIC_TOAST_COFFEE_URL ?? '',
  featured: env.EXPO_PUBLIC_TOAST_FEATURED_URL ?? '',
  rewards: env.EXPO_PUBLIC_TOAST_REWARDS_URL ?? '',
};

export const previewMode = env.EXPO_PUBLIC_PREVIEW_MODE !== 'false';

export function hasToastLink(url?: string) {
  return Boolean(
    url &&
      /^https?:\/\//.test(url) &&
      !url.includes('REPLACE_ME')
  );
}

export async function openToast(url?: string) {
  const destination = hasToastLink(url) ? url! : toastLinks.order;

  if (!hasToastLink(destination)) {
    Alert.alert(
      'Online ordering is almost here',
      'Dubai & Dips will connect this button to Toast as soon as online ordering is activated.'
    );
    return false;
  }

  const supported = await Linking.canOpenURL(destination);
  if (!supported) {
    Alert.alert('Unable to open ordering', 'Please try again in a moment.');
    return false;
  }

  await Linking.openURL(destination);
  return true;
}
