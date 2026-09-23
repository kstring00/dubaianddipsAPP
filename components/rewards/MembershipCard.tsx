import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/shared/AppText';
import { Barcode } from '@/components/brand/Barcode';
import { BrandMark } from '@/components/brand/BrandMark';
import { BrandPattern } from '@/components/brand/BrandPattern';
import { QRBlock } from '@/components/brand/QRBlock';
import { StarFour } from '@/components/brand/StarFour';
import { colors, fonts, motion, radius, shadow, space } from '@/constants/theme';
import { previewMode } from '@/lib/toast';

const PREVIEW_POINTS = 420;
const PREVIEW_NEXT = 80;

/**
 * The Boarding Club membership pass — the flagship brand object of the
 * rewards screen, styled as a premium airline card on Courtyard green.
 */
export function MembershipCard({ rewardsLive }: { rewardsLive: boolean }) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: previewMode ? 0.72 : rewardsLive ? 0.4 : 0.14,
      duration: motion.slow,
      delay: 200,
      useNativeDriver: false,
    }).start();
  }, [progress, rewardsLive]);

  return (
    <View style={styles.shadow}>
      <View style={styles.card}>
        <BrandPattern color={colors.mint} opacity={0.06} cell={62} height={330} />

        <View style={styles.topRow}>
          <BrandMark variant="mark" size={26} light />
          <View style={styles.topRight}>
            <AppText variant="ticketLabel" color={colors.onGreenSoft}>
              D&amp;D AIRLINES
            </AppText>
            <StarFour size={12} color={colors.sugar} />
          </View>
        </View>

        <AppText style={styles.clubTitle} color={colors.onGreen}>
          BOARDING CLUB
        </AppText>

        <View style={styles.pointsRow}>
          <AppText style={styles.points} color={colors.onGreen}>
            {previewMode ? String(PREVIEW_POINTS) : rewardsLive ? '—' : 'Soon'}
          </AppText>
          <View style={styles.pointsMeta}>
            <AppText variant="ticketLabel" color={colors.onGreenFaint}>
              {previewMode ? 'POINTS · PREVIEW' : rewardsLive ? 'TOAST LOYALTY' : 'REWARDS'}
            </AppText>
            <AppText variant="footnote" color={colors.onGreenSoft}>
              {previewMode
                ? `${PREVIEW_NEXT} points to your next reward`
                : rewardsLive
                  ? 'Points sync from Toast Loyalty'
                  : 'Launching with Toast Loyalty'}
            </AppText>
          </View>
        </View>

        <View style={styles.progressTrack}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>

        <View style={styles.metaRow}>
          {(
            [
              ['FLIGHT', 'DD420'],
              ['GATE', 'CLUB'],
              ['STATUS', previewMode || rewardsLive ? 'BOARDING' : 'SOON'],
            ] as const
          ).map(([label, value]) => (
            <View key={label}>
              <AppText variant="ticketLabel" color={colors.onGreenFaint}>
                {label}
              </AppText>
              <AppText variant="ticketValue" color={colors.onGreen}>
                {value}
              </AppText>
            </View>
          ))}
          <QRBlock seed="BOARDING-CLUB-DD420" size={34} color={colors.offWhite} />
        </View>

        <View style={styles.footer}>
          <Barcode
            seed="DD-BOARDING-CLUB"
            height={16}
            bars={34}
            color="rgba(230,219,198,0.6)"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    ...shadow.raised,
  },
  card: {
    borderRadius: radius.xl,
    backgroundColor: colors.green,
    borderWidth: 1,
    borderColor: colors.greenEdge,
    padding: space.xxl,
    overflow: 'hidden',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  topRight: {
    alignItems: 'flex-end',
    gap: space.sm,
  },
  clubTitle: {
    fontFamily: fonts.narrowBold,
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: 3.4,
    marginTop: space.xl,
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: space.md,
    marginTop: space.md,
  },
  points: {
    fontFamily: fonts.display,
    fontSize: 44,
    lineHeight: 48,
  },
  pointsMeta: {
    paddingBottom: 6,
    gap: 2,
    flexShrink: 1,
  },
  progressTrack: {
    height: 7,
    borderRadius: 7,
    backgroundColor: 'rgba(230,219,198,0.16)',
    marginTop: space.lg,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 7,
    backgroundColor: colors.mint,
  },
  metaRow: {
    marginTop: space.xl,
    paddingTop: space.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.onGreenLine,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  footer: {
    marginTop: space.lg,
    alignItems: 'center',
  },
});
