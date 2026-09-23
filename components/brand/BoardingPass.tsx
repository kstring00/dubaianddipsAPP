import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/components/shared/AppText';
import { Barcode } from '@/components/brand/Barcode';
import { QRBlock } from '@/components/brand/QRBlock';
import { colors, fonts, radius, space } from '@/constants/theme';

export type BoardingPassProps = {
  code: string;
  destination: string;
  flight?: string;
  gate?: string;
  seat?: string;
  accent?: string;
  size?: 'sm' | 'md';
  /** Fill the parent's width instead of the fixed tag width. */
  fluid?: boolean;
};

const INK = '#1C1917';

/**
 * The official D&D AIRLINES boarding-pass tag (guide §2.4): barcode strips top
 * and bottom, twin colour rails on each edge, black destination-code chip,
 * FLIGHT / GATE / SEAT data row and a QR detail.
 */
export function BoardingPass({
  code,
  destination,
  flight = 'NA2381',
  gate = 'A101',
  seat = '2D',
  accent = colors.sugar,
  size = 'md',
  fluid = false,
}: BoardingPassProps) {
  const sm = size === 'sm';
  const seed = `${code}-${destination}-${flight}`;

  return (
    <View
      style={[styles.card, sm ? styles.cardSm : styles.cardMd, fluid && styles.cardFluid]}
      accessibilityRole="image"
      accessibilityLabel={`Boarding pass to ${destination}, flight ${flight}, gate ${gate}, seat ${seat}`}
    >
      <View style={[styles.rail, styles.railLeft, { backgroundColor: accent }]} />
      <View style={[styles.rail, styles.railLeftInner]} />
      <View style={[styles.rail, styles.railRight, { backgroundColor: accent }]} />
      <View style={[styles.rail, styles.railRightInner]} />

      <Barcode seed={seed} height={sm ? 12 : 16} bars={sm ? 22 : 26} />

      <View style={styles.headerRow}>
        <View style={styles.codeChip}>
          <AppText variant="ticketLabel" color={colors.white} style={styles.codeText}>
            {code}
          </AppText>
        </View>
        <AppText
          variant="ticketLabel"
          color={INK}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.7}
          style={sm ? styles.labelSm : undefined}
        >
          D&amp;D AIRLINES
        </AppText>
      </View>

      <AppText
        color={INK}
        numberOfLines={1}
        adjustsFontSizeToFit
        style={[styles.destination, sm && styles.destinationSm]}
      >
        {destination}
      </AppText>

      <View style={styles.dataRow}>
        {(
          [
            ['FLIGHT', flight],
            ['GATE', gate],
            ['SEAT', seat],
          ] as const
        ).map(([label, value], index) => (
          <View key={label} style={index === 2 ? styles.dataCellLast : styles.dataCell}>
            <AppText
              variant="ticketLabel"
              color="#78716C"
              numberOfLines={1}
              style={sm ? styles.labelSm : undefined}
            >
              {label}
            </AppText>
            <AppText
              variant="ticketValue"
              color={INK}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.7}
              style={sm ? styles.valueSm : undefined}
            >
              {value}
            </AppText>
          </View>
        ))}
      </View>

      <View style={styles.footerRow}>
        <QRBlock seed={seed} size={sm ? 22 : 30} color={INK} />
        <View style={styles.footerRight}>
          <View style={[styles.flagBlock, { backgroundColor: accent }]} />
          <Ionicons name="airplane" size={sm ? 11 : 14} color={INK} />
        </View>
      </View>

      <Barcode seed={destination + code} height={sm ? 10 : 13} bars={sm ? 22 : 26} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: '#E7E5E4',
    overflow: 'hidden',
    gap: space.sm,
  },
  cardMd: {
    width: 172,
    paddingVertical: space.md,
    paddingHorizontal: space.lg + 2,
  },
  cardSm: {
    width: 142,
    paddingVertical: space.sm + 2,
    paddingHorizontal: space.md + 2,
  },
  cardFluid: {
    width: '100%',
  },
  rail: {
    position: 'absolute',
    top: 8,
    bottom: 8,
    width: 3,
  },
  railLeft: { left: 5 },
  railLeftInner: { left: 9, width: 1.5, backgroundColor: INK, opacity: 0.75 },
  railRight: { right: 5 },
  railRightInner: { right: 9, width: 1.5, backgroundColor: INK, opacity: 0.75 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  codeChip: {
    backgroundColor: INK,
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  codeText: {
    fontFamily: fonts.mono,
  },
  destination: {
    fontFamily: fonts.narrowBold,
    fontSize: 25,
    lineHeight: 28,
    letterSpacing: 1,
  },
  destinationSm: {
    fontSize: 20,
    lineHeight: 23,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: space.xs,
  },
  dataCell: {
    flexShrink: 1,
  },
  dataCellLast: {
    flexShrink: 0,
    alignItems: 'flex-end',
  },
  labelSm: {
    fontSize: 7,
    letterSpacing: 0.5,
  },
  valueSm: {
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.2,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  footerRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  flagBlock: {
    width: 16,
    height: 10,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'rgba(28,25,23,0.35)',
  },
});
