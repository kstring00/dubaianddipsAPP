import { StyleSheet, View } from 'react-native';
import { colors } from '@/constants/theme';

export function DrinkArtwork() {
  return (
    <View style={styles.stage}>
      <View style={styles.halo} />
      <View style={styles.cup}>
        <View style={styles.foam}>
          <View style={styles.drizzleA} />
          <View style={styles.drizzleB} />
        </View>
        <View style={styles.chocolate} />
        <View style={styles.pistachio} />
        <View style={styles.chocolateBottom} />
      </View>
      <View style={styles.straw} />
      <View style={styles.sparkleOne} />
      <View style={styles.sparkleTwo} />
    </View>
  );
}

const styles = StyleSheet.create({
  stage: {
    height: 210,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  halo: {
    position: 'absolute',
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: 'rgba(179,154,90,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(179,154,90,0.20)',
  },
  cup: {
    width: 124,
    height: 154,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(25,36,31,0.14)',
    backgroundColor: '#E9D8BB',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 7 },
    elevation: 7,
  },
  foam: {
    height: 34,
    backgroundColor: '#FAF4E9',
    overflow: 'hidden',
  },
  drizzleA: {
    width: 100,
    height: 8,
    borderRadius: 8,
    backgroundColor: '#6F4932',
    transform: [{ rotate: '-9deg' }],
    marginLeft: 8,
    marginTop: 6,
  },
  drizzleB: {
    width: 88,
    height: 7,
    borderRadius: 8,
    backgroundColor: colors.gold,
    transform: [{ rotate: '7deg' }],
    marginLeft: 18,
    marginTop: 3,
  },
  chocolate: {
    height: 40,
    backgroundColor: '#6C4735',
  },
  pistachio: {
    height: 48,
    backgroundColor: '#8C9D67',
  },
  chocolateBottom: {
    flex: 1,
    backgroundColor: '#4D342A',
  },
  straw: {
    position: 'absolute',
    width: 7,
    height: 106,
    borderRadius: 4,
    backgroundColor: colors.pine,
    top: 14,
    marginLeft: 74,
    transform: [{ rotate: '9deg' }],
  },
  sparkleOne: {
    position: 'absolute',
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: colors.gold,
    top: 42,
    left: 44,
  },
  sparkleTwo: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.goldSoft,
    bottom: 47,
    right: 48,
  },
});
