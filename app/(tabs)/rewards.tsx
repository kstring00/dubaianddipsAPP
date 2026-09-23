import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandMark } from '@/components/BrandMark';
import { BrandPattern } from '@/components/BrandPattern';
import { colors, fonts, radius, shadow } from '@/constants/theme';
import { hasToastLink, openToast, previewMode, toastLinks } from '@/lib/toast';

export default function RewardsScreen() {
  const rewardsLive = hasToastLink(toastLinks.rewards);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BrandMark compact />
          <View style={styles.headerCopy}>
            <Text style={styles.eyebrow}>BOARDING CLUB</Text>
            <Text style={styles.title}>A sweeter tomorrow.</Text>
          </View>
        </View>

        <Text style={styles.body}>
          Built to connect to Toast Loyalty when the restaurant activates it.
          Preview mode shows sample points only for design testing.
        </Text>

        <View style={styles.card}>
          <BrandPattern color={colors.mintCondition} opacity={0.08} dense />

          <View style={styles.barcode}>
            {Array.from({ length: 22 }).map((_, index) => (
              <View
                key={index}
                style={[
                  styles.bar,
                  { height: 10 + ((index * 7) % 15) },
                ]}
              />
            ))}
          </View>

          <View style={styles.cardTop}>
            <Text style={styles.cardLabel}>D&D AIRLINES</Text>
            <Text style={styles.cardStar}>✦</Text>
          </View>

          <Text style={styles.cardTitle}>BOARDING CLUB</Text>

          <View style={styles.pointsRow}>
            <Text style={styles.plane}>✈</Text>
            <View>
              <Text style={styles.points}>
                {previewMode ? '420' : rewardsLive ? 'Your points' : 'Coming soon'}
              </Text>
              <Text style={styles.pointsLabel}>
                {previewMode ? 'POINTS · PREVIEW' : rewardsLive ? 'TOAST LOYALTY' : 'REWARDS'}
              </Text>
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: previewMode ? '72%' : rewardsLive ? '45%' : '18%' },
              ]}
            />
          </View>

          <View style={styles.ticketMeta}>
            <View>
              <Text style={styles.metaLabel}>FLIGHT</Text>
              <Text style={styles.metaValue}>D&D420</Text>
            </View>
            <View>
              <Text style={styles.metaLabel}>GATE</Text>
              <Text style={styles.metaValue}>CLUB</Text>
            </View>
            <View>
              <Text style={styles.metaLabel}>SEAT</Text>
              <Text style={styles.metaValue}>VIP</Text>
            </View>
          </View>
        </View>

        <View style={styles.perkRow}>
          {['Earn', 'Redeem', 'Repeat'].map((label, i) => (
            <View key={label} style={styles.perk}>
              <Text style={styles.perkIcon}>{i === 0 ? '✦' : i === 1 ? '♢' : '↻'}</Text>
              <Text style={styles.perkText}>{label}</Text>
            </View>
          ))}
        </View>

        <Pressable
          onPress={() => openToast(toastLinks.rewards || toastLinks.order)}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>
            {rewardsLive ? 'Open live rewards' : 'Toast rewards coming soon'}
          </Text>
          <Text style={styles.buttonArrow}>→</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.offWhite },
  container: { flex: 1, padding: 22, paddingTop: 30 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
  },
  headerCopy: { flex: 1 },
  eyebrow: {
    color: colors.courtyard,
    fontFamily: fonts.narrow,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 2.4,
  },
  title: {
    color: colors.bark,
    fontFamily: fonts.body,
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '500',
    marginTop: 3,
  },
  body: {
    color: colors.muted,
    fontFamily: fonts.body,
    fontSize: 12,
    lineHeight: 19,
    marginTop: 18,
  },
  card: {
    minHeight: 300,
    borderRadius: radius.xl,
    padding: 22,
    marginTop: 26,
    overflow: 'hidden',
    backgroundColor: colors.courtyard,
    borderWidth: 1,
    borderColor: '#60715C',
    ...shadow.card,
  },
  barcode: {
    height: 29,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginBottom: 12,
  },
  bar: {
    width: 2,
    backgroundColor: colors.offWhite,
    opacity: 0.72,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLabel: {
    color: colors.mintCondition,
    fontFamily: fonts.narrow,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 2.1,
  },
  cardStar: {
    color: colors.brownedSugar,
    fontSize: 16,
  },
  cardTitle: {
    color: colors.offWhite,
    fontFamily: fonts.narrow,
    fontSize: 12,
    letterSpacing: 2.8,
    marginTop: 12,
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    gap: 14,
  },
  plane: {
    color: colors.offWhite,
    fontSize: 27,
  },
  points: {
    color: colors.offWhite,
    fontFamily: fonts.display,
    fontSize: 36,
  },
  pointsLabel: {
    color: 'rgba(230,219,198,0.65)',
    fontFamily: fonts.narrow,
    fontSize: 7,
    fontWeight: '900',
    letterSpacing: 1.7,
    marginTop: 2,
  },
  progressTrack: {
    height: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(230,219,198,0.14)',
    marginTop: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(209,227,210,0.42)',
  },
  progressFill: {
    height: '100%',
    borderRadius: 8,
    backgroundColor: colors.mintCondition,
  },
  ticketMeta: {
    marginTop: 20,
    paddingTop: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(230,219,198,0.28)',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaLabel: {
    color: 'rgba(230,219,198,0.58)',
    fontFamily: fonts.narrow,
    fontSize: 6,
    letterSpacing: 1,
  },
  metaValue: {
    color: colors.offWhite,
    fontFamily: fonts.narrow,
    fontSize: 9,
    marginTop: 3,
  },
  perkRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  perk: {
    flex: 1,
    minHeight: 80,
    borderRadius: radius.md,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  perkIcon: {
    color: colors.brownedSugar,
    fontSize: 18,
  },
  perkText: {
    color: colors.bark,
    fontFamily: fonts.body,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 7,
  },
  button: {
    marginTop: 18,
    height: 58,
    borderRadius: radius.pill,
    backgroundColor: colors.courtyard,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  buttonText: {
    color: colors.offWhite,
    fontFamily: fonts.body,
    fontSize: 13,
    fontWeight: '800',
  },
  buttonArrow: {
    color: colors.mintCondition,
    fontSize: 22,
  },
});
