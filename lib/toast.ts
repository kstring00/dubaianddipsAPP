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

function isReady(url?: string) {
  return Boolean(url && /^https?:\/\//.test(url) && !url.includes('REPLACE_ME'));
}

export async function openToast(url?: string) {
  const destination = isReady(url) ? url! : toastLinks.order;

  if (!isReady(destination)) {
    Alert.alert(
      'Toast link needed',
      'Add the real Toast Online Ordering URL to EXPO_PUBLIC_TOAST_ORDER_URL in your .env file.'
    );
    return;
  }

  const supported = await Linking.canOpenURL(destination);
  if (!supported) {
    Alert.alert('Unable to open Toast', 'Please check the ordering URL.');
    return;
  }

  await Linking.openURL(destination);
}
