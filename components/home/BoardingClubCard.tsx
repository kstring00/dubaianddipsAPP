import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/components/shared/AppText';
import { Barcode } from '@/components/brand/Barcode';
import { BrandPattern } from '@/components/brand/BrandPattern';
import { StarFour } from '@/components/brand/StarFour';
import { PressableScale } from '@/components/shared/PressableScale';
import { colors, gutter, motion, radius, shadow, space } from '@/constants/theme';
import { previewMode } from '@/lib/toast';

const PREVIEW_POINTS = 420;
const PREVIEW_NEXT = 80;
const PREVIEW_PROGRESS = 0.72;

type BoardingClubCardProps = {
  onPress: () => void;
};

/**
 * Boarding Club membership teaser — an airline-card object on Courtyard
 * green. Preview builds show clearly-labelled sample data; production shows
 * the pre-launch state until Toast Loyalty connects.
 */
export function BoardingClubCard({ onPress }: BoardingClubCardProps) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: previewMode ? PREVIEW_PROGRESS : 0.16,
      duration: motion.slow,
      delay: 250,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <PressableScale
      onPress={onPress}
      haptic="tap"
      accessibilityLabel="Boarding Club rewards"
      accessibilityHint="Opens the rewards screen"
      style={styles.wrap}
    >
      <View style={styles.card}>
        <BrandPattern color={colors.mint} opacity={0.07} cell={58} height={220} />

        <View style={styles.topRow}>
          <View style={styles.clubRow}>
            <StarFour size={11} color={colors.mint} />
            <AppText variant="micro" color={colors.onGreen}>
              Boarding Club
            </AppText>
          </View>
          <AppText variant="ticketLabel" color={colors.onGreenSoft}>
            D&amp;D AIRLINES
          </AppText>
        </View>

        <View style={styles.mainRow}>
          <View style={styles.pointsBlock}>
            {previewMode ? (
              <View style={styles.pointsRow}>
                <AppText variant="title" color={colors.onGreen}>
                  {PREVIEW_POINTS} points
                </AppText>
                <View style={styles.previewTag}>
                  <AppText variant="ticketLabel" color={colors.mint}>
                    PREVIEW
                  </AppText>
                </View>
              </View>
            ) : (
              <AppText variant="title" color={colors.onGreen}>
                Now boarding
              </AppText>
            )}

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

            <AppText variant="footnote" color={colors.onGreenSoft}>
              {previewMode
                ? `${PREVIEW_NEXT} points until your next reward`
                : 'Rewards open when Toast Loyalty connects'}
            </AppText>
          </View>

          <Ionicons name="chevron-forward" size={20} color={colors.onGreenSoft} />
        </View>

        <View style={styles.footRow}>
          <Barcode
            seed="BOARDING-CLUB"
            height={12}
            bars={20}
            color="rgba(230,219,198,0.55)"
          />
          <View style={styles.metaRow}>
            {(
              [
                ['FLIGHT', 'DD420'],
                ['GATE', 'CLUB'],
                ['STATUS', 'BOARDING'],
              ] as const
            ).map(([label, value]) => (
              <View key={label} style={styles.metaCell}>
                <AppText variant="ticketLabel" color={colors.onGreenFaint}>
                  {label}
                </AppText>
                <AppText variant="ticketValue" color={colors.onGreen} style={styles.metaValue}>
                  {value}
                </AppText>
              </View>
            ))}
          </View>
        </View>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: gutter,
    ...shadow.card,
  },
  card: {
    borderRadius: radius.lg,
    backgroundColor: colors.green,
    borderWidth: 1,
    borderColor: colors.greenEdge,
    padding: space.xl,
    overflow: 'hidden',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
  },
  mainRow: {
    marginTop: space.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
  },
  pointsBlock: {
    flex: 1,
    gap: space.sm,
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
  },
  previewTag: {
    borderWidth: 1,
    borderColor: 'rgba(209,227,210,0.5)',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  progressTrack: {
    height: 6,
    borderRadius: 6,
    backgroundColor: 'rgba(230,219,198,0.18)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
    backgroundColor: colors.mint,
  },
  footRow: {
    marginTop: space.xl,
    paddingTop: space.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.onGreenLine,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: space.lg,
  },
  metaRow: {
    flexDirection: 'row',
    gap: space.lg,
  },
  metaCell: {
    alignItems: 'flex-end',
  },
  metaValue: {
    fontSize: 10,
    lineHeight: 14,
  },
});
