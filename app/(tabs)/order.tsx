import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BoardingPass } from '@/components/BoardingPass';
import { BrandMark } from '@/components/BrandMark';
import { BrandPattern } from '@/components/BrandPattern';
import { menuItems } from '@/constants/menu';
import { colors, fonts, radius, shadow } from '@/constants/theme';
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
          <BrandPattern color={colors.bark} opacity={0.035} dense />
          <View style={styles.headerTop}>
            <BrandMark compact />
            <Text style={styles.eyebrow}>DEPARTURES</Text>
          </View>
          <Text style={styles.title}>Everything on{'
'}the boards.</Text>
          <Text style={styles.subtitle}>
            Pick a destination now. When Toast ordering goes live, these same
            paths will hand off to Toast for modifiers, cart, payment and pickup.
          </Text>
        </View>

        <View style={styles.status}>
          <View style={[styles.statusDot, toastLive && styles.statusDotLive]} />
          <Text style={styles.statusText}>
            {toastLive ? 'TOAST ORDERING LIVE' : 'ONLINE ORDERING · COMING SOON'}
          </Text>
        </View>

        <View style={styles.boardGrid}>
          {menuItems.map((item) => (
            <Pressable
              key={item.slug}
              onPress={toastLive ? onOrder : () => Haptics.selectionAsync()}
              style={({ pressed }) => [
                styles.ticketCard,
                pressed && styles.ticketPressed,
              ]}
            >
              <BoardingPass
                compact
                code={item.code}
                destination={item.destination}
                gate={item.gate}
                seat={item.seat}
                accent={item.accent}
              />

              <View style={styles.itemCopy}>
                <Text style={styles.itemCategory}>{item.category.toUpperCase()}</Text>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                <View style={styles.itemBottom}>
                  <Text style={styles.price}>{item.price}</Text>
                  <Text style={styles.arrow}>→</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>

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
          Preview menu only until Dubai & Dips activates its live Toast ordering channel.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.offWhite },
  content: { paddingBottom: 42 },
  header: {
    minHeight: 250,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 24,
    overflow: 'hidden',
    backgroundColor: colors.offWhite,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eyebrow: {
    color: colors.courtyard,
    fontFamily: fonts.narrow,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 2.6,
  },
  title: {
    marginTop: 30,
    color: colors.bark,
    fontFamily: fonts.body,
    fontSize: 38,
    lineHeight: 41,
    fontWeight: '500',
    letterSpacing: -1.3,
  },
  subtitle: {
    marginTop: 12,
    color: colors.muted,
    fontFamily: fonts.body,
    fontSize: 12,
    lineHeight: 19,
    maxWidth: 350,
  },
  status: {
    alignSelf: 'flex-start',
    marginHorizontal: 20,
    marginTop: 14,
    marginBottom: 18,
    paddingHorizontal: 12,
    height: 31,
    borderRadius: 16,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.line,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.brownedSugar,
  },
  statusDotLive: {
    backgroundColor: colors.courtyard,
  },
  statusText: {
    color: colors.muted,
    fontFamily: fonts.narrow,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1.3,
  },
  boardGrid: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 14,
  },
  ticketCard: {
    width: '48%',
    backgroundColor: colors.paper,
    borderRadius: radius.md,
    padding: 9,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    ...shadow.card,
  },
  ticketPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  itemCopy: {
    width: '100%',
    paddingHorizontal: 4,
    paddingTop: 10,
    paddingBottom: 5,
  },
  itemCategory: {
    color: colors.brownedSugar,
    fontFamily: fonts.narrow,
    fontSize: 7,
    fontWeight: '900',
    letterSpacing: 1.3,
  },
  itemTitle: {
    color: colors.bark,
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    marginTop: 4,
  },
  itemSubtitle: {
    color: colors.muted,
    fontFamily: fonts.body,
    fontSize: 9,
    lineHeight: 13,
    marginTop: 5,
  },
  itemBottom: {
    marginTop: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    color: colors.courtyard,
    fontFamily: fonts.narrow,
    fontSize: 10,
    fontWeight: '900',
  },
  arrow: {
    color: colors.courtyard,
    fontSize: 15,
  },
  cta: {
    marginHorizontal: 20,
    marginTop: 20,
    height: 58,
    borderRadius: radius.pill,
    backgroundColor: colors.courtyard,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ctaMuted: {
    backgroundColor: colors.pineSoft,
  },
  ctaPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  ctaText: {
    color: colors.offWhite,
    fontFamily: fonts.body,
    fontSize: 13,
    fontWeight: '800',
  },
  ctaArrow: {
    color: colors.mintCondition,
    fontSize: 22,
  },
  foot: {
    color: '#8E817A',
    fontFamily: fonts.body,
    fontSize: 9,
    lineHeight: 14,
    textAlign: 'center',
    marginTop: 18,
    paddingHorizontal: 36,
  },
});
