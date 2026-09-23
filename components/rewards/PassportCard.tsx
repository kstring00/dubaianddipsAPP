import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/shared/AppText';
import { Barcode } from '@/components/brand/Barcode';
import { BrandMark } from '@/components/brand/BrandMark';
import { BrandPattern } from '@/components/brand/BrandPattern';
import { StarFour } from '@/components/brand/StarFour';
import { colors, radius, shadow, space } from '@/constants/theme';

/** The account "passport" — a compact travel document on Courtyard green. */
export function PassportCard() {
  return (
    <View style={styles.shadow}>
      <View style={styles.card}>
        <BrandPattern color={colors.mint} opacity={0.06} cell={58} height={260} />

        <View style={styles.topRow}>
          <BrandMark variant="mark" size={24} light />
          <View style={styles.passportLabel}>
            <AppText variant="ticketLabel" color={colors.mint} align="right">
              D&amp;D{'\n'}PASSPORT
            </AppText>
          </View>
        </View>

        <View style={styles.center}>
          <StarFour size={16} color={colors.sugar} />
          <AppText variant="title" color={colors.onGreen} style={styles.name}>
            Sweet-tooth traveler
          </AppText>
          <AppText variant="ticketLabel" color={colors.onGreenSoft}>
            SWEET DESTINATIONS AHEAD
          </AppText>
        </View>

        <View style={styles.bottomRow}>
          <View>
            <AppText variant="ticketLabel" color={colors.onGreenFaint}>
              HOME AIRPORT
            </AppText>
            <AppText variant="ticketValue" color={colors.onGreen}>
              DXB &amp; DIPS
            </AppText>
          </View>
          <View style={styles.bottomRight}>
            <AppText variant="ticketLabel" color={colors.onGreenFaint}>
              STATUS
            </AppText>
            <AppText variant="ticketValue" color={colors.onGreen}>
              BOARDING
            </AppText>
          </View>
        </View>

        <View style={styles.footer}>
          <Barcode
            seed="DD-PASSPORT"
            height={14}
            bars={30}
            color="rgba(230,219,198,0.55)"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    ...shadow.card,
  },
  card: {
    borderRadius: radius.lg,
    backgroundColor: colors.green,
    borderWidth: 1,
    borderColor: colors.greenEdge,
    padding: space.xl,
    overflow: 'hidden',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  passportLabel: {
    alignItems: 'flex-end',
  },
  center: {
    alignItems: 'center',
    marginTop: space.xl,
    gap: space.sm,
  },
  name: {
    fontSize: 24,
  },
  bottomRow: {
    marginTop: space.xxl,
    paddingTop: space.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.onGreenLine,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomRight: {
    alignItems: 'flex-end',
  },
  footer: {
    marginTop: space.lg,
    alignItems: 'center',
  },
});
