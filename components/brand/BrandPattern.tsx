import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '@/constants/theme';

type BrandPatternProps = {
  /** Line tone. Per the guide, keep close to the background colour. */
  color?: string;
  opacity?: number;
  /** Distance between diamond centres. */
  cell?: number;
  /** Height of the pattern field; keep close to the parent's height. */
  height?: number;
};

const FIELD_WIDTH = 560;

/**
 * Official brand pattern (guide §2.3): a repeating lattice of rounded
 * four-pointed-star diamonds, rendered tone-on-tone as outlines so it stays a
 * subtle background texture. Absolute-fills its parent; parent must clip.
 */
export const BrandPattern = memo(function BrandPattern({
  color = colors.bark,
  opacity = 0.05,
  cell = 64,
  height = 480,
}: BrandPatternProps) {
  const side = cell * 0.72;
  const rows = Math.ceil(height / (cell / 2)) + 1;
  const cols = Math.ceil(FIELD_WIDTH / cell) + 2;

  const diamonds: { x: number; y: number }[] = [];
  for (let r = 0; r < rows; r += 1) {
    const offset = r % 2 === 0 ? 0 : cell / 2;
    for (let c = 0; c < cols; c += 1) {
      diamonds.push({
        x: c * cell + offset - cell,
        y: (r * cell) / 2 - cell / 2,
      });
    }
  }

  return (
    <View
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, styles.clip, { opacity }]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      {diamonds.map(({ x, y }, index) => (
        <View
          key={index}
          style={[
            styles.diamond,
            {
              left: x,
              top: y,
              width: side,
              height: side,
              borderColor: color,
              borderRadius: side * 0.26,
            },
          ]}
        />
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  clip: {
    overflow: 'hidden',
  },
  diamond: {
    position: 'absolute',
    borderWidth: 1,
    transform: [{ rotate: '45deg' }],
  },
});
