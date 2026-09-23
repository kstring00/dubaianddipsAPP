import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { colors } from '@/constants/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: 'rgba(255,255,255,0.62)',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          letterSpacing: 0.5,
          textTransform: 'uppercase',
          marginBottom: Platform.OS === 'ios' ? -2 : 6,
        },
        tabBarStyle: {
          backgroundColor: colors.pine,
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 88 : 70,
          paddingTop: 10,
          shadowColor: '#000',
          shadowOpacity: 0.14,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: -8 },
          elevation: 18,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="order" options={{ title: 'Order' }} />
      <Tabs.Screen name="rewards" options={{ title: 'Rewards' }} />
      <Tabs.Screen name="account" options={{ title: 'You' }} />
    </Tabs>
  );
}
