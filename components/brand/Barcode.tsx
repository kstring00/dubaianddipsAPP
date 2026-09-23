import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

type BarcodeProps = {
  /** Any string; bar widths derive deterministically from it. */
  seed: string;
  height?: number;
  color?: string;
  /** Number of bars to render. */
  bars?: number;
};

function hashChar(seed: string, index: number) {
  const code = seed.charCodeAt(index % seed.length) + index * 7;
  return code % 4;
}

/**
 * Decorative 1D barcode used across the official boarding-pass graphics.
 * Bars vary in width (like a real barcode), derived from the seed so each
 * ticket has a stable, unique code. Purely visual.
 */
export const Barcode = memo(function Barcode({
  seed,
  height = 22,
  color = '#1C1917',
  bars = 32,
}: BarcodeProps) {
  return (
    <View
      style={[styles.row, { height }]}
      accessibilityElementsHidden
      importantForAccessibility="no"
    >
      {Array.from({ length: bars }).map((_, index) => {
        const value = hashChar(seed, index);
        return (
          <View
            key={index}
            style={{
              width: value === 3 ? 3 : value === 2 ? 2 : 1,
              marginRight: value === 1 ? 3 : 2,
              height: '100%',
              backgroundColor: color,
            }}
          />
        );
      })}
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
