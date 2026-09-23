import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/shared/AppText';
import { StarFour } from '@/components/brand/StarFour';
import { colors, fonts } from '@/constants/theme';

type BrandMarkProps = {
  /**
   * primary — one-line wordmark, Burj Khalifa silhouette as the "i" in DUBAI.
   * stacked — secondary vertical lockup ("DUBAI" over "& DIPS").
   * mark — the "D" logomark with the four-pointed star.
   */
  variant?: 'primary' | 'stacked' | 'mark';
  light?: boolean;
  /** Cap height of the wordmark / height of the mark. */
  size?: number;
};

/** Burj Khalifa silhouette used in place of the "i" (guide §1.1). */
function Tower({ height, color }: { height: number; color: string }) {
  const w = Math.max(2, height * 0.11);
  return (
    <View style={[styles.tower, { height, width: w * 3 }]}>
      <View style={{ width: w * 0.5, height: height * 0.3, backgroundColor: color }} />
      <View style={{ width: w, height: height * 0.26, backgroundColor: color }} />
      <View style={{ width: w * 2, height: height * 0.24, backgroundColor: color }} />
      <View style={{ width: w * 3, height: height * 0.2, backgroundColor: color }} />
    </View>
  );
}

export function BrandMark({
  variant = 'primary',
  light = false,
  size = 22,
}: BrandMarkProps) {
  const ink = light ? colors.onGreen : colors.ink;

  if (variant === 'mark') {
    return (
      <View
        style={[styles.markWrap, { width: size * 1.3, height: size * 1.2 }]}
        accessibilityRole="image"
        accessibilityLabel="Dubai and Dips logomark"
      >
        <AppText
          variant="title"
          color={ink}
          style={{ fontFamily: fonts.display, fontSize: size, lineHeight: size * 1.15 }}
        >
          D
        </AppText>
        <View style={styles.markStar}>
          <StarFour size={size * 0.42} color={light ? colors.mint : colors.sugar} />
        </View>
      </View>
    );
  }

  const letter = {
    fontFamily: fonts.display,
    fontSize: size,
    lineHeight: size * 1.24,
    letterSpacing: size * 0.02,
    color: ink,
  } as const;

  if (variant === 'stacked') {
    return (
      <View accessibilityRole="image" accessibilityLabel="Dubai and Dips">
        <View style={styles.row}>
          <AppText style={letter}>DUBA</AppText>
          <Tower height={size * 0.98} color={ink} />
        </View>
        <View style={[styles.row, styles.stackedBottom]}>
          <AppText style={letter}>&amp; DIPS</AppText>
        </View>
      </View>
    );
  }

  return (
    <View
      style={styles.row}
      accessibilityRole="image"
      accessibilityLabel="Dubai and Dips"
    >
      <AppText style={letter}>DUBA</AppText>
      <Tower height={size * 0.98} color={ink} />
      <AppText style={letter}> &amp; DIPS</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  stackedBottom: {
    marginTop: -2,
  },
  tower: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: 1,
    marginBottom: 4,
  },
  markWrap: {
    justifyContent: 'center',
  },
  markStar: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
