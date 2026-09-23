import { Tabs } from 'expo-router';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/theme';

const icons: Record<string, string> = {
  index: '⌂',
  order: '▱',
  rewards: '♢',
  account: '○',
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.pine,
        tabBarInactiveTintColor: '#7B756C',
        tabBarShowLabel: true,
        tabBarIcon: ({ color, focused }) => (
          <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
            <Text style={[styles.icon, { color }]}>{icons[route.name] ?? '·'}</Text>
          </View>
        ),
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
          marginTop: -3,
          marginBottom: Platform.OS === 'ios' ? -3 : 6,
        },
        tabBarStyle: {
          backgroundColor: 'rgba(255,253,248,0.98)',
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: colors.line,
          height: Platform.OS === 'ios' ? 82 : 70,
          paddingTop: 7,
          shadowColor: '#2F241D',
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
    backgroundColor: 'rgba(32,63,44,0.10)',
  },
  icon: {
    fontSize: 22,
    lineHeight: 24,
    fontWeight: '700',
  },
});
