import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';

import { menuItems } from '@/constants/menu';
import { colors, radius, shadow } from '@/constants/theme';
import { hasToastLink, openToast, toastLinks } from '@/lib/toast';

export default function OrderScreen() {
  const toastLive = hasToastLink(toastLinks.order);

  const onOrder = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await openToast(toastLinks.order);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>DEPARTURES</Text>
          <Text style={styles.title}>Pick your{'
'}next destination.</Text>
          <Text style={styles.subtitle}>
            Browse the Dubai & Dips menu here. Toast will handle the live cart,
            modifiers, payment and pickup once online ordering is activated.
          </Text>
        </View>

        <View style={styles.status}>
          <View style={[styles.statusDot, toastLive && styles.statusDotLive]} />
          <Text style={styles.statusText}>
            {toastLive ? 'TOAST ORDERING LIVE' : 'ONLINE ORDERING · COMING SOON'}
          </Text>
        </View>

        {menuItems.map((item, index) => (
          <Pressable
            key={item.slug}
            onPress={toastLive ? onOrder : () => Haptics.selectionAsync()}
            style={({ pressed }) => [
              styles.item,
              pressed && styles.itemPressed,
            ]}
          >
            <LinearGradient
              colors={[item.accent, '#EFE2CA']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.thumb}
            >
              <View style={styles.thumbHalo} />
              <View style={styles.miniCup}>
                <View style={styles.miniFoam} />
                <View style={styles.miniRibbon} />
              </View>
            </LinearGradient>

            <View style={styles.itemCopy}>
              <Text style={styles.code}>{item.code} · {item.category.toUpperCase()}</Text>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        ))}

        <Pressable
          onPress={onOrder}
          style={({ pressed }) => [
            styles.cta,
            !toastLive && styles.ctaMuted,
            pressed && styles.ctaPressed,
          ]}
        >
          <Text style={styles.ctaText}>
            {toastLive ? 'Open Toast ordering' : 'Toast ordering coming soon'}
          </Text>
          <Text style={styles.ctaArrow}>→</Text>
        </Pressable>

        <Text style={styles.foot}>
          Menu shown here is a design preview until the restaurant's live Toast
          menu is connected.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  content: { padding: 20, paddingBottom: 42 },
  header: { paddingTop: 12, paddingBottom: 20 },
  eyebrow: {
    color: colors.gold,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2.7,
  },
  title: {
    marginTop: 8,
    color: colors.ink,
    fontFamily: 'Georgia',
    fontSize: 39,
    lineHeight: 43,
    letterSpacing: -1.2,
  },
  subtitle: {
    marginTop: 12,
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    maxWidth: 345,
  },
  status: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    height: 31,
    borderRadius: 16,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.line,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 18,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.gold,
  },
  statusDotLive: {
    backgroundColor: '#4A8E5B',
  },
  statusText: {
    color: colors.muted,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1.3,
  },
  item: {
    minHeight: 128,
    marginBottom: 12,
    padding: 10,
    borderRadius: radius.md,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.line,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadow.card,
  },
  itemPressed: { opacity: 0.92, transform: [{ scale: 0.995 }] },
  thumb: {
    width: 102,
    height: 104,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  thumbHalo: {
    position: 'absolute',
    width: 85,
    height: 85,
    borderRadius: 43,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  miniCup: {
    width: 45,
    height: 62,
    backgroundColor: '#EAD3AE',
    borderBottomLeftRadius: 11,
    borderBottomRightRadius: 11,
    borderWidth: 1,
    borderColor: 'rgba(47,36,29,0.20)',
    overflow: 'hidden',
  },
  miniFoam: {
    height: 14,
    backgroundColor: '#FFF9EE',
  },
  miniRibbon: {
    width: 70,
    height: 9,
    marginLeft: -12,
    marginTop: 19,
    borderRadius: 6,
    backgroundColor: colors.chocolate,
    transform: [{ rotate: '-12deg' }],
  },
  itemCopy: { flex: 1, marginLeft: 14, paddingRight: 12 },
  code: {
    color: colors.gold,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1.6,
  },
  itemTitle: {
    color: colors.ink,
    fontFamily: 'Georgia',
    fontSize: 18,
    marginTop: 5,
  },
  itemSubtitle: {
    color: colors.muted,
    fontSize: 10,
    lineHeight: 14,
    marginTop: 5,
  },
  price: {
    color: colors.pine,
    fontSize: 11,
    fontWeight: '800',
    marginTop: 7,
  },
  arrow: {
    color: colors.muted,
    fontSize: 26,
    marginRight: 5,
  },
  cta: {
    marginTop: 10,
    height: 58,
    borderRadius: radius.pill,
    backgroundColor: colors.pine,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ctaMuted: {
    backgroundColor: colors.pineSoft,
  },
  ctaPressed: { opacity: 0.92, transform: [{ scale: 0.99 }] },
  ctaText: { color: colors.cream, fontSize: 14, fontWeight: '800' },
  ctaArrow: { color: colors.goldSoft, fontSize: 22 },
  foot: {
    color: '#958B80',
    fontSize: 9,
    lineHeight: 14,
    textAlign: 'center',
    marginTop: 18,
    paddingHorizontal: 24,
  },
});
