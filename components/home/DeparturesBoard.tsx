import { ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/shared/AppText';
import { Barcode } from '@/components/brand/Barcode';
import { PressableScale } from '@/components/shared/PressableScale';
import { Departure, departures } from '@/constants/menu';
import { colors, fonts, gutter, radius, shadow, space } from '@/constants/theme';

type DeparturesBoardProps = {
  onSelect: (departure: Departure) => void;
};

function DepartureTicket({
  departure,
  onSelect,
}: {
  departure: Departure;
  onSelect: (departure: Departure) => void;
}) {
  const onDark = departure.accent === colors.green || departure.accent === colors.bark;
  const stripInk = onDark ? colors.onGreen : colors.bark;

  return (
    <PressableScale
      onPress={() => onSelect(departure)}
      haptic="tap"
      accessibilityLabel={`${departure.label}, departure ${departure.code} to ${departure.destination}`}
      accessibilityHint="Opens the menu"
      style={styles.ticketShadow}
    >
      <View style={styles.ticket}>
        <View style={[styles.strip, { backgroundColor: departure.accent }]}>
          <AppText variant="ticketLabel" color={stripInk}>
            {departure.label.toUpperCase()}
          </AppText>
          <AppText style={[styles.code, { color: stripInk }]}>{departure.code}</AppText>
        </View>

        <View style={styles.stub}>
          <View style={styles.notch} />
          <View style={[styles.notch, styles.notchBottom]} />

          <AppText variant="micro" color={colors.ink} style={styles.destination}>
            {departure.destination}
          </AppText>

          <View style={styles.statusRow}>
            <View
              style={[
                styles.statusDot,
                departure.status === 'BOARDING' && styles.statusDotLive,
              ]}
            />
            <AppText variant="ticketLabel" color={colors.inkFaint}>
              {departure.status}
            </AppText>
          </View>

          <Barcode seed={departure.code + departure.label} height={10} bars={16} />
        </View>
      </View>
    </PressableScale>
  );
}

/** Horizontal rail of miniature departure tickets. */
export function DeparturesBoard({ onSelect }: DeparturesBoardProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
      decelerationRate="fast"
    >
      {departures.map((departure) => (
        <DepartureTicket
          key={departure.code}
          departure={departure}
          onSelect={onSelect}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: gutter,
    paddingVertical: space.xs,
    gap: space.md,
  },
  ticketShadow: {
    ...shadow.card,
  },
  ticket: {
    width: 128,
    borderRadius: radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.lineSoft,
    backgroundColor: colors.card,
  },
  strip: {
    paddingHorizontal: space.md,
    paddingVertical: space.md,
    gap: 2,
  },
  code: {
    fontFamily: fonts.narrowBold,
    fontSize: 30,
    lineHeight: 34,
    letterSpacing: 1.5,
  },
  stub: {
    paddingHorizontal: space.md,
    paddingTop: space.md,
    paddingBottom: space.md,
    gap: space.sm,
    borderTopWidth: 1,
    borderTopColor: colors.lineSoft,
    borderStyle: 'dashed',
  },
  notch: {
    position: 'absolute',
    top: -5,
    left: -6,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.canvas,
  },
  notchBottom: {
    left: undefined,
    right: -6,
  },
  destination: {
    letterSpacing: 2,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.sugar,
  },
  statusDotLive: {
    backgroundColor: colors.green,
  },
});
