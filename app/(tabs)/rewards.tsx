import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, shadow } from '@/constants/theme';
import { hasToastLink, openToast, previewMode, toastLinks } from '@/lib/toast';

export default function RewardsScreen() {
  const rewardsLive = hasToastLink(toastLinks.rewards);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.eyebrow}>BOARDING CLUB</Text>
        <Text style={styles.title}>A sweeter{'
'}tomorrow.</Text>
        <Text style={styles.body}>
          This screen is ready for Toast Loyalty. Until that channel is activated,
          preview builds show sample points and production builds show a launch
          message instead.
        </Text>

        <View style={styles.card}>
          <LinearGradient
            colors={[colors.pineSoft, colors.pineDark]}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.cardTop}>
            <Text style={styles.cardLabel}>DUBAI & DIPS</Text>
            <Text style={styles.cardStar}>✦</Text>
          </View>
          <Text style={styles.cardTitle}>Boarding Club</Text>

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
          <Text style={styles.progressText}>
            {previewMode
              ? '80 points until your next reward'
              : rewardsLive
                ? 'Open Toast to view your live balance'
                : 'Boarding Club will activate with Toast Loyalty'}
          </Text>
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
  safe: { flex: 1, backgroundColor: colors.cream },
  container: { flex: 1, padding: 22, paddingTop: 34 },
  eyebrow: {
    color: colors.gold,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2.8,
  },
  title: {
    color: colors.ink,
    fontFamily: 'Georgia',
    fontSize: 41,
    lineHeight: 44,
    marginTop: 9,
  },
  body: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 12,
  },
  card: {
    minHeight: 286,
    borderRadius: radius.xl,
    padding: 24,
    marginTop: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(216,199,155,0.46)',
    ...shadow.card,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLabel: {
    color: colors.goldSoft,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 2.2,
  },
  cardStar: { color: colors.goldSoft, fontSize: 16 },
  cardTitle: {
    color: colors.cream,
    fontFamily: 'Georgia',
    fontSize: 29,
    marginTop: 15,
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    gap: 14,
  },
  plane: { color: colors.goldSoft, fontSize: 28 },
  points: {
    color: colors.cream,
    fontFamily: 'Georgia',
    fontSize: 36,
  },
  pointsLabel: {
    color: 'rgba(245,240,230,0.65)',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1.8,
    marginTop: 2,
  },
  progressTrack: {
    height: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(245,240,230,0.14)',
    marginTop: 26,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(216,199,155,0.38)',
  },
  progressFill: {
    height: '100%',
    borderRadius: 8,
    backgroundColor: colors.goldSoft,
  },
  progressText: {
    color: 'rgba(245,240,230,0.72)',
    fontSize: 10,
    marginTop: 8,
  },
  perkRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  perk: {
    flex: 1,
    minHeight: 82,
    borderRadius: radius.md,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  perkIcon: { color: colors.gold, fontSize: 18 },
  perkText: {
    color: colors.ink,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 7,
  },
  button: {
    marginTop: 18,
    height: 58,
    borderRadius: radius.pill,
    backgroundColor: colors.pine,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonPressed: { opacity: 0.92, transform: [{ scale: 0.99 }] },
  buttonText: { color: colors.cream, fontSize: 14, fontWeight: '800' },
  buttonArrow: { color: colors.goldSoft, fontSize: 22 },
});
