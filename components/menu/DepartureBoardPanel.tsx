import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/shared/AppText';
import { StarFour } from '@/components/brand/StarFour';
import { PressableScale } from '@/components/shared/PressableScale';
import { departures, Departure } from '@/constants/menu';
import { colors, fonts, gutter, radius, shadow, space } from '@/constants/theme';

const BOARD_INK = '#EDE4D4';
const BOARD_DIM = 'rgba(237,228,212,0.5)';

type DepartureBoardPanelProps = {
  onSelect: (departure: Departure) => void;
};

/**
 * Airport departure board on Bark: condensed columns, amber status lights,
 * one row per category. The signature object of the Order screen.
 */
export function DepartureBoardPanel({ onSelect }: DepartureBoardPanelProps) {
  return (
    <View style={styles.board}>
      <View style={styles.boardHeader}>
        <View style={styles.headerLeft}>
          <StarFour size={10} color={colors.sugar} />
          <AppText variant="ticketLabel" color={BOARD_DIM}>
            D&amp;D AIRLINES · DEPARTURES
          </AppText>
        </View>
        <AppText variant="ticketLabel" color={BOARD_DIM}>
          DAILY
        </AppText>
      </View>

      <View style={styles.columns}>
        {['DEST', 'BOARD', 'GATE', 'STATUS'].map((column) => (
          <AppText
            key={column}
            variant="ticketLabel"
            color={BOARD_DIM}
            style={[styles.cell, column === 'BOARD' && styles.cellWide]}
          >
            {column}
          </AppText>
        ))}
      </View>

      {departures.map((departure, index) => (
        <PressableScale
          key={departure.code}
          onPress={() => onSelect(departure)}
          pressedScale={0.99}
          haptic="tap"
          accessibilityLabel={`${departure.label} to ${departure.destination}, ${departure.status.toLowerCase()}`}
          accessibilityHint="Opens this part of the menu"
        >
          <View style={[styles.row, index > 0 && styles.rowBorder]}>
            <AppText style={[styles.mono, styles.cell]}>{departure.code}</AppText>
            <AppText style={[styles.mono, styles.cell, styles.cellWide]} numberOfLines={1}>
              {departure.label.toUpperCase()}
            </AppText>
            <AppText style={[styles.mono, styles.cell]}>{departure.gate}</AppText>
            <View style={[styles.cell, styles.statusCell]}>
              <View
                style={[
                  styles.light,
                  departure.status === 'BOARDING' && styles.lightBoarding,
                ]}
              />
              <AppText style={styles.statusText} numberOfLines={1}>
                {departure.status}
              </AppText>
            </View>
          </View>
        </PressableScale>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    marginHorizontal: gutter,
    borderRadius: radius.lg,
    backgroundColor: colors.bark,
    borderWidth: 1,
    borderColor: '#5C4D44',
    paddingVertical: space.md,
    overflow: 'hidden',
    ...shadow.card,
  },
  boardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: space.lg,
    paddingBottom: space.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(237,228,212,0.22)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
  },
  columns: {
    flexDirection: 'row',
    paddingHorizontal: space.lg,
    paddingTop: space.md,
    paddingBottom: space.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
  },
  rowBorder: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(237,228,212,0.14)',
  },
  cell: {
    flex: 1,
  },
  cellWide: {
    flex: 1.6,
  },
  mono: {
    fontFamily: fonts.mono,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.8,
    color: BOARD_INK,
  },
  statusCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  light: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.sugar,
  },
  lightBoarding: {
    backgroundColor: colors.mint,
  },
  statusText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    lineHeight: 13,
    letterSpacing: 0.4,
    color: BOARD_INK,
    flexShrink: 1,
  },
});
