import { useMemo } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrandMark } from '@/components/BrandMark';
import { DrinkArtwork } from '@/components/DrinkArtwork';
import { colors, radius } from '@/constants/theme';
import { openToast, toastLinks } from '@/lib/toast';

const departures = [
  { code: 'DXB', label: 'Frappes', key: 'frappes' as const },
  { code: 'NRT', label: 'Matcha', key: 'matcha' as const },
  { code: 'FCO', label: 'Coffee', key: 'coffee' as const },
];

export default function HomeScreen() {
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topbar}>
          <BrandMark />
          <Pressable style={styles.bell} accessibilityLabel="Notifications">
            <Text style={styles.bellText}>✦</Text>
          </Pressable>
        </View>

        <View style={styles.intro}>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.subtitle}>Sweet destinations ahead.</Text>
        </View>

        <Pressable
          onPress={() => openToast(toastLinks.rewards || toastLinks.order)}
          style={({ pressed }) => [
            styles.clubCard,
            pressed && styles.pressed,
          ]}
        >
          <View>
            <Text style={styles.eyebrowLight}>Boarding Club</Text>
            <Text style={styles.clubTitle}>Your rewards, ready to travel.</Text>
            <Text style={styles.clubLink}>View Toast rewards  →</Text>
          </View>
          <View style={styles.clubSeal}>
            <Text style={styles.clubSealStar}>✦</Text>
          </View>
        </Pressable>

        <View style={styles.sectionHeading}>
          <View>
            <Text style={styles.eyebrow}>Featured destination</Text>
            <Text style={styles.sectionTitle}>Dubai Chocolate Frappe</Text>
          </View>
          <Text style={styles.route}>DXB</Text>
        </View>

        <View style={styles.featureCard}>
          <DrinkArtwork />
          <View style={styles.featureCopy}>
            <Text style={styles.featureDescription}>
              Chocolate, pistachio and a chilled frappe built for the first sip.
            </Text>
            <Pressable
              onPress={() => openToast(toastLinks.featured || toastLinks.order)}
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.primaryPressed,
              ]}
            >
              <Text style={styles.primaryButtonText}>Start order</Text>
              <Text style={styles.primaryArrow}>→</Text>
            </Pressable>
          </View>
        </View>

        <View style={[styles.sectionHeading, styles.departureHeading]}>
          <View>
            <Text style={styles.eyebrow}>Departures</Text>
            <Text style={styles.sectionTitle}>Pick your next stop.</Text>
          </View>
          <Text style={styles.live}>Now boarding</Text>
        </View>

        <View style={styles.board}>
          {departures.map((departure, index) => (
            <Pressable
              key={departure.code}
              onPress={() =>
                openToast(toastLinks[departure.key] || toastLinks.order)
              }
              style={({ pressed }) => [
                styles.boardRow,
                index !== departures.length - 1 && styles.boardDivider,
                pressed && styles.boardRowPressed,
              ]}
            >
              <View style={styles.codeBadge}>
                <Text style={styles.code}>{departure.code}</Text>
              </View>
              <Text style={styles.boardLabel}>{departure.label}</Text>
              <Text style={styles.gate}>Gate A{index + 1}</Text>
              <Text style={styles.chevron}>›</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.promise}>
          <Text style={styles.promiseStar}>✦</Text>
          <Text style={styles.promiseText}>
            Order in the app. Toast handles modifiers, cart, payment and pickup.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 34,
  },
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bell: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.paper,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellText: {
    color: colors.gold,
    fontSize: 18,
  },
  intro: {
    marginTop: 26,
    marginBottom: 22,
  },
  greeting: {
    color: colors.ink,
    fontSize: 34,
    lineHeight: 38,
    fontWeight: '500',
    letterSpacing: -1.2,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 16,
    marginTop: 5,
  },
  clubCard: {
    minHeight: 164,
    backgroundColor: colors.pine,
    borderRadius: radius.lg,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(216,201,157,0.62)',
    shadowColor: '#14251D',
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  pressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.96,
  },
  eyebrowLight: {
    color: colors.goldSoft,
    textTransform: 'uppercase',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.7,
    marginBottom: 10,
  },
  clubTitle: {
    color: colors.cream,
    fontSize: 21,
    lineHeight: 27,
    fontWeight: '600',
    maxWidth: 220,
  },
  clubLink: {
    color: colors.goldSoft,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 16,
  },
  clubSeal: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  clubSealStar: {
    color: colors.gold,
    fontSize: 26,
  },
  sectionHeading: {
    marginTop: 34,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  departureHeading: {
    marginTop: 36,
  },
  eyebrow: {
    color: colors.gold,
    textTransform: 'uppercase',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.6,
    marginBottom: 6,
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 23,
    lineHeight: 28,
    fontWeight: '600',
    letterSpacing: -0.5,
  },
  route: {
    color: colors.pine,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 7,
    overflow: 'hidden',
  },
  featureCard: {
    backgroundColor: colors.paper,
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.line,
  },
  featureCopy: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  featureDescription: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 18,
  },
  primaryButton: {
    height: 56,
    backgroundColor: colors.pine,
    borderRadius: radius.pill,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  primaryPressed: {
    backgroundColor: colors.pineSoft,
    transform: [{ scale: 0.99 }],
  },
  primaryButtonText: {
    color: colors.cream,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  primaryArrow: {
    color: colors.goldSoft,
    fontSize: 22,
  },
  live: {
    color: colors.pine,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  board: {
    backgroundColor: '#1C211F',
    borderRadius: radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#343A37',
  },
  boardRow: {
    minHeight: 70,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  boardRowPressed: {
    backgroundColor: '#262D29',
  },
  boardDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#3A403D',
  },
  codeBadge: {
    width: 56,
    height: 38,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111513',
    borderWidth: 1,
    borderColor: '#3E4541',
  },
  code: {
    color: colors.goldSoft,
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1.7,
  },
  boardLabel: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 14,
    flex: 1,
  },
  gate: {
    color: '#A7AEA9',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginRight: 8,
  },
  chevron: {
    color: colors.gold,
    fontSize: 24,
    marginTop: -2,
  },
  promise: {
    marginTop: 24,
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: radius.md,
    backgroundColor: 'rgba(179,154,90,0.09)',
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  promiseStar: {
    color: colors.gold,
    fontSize: 16,
  },
  promiseText: {
    flex: 1,
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
  },
});
