import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

type QRBlockProps = {
  seed: string;
  size?: number;
  color?: string;
};

const GRID = 9;

function bit(seed: string, index: number) {
  const code = seed.charCodeAt(index % seed.length);
  return ((code * 31 + index * 17) & 5) !== 0;
}

function isFinderZone(row: number, col: number) {
  const inTL = row < 3 && col < 3;
  const inTR = row < 3 && col >= GRID - 3;
  const inBL = row >= GRID - 3 && col < 3;
  return inTL || inTR || inBL;
}

/**
 * Decorative QR-style block from the official boarding-pass graphics.
 * Deterministic per seed; purely visual (not scannable).
 */
export const QRBlock = memo(function QRBlock({
  seed,
  size = 30,
  color = '#1C1917',
}: QRBlockProps) {
  const cell = size / GRID;

  return (
    <View
      style={{ width: size, height: size }}
      accessibilityElementsHidden
      importantForAccessibility="no"
    >
      {Array.from({ length: GRID }).map((_, row) => (
        <View key={row} style={styles.row}>
          {Array.from({ length: GRID }).map((__, col) => {
            const filled = !isFinderZone(row, col) && bit(seed, row * GRID + col);
            return (
              <View
                key={col}
                style={{
                  width: cell,
                  height: cell,
                  backgroundColor: filled ? color : 'transparent',
                }}
              />
            );
          })}
        </View>
      ))}
      {[
        { top: 0, left: 0 },
        { top: 0, right: 0 },
        { bottom: 0, left: 0 },
      ].map((corner, index) => (
        <View
          key={index}
          style={[
            styles.finder,
            corner,
            { width: cell * 3, height: cell * 3, borderColor: color, borderWidth: cell * 0.7 },
          ]}
        >
          <View style={{ flex: 1, margin: cell * 0.35, backgroundColor: color }} />
        </View>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  finder: {
    position: 'absolute',
  },
});
