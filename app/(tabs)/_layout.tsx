import { Tabs } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts } from '@/constants/theme';
import { haptics } from '@/lib/haptics';

type IoniconName = keyof typeof Ionicons.glyphMap;

const tabs: Record<string, { label: string; icon: IoniconName; iconActive: IoniconName }> = {
  index: { label: 'Home', icon: 'home-outline', iconActive: 'home' },
  order: { label: 'Order', icon: 'airplane-outline', iconActive: 'airplane' },
  rewards: { label: 'Rewards', icon: 'star-outline', iconActive: 'star' },
  account: { label: 'Account', icon: 'person-outline', iconActive: 'person' },
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => {
        const tab = tabs[route.name];
        return {
          headerShown: false,
          tabBarActiveTintColor: colors.green,
          tabBarInactiveTintColor: '#8A7D72',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              <Ionicons
                name={focused ? tab.iconActive : tab.icon}
                size={20}
                color={color}
              />
            </View>
          ),
          tabBarLabelStyle: styles.label,
          tabBarStyle: styles.bar,
          tabBarItemStyle: styles.item,
        };
      }}
      screenListeners={{
        tabPress: () => haptics.select(),
      }}
    >
      {Object.entries(tabs).map(([name, tab]) => (
        <Tabs.Screen key={name} name={name} options={{ title: tab.label }} />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.canvas,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.line,
    height: Platform.OS === 'ios' ? 80 : 66,
    paddingTop: 6,
    shadowColor: colors.bark,
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
    elevation: 12,
  },
  item: {
    paddingVertical: 2,
  },
  iconWrap: {
    width: 44,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: colors.mint,
  },
  label: {
    fontFamily: fonts.narrowBold,
    fontSize: 10,
    letterSpacing: 0.6,
    marginTop: Platform.OS === 'ios' ? 2 : 0,
    marginBottom: Platform.OS === 'ios' ? 0 : 6,
  },
});
