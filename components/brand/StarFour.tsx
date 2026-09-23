import { StyleSheet, View } from 'react-native';

import { colors } from '@/constants/theme';

type StarFourProps = {
  size?: number;
  color?: string;
};

/**
 * The brand's four-pointed star (from the logomark), drawn with views so it
 * scales crisply without relying on unicode glyphs.
 */
export function StarFour({ size = 14, color = colors.sugar }: StarFourProps) {
  const half = size / 2;
  const base = size * 0.19;

  const horizontal = {
    borderTopWidth: base,
    borderBottomWidth: base,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    top: half - base,
  } as const;

  const vertical = {
    borderLeftWidth: base,
    borderRightWidth: base,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    left: half - base,
  } as const;

  return (
    <View
      style={{ width: size, height: size }}
      accessibilityElementsHidden
      importantForAccessibility="no"
    >
      <View style={[styles.point, vertical, { top: 0, borderBottomWidth: half, borderBottomColor: color }]} />
      <View style={[styles.point, vertical, { bottom: 0, borderTopWidth: half, borderTopColor: color }]} />
      <View style={[styles.point, horizontal, { left: 0, borderRightWidth: half, borderRightColor: color }]} />
      <View style={[styles.point, horizontal, { right: 0, borderLeftWidth: half, borderLeftColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  point: {
    position: 'absolute',
    width: 0,
    height: 0,
  },
});
