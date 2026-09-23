import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '@/constants/theme';

function Tower({ light = false }: { light?: boolean }) {
  return (
    <View style={styles.towerWrap}>
      <View style={[styles.towerTip, { borderBottomColor: light ? colors.offWhite : colors.bark }]} />
      <View style={[styles.towerBody, { backgroundColor: light ? colors.offWhite : colors.bark }]} />
      <View style={[styles.towerBase, { backgroundColor: light ? colors.offWhite : colors.bark }]} />
    </View>
  );
}

export function BrandMark({
  compact = false,
  light = false,
}: {
  compact?: boolean;
  light?: boolean;
}) {
  const ink = light ? colors.offWhite : colors.bark;

  if (compact) {
    return (
      <View style={styles.markWrap}>
        <Text style={[styles.markD, { color: ink }]}>D</Text>
        <Text style={[styles.markStar, { color: colors.brownedSugar }]}>✦</Text>
      </View>
    );
  }

  return (
    <View style={styles.secondaryWrap}>
      <View style={styles.logoRow}>
        <Text style={[styles.logoText, { color: ink }]}>DUBA</Text>
        <Tower light={light} />
      </View>
      <View style={styles.logoRowBottom}>
        <Text style={[styles.amp, { color: ink }]}>&</Text>
        <Text style={[styles.logoText, { color: ink }]}>DIPS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  secondaryWrap: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 31,
  },
  logoRowBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 31,
    marginTop: -4,
  },
  logoText: {
    fontFamily: fonts.display,
    fontSize: 28,
    lineHeight: 31,
    letterSpacing: -1.6,
  },
  amp: {
    fontFamily: fonts.display,
    fontSize: 31,
    lineHeight: 31,
    marginRight: 1,
    marginTop: -1,
  },
  towerWrap: {
    width: 11,
    height: 29,
    marginLeft: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  towerTip: {
    width: 0,
    height: 0,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 7,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  towerBody: {
    width: 3,
    height: 16,
  },
  towerBase: {
    width: 7,
    height: 4,
  },
  markWrap: {
    width: 54,
    height: 54,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markD: {
    fontFamily: fonts.display,
    fontSize: 48,
    lineHeight: 52,
    letterSpacing: -3,
  },
  markStar: {
    position: 'absolute',
    right: 0,
    top: 2,
    fontSize: 15,
  },
});
