import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/theme';

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <View style={[styles.wrap, compact && styles.compactWrap]}>
      <View style={[styles.monogram, compact && styles.compactMonogram]}>
        <Text style={[styles.d, compact && styles.compactD]}>D</Text>
        <Text style={[styles.amp, compact && styles.compactAmp]}>&</Text>
        <Text style={[styles.d2, compact && styles.compactD2]}>D</Text>
        <Text style={styles.spark}>✦</Text>
      </View>
      {!compact && <Text style={styles.wordmark}>DUBAI & DIPS</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'flex-start',
  },
  compactWrap: {
    alignItems: 'center',
  },
  monogram: {
    width: 92,
    height: 54,
    position: 'relative',
  },
  compactMonogram: {
    width: 54,
    height: 42,
  },
  d: {
    position: 'absolute',
    left: 0,
    top: -8,
    color: colors.pine,
    fontFamily: 'Georgia',
    fontSize: 49,
    fontWeight: '600',
  },
  d2: {
    position: 'absolute',
    left: 32,
    top: -1,
    color: colors.gold,
    fontFamily: 'Georgia',
    fontSize: 42,
    fontWeight: '600',
  },
  amp: {
    position: 'absolute',
    left: 29,
    top: 18,
    zIndex: 4,
    color: colors.ink,
    fontFamily: 'Georgia',
    fontSize: 14,
    fontWeight: '700',
  },
  spark: {
    position: 'absolute',
    left: 63,
    top: 2,
    color: colors.gold,
    fontSize: 10,
  },
  compactD: {
    fontSize: 34,
    top: -3,
  },
  compactD2: {
    fontSize: 29,
    left: 23,
    top: 2,
  },
  compactAmp: {
    left: 21,
    top: 16,
    fontSize: 10,
  },
  compactD2: {},
  wordmark: {
    color: colors.ink,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 3.2,
    marginTop: 1,
  },
});
