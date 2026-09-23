import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius } from '@/constants/theme';

const bars = [10, 18, 6, 14, 9, 22, 7, 16, 11, 5, 19, 8, 13, 20, 6, 15];

export function BoardingPass({
  code,
  destination,
  gate = 'A101',
  seat = '2D',
  accent = colors.brownedSugar,
  compact = false,
}: {
  code: string;
  destination: string;
  gate?: string;
  seat?: string;
  accent?: string;
  compact?: boolean;
}) {
  return (
    <View style={[styles.pass, compact && styles.passCompact]}>
      <View style={[styles.accent, { backgroundColor: accent }]} />
      <View style={styles.barcode}>
        {bars.map((height, index) => (
          <View key={index} style={[styles.bar, { height }]} />
        ))}
      </View>

      <View style={styles.topRow}>
        <View style={styles.codeBox}>
          <Text style={styles.code}>{code}</Text>
        </View>
        <Text style={styles.airline}>D&D AIRLINES</Text>
      </View>

      <Text style={[styles.destination, compact && styles.destinationCompact]}>
        {destination}
      </Text>

      <View style={styles.rule} />

      <View style={styles.details}>
        <View>
          <Text style={styles.detailLabel}>FLIGHT</Text>
          <Text style={styles.detailValue}>NA2381</Text>
        </View>
        <View>
          <Text style={styles.detailLabel}>GATE</Text>
          <Text style={styles.detailValue}>{gate}</Text>
        </View>
        <View>
          <Text style={styles.detailLabel}>SEAT</Text>
          <Text style={styles.detailValue}>{seat}</Text>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <Text style={styles.plane}>✈</Text>
        <Text style={styles.star}>✦</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pass: {
    width: 178,
    minHeight: 226,
    borderRadius: radius.sm,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 14,
    borderWidth: 1,
    borderColor: '#E9E4DB',
    overflow: 'hidden',
  },
  passCompact: {
    width: 144,
    minHeight: 184,
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 11,
  },
  accent: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 6,
  },
  barcode: {
    height: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginBottom: 8,
  },
  bar: {
    width: 2,
    backgroundColor: '#181818',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  codeBox: {
    backgroundColor: '#191919',
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  code: {
    color: colors.white,
    fontFamily: fonts.narrow,
    fontSize: 9,
    letterSpacing: 1.2,
  },
  airline: {
    color: colors.bark,
    fontFamily: fonts.narrow,
    fontSize: 7,
    letterSpacing: 1.3,
  },
  destination: {
    color: '#111111',
    fontFamily: fonts.body,
    fontSize: 28,
    lineHeight: 31,
    marginTop: 6,
    letterSpacing: -1,
  },
  destinationCompact: {
    fontSize: 22,
    lineHeight: 24,
  },
  rule: {
    height: 1,
    backgroundColor: '#D8D4CB',
    marginTop: 9,
    marginBottom: 9,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    color: '#79736B',
    fontFamily: fonts.narrow,
    fontSize: 6,
    letterSpacing: 0.9,
  },
  detailValue: {
    color: '#111111',
    fontFamily: fonts.narrow,
    fontSize: 8,
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 11,
  },
  plane: {
    color: '#111111',
    fontSize: 15,
  },
  star: {
    color: colors.brownedSugar,
    fontSize: 14,
  },
});
