import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/shared/AppText';
import { BoardingPass } from '@/components/brand/BoardingPass';
import { BrandPattern } from '@/components/brand/BrandPattern';
import { DrinkArtwork } from '@/components/brand/DrinkArtwork';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { featuredItem } from '@/constants/menu';
import { colors, gutter, radius, shadow, space } from '@/constants/theme';

type FeaturedDestinationProps = {
  onOrder: () => void;
};

/**
 * Campaign-style feature block on Natural Choice: editorial copy on the left,
 * product artwork with a tucked boarding pass on the right.
 */
export function FeaturedDestination({ onOrder }: FeaturedDestinationProps) {
  const item = featuredItem;

  return (
    <View style={styles.card}>
      <BrandPattern color={colors.bark} opacity={0.03} cell={64} height={340} />

      <View style={styles.copy}>
        <AppText variant="micro" color={colors.green}>
          Featured destination
        </AppText>
        <AppText variant="hero" color={colors.ink} style={styles.title}>
          Dubai{'\n'}Chocolate{'\n'}Frappe
        </AppText>
        <AppText variant="caption" color={colors.inkSoft} style={styles.body}>
          Silky chocolate, toasted pistachio and cream — the house signature.
        </AppText>
        <PrimaryButton
          compact
          label="Start order"
          onPress={onOrder}
          accessibilityHint="Opens ordering for the featured drink"
          style={styles.button}
        />
      </View>

      <View style={styles.artwork}>
        <DrinkArtwork />
      </View>

      <View style={styles.pass} pointerEvents="none">
        <BoardingPass
          size="sm"
          code={item.code}
          destination={item.destination}
          flight={item.flight}
          gate={item.gate}
          seat={item.seat}
          accent={item.accent}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: gutter,
    minHeight: 330,
    borderRadius: radius.lg,
    backgroundColor: colors.blush,
    borderWidth: 1,
    borderColor: colors.blushEdge,
    overflow: 'hidden',
    ...shadow.card,
  },
  copy: {
    width: '56%',
    padding: space.xxl,
    zIndex: 3,
  },
  title: {
    marginTop: space.md,
    fontSize: 30,
    lineHeight: 33,
  },
  body: {
    marginTop: space.md,
    maxWidth: 180,
  },
  button: {
    marginTop: space.xl,
  },
  artwork: {
    position: 'absolute',
    right: 2,
    bottom: 44,
  },
  pass: {
    position: 'absolute',
    right: -18,
    bottom: -46,
    transform: [{ rotate: '6deg' }, { scale: 0.62 }],
    zIndex: 4,
  },
});
