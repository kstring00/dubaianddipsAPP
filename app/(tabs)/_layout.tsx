import { Tabs } from 'expo-router';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/constants/theme';

const icons: Record<string, string> = {
  index: '⌂',
  order: '✈',
  rewards: '✦',
  account: 'D',
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.courtyard,
        tabBarInactiveTintColor: '#81736B',
        tabBarShowLabel: true,
        tabBarIcon: ({ color, focused }) => (
          <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
            <Text style={[styles.icon, { color }]}>{icons[route.name] ?? '·'}</Text>
          </View>
        ),
        tabBarLabelStyle: {
          fontFamily: fonts.narrow,
          fontSize: 9,
          fontWeight: '700',
          letterSpacing: 0.4,
          marginTop: -3,
          marginBottom: Platform.OS === 'ios' ? -3 : 6,
        },
        tabBarStyle: {
          backgroundColor: colors.offWhite,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: '#D4C7B8',
          height: Platform.OS === 'ios' ? 82 : 70,
          paddingTop: 7,
          shadowColor: colors.bark,
          shadowOpacity: 0.08,
          shadowRadius: 14,
          shadowOffset: { width: 0, height: -5 },
          elevation: 16,
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="order" options={{ title: 'Order' }} />
      <Tabs.Screen name="rewards" options={{ title: 'Rewards' }} />
      <Tabs.Screen name="account" options={{ title: 'Account' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    width: 36,
    height: 27,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  iconWrapActive: {
    backgroundColor: colors.mintCondition,
  },
  icon: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: '700',
  },
});
