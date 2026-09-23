import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/theme';

export function DrinkArtwork({ small = false }: { small?: boolean }) {
  return (
    <View style={[styles.stage, small && styles.stageSmall]}>
      <View style={[styles.halo, small && styles.haloSmall]} />
      <View style={[styles.straw, small && styles.strawSmall]} />
      <View style={[styles.lid, small && styles.lidSmall]} />
      <View style={[styles.foamBase, small && styles.foamSmall]}>
        <View style={styles.foamBumpOne} />
        <View style={styles.foamBumpTwo} />
        <View style={styles.foamBumpThree} />
        <View style={styles.drizzleOne} />
        <View style={styles.drizzleTwo} />
      </View>
      <View style={[styles.cup, small && styles.cupSmall]}>
        <LinearGradient
          colors={['#EFE0BE', '#B6BE7A', '#E5C598', '#72513E']}
          locations={[0, 0.35, 0.62, 1]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.chocolateRibbonOne} />
        <View style={styles.chocolateRibbonTwo} />
        <View style={styles.pistachioRibbon} />
        <View style={[styles.cupMark, small && styles.cupMarkSmall]} />
      </View>
      <View style={[styles.shadow, small && styles.shadowSmall]} />
      <View style={styles.sparkleA} />
      <View style={styles.sparkleB} />
    </View>
  );
}

const styles = StyleSheet.create({
  stage: {
    width: 190,
    height: 225,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  stageSmall: {
    width: 86,
    height: 94,
    transform: [{ scale: 0.64 }],
  },
  halo: {
    position: 'absolute',
    width: 178,
    height: 178,
    borderRadius: 89,
    bottom: 24,
    backgroundColor: 'rgba(255,255,255,0.28)',
    borderWidth: 1,
    borderColor: 'rgba(180,149,85,0.28)',
  },
  haloSmall: {
    bottom: -20,
  },
  straw: {
    position: 'absolute',
    width: 8,
    height: 116,
    right: 37,
    top: 0,
    borderRadius: 6,
    backgroundColor: colors.pineDark,
    transform: [{ rotate: '8deg' }],
    zIndex: 6,
  },
  strawSmall: {},
  lid: {
    position: 'absolute',
    bottom: 160,
    width: 118,
    height: 10,
    borderRadius: 7,
    backgroundColor: '#E4D6C5',
    borderWidth: 1,
    borderColor: '#B9A994',
    zIndex: 5,
  },
  lidSmall: {},
  foamBase: {
    position: 'absolute',
    bottom: 165,
    width: 100,
    height: 47,
    zIndex: 4,
  },
  foamSmall: {},
  foamBumpOne: {
    position: 'absolute',
    width: 62,
    height: 38,
    left: 5,
    bottom: 0,
    borderRadius: 30,
    backgroundColor: '#FFF9ED',
  },
  foamBumpTwo: {
    position: 'absolute',
    width: 52,
    height: 43,
    right: 2,
    bottom: 0,
    borderRadius: 27,
    backgroundColor: '#FFF9ED',
  },
  foamBumpThree: {
    position: 'absolute',
    width: 44,
    height: 44,
    left: 29,
    top: -10,
    borderRadius: 24,
    backgroundColor: '#FFF9ED',
  },
  drizzleOne: {
    position: 'absolute',
    left: 14,
    top: 10,
    width: 72,
    height: 6,
    borderRadius: 5,
    backgroundColor: colors.chocolate,
    transform: [{ rotate: '-7deg' }],
    zIndex: 7,
  },
  drizzleTwo: {
    position: 'absolute',
    left: 25,
    top: 26,
    width: 61,
    height: 5,
    borderRadius: 5,
    backgroundColor: colors.pistachio,
    transform: [{ rotate: '8deg' }],
    zIndex: 7,
  },
  cup: {
    width: 110,
    height: 166,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(47,36,29,0.18)',
    zIndex: 3,
  },
  cupSmall: {},
  chocolateRibbonOne: {
    position: 'absolute',
    width: 145,
    height: 19,
    backgroundColor: 'rgba(79,48,35,0.92)',
    top: 55,
    left: -22,
    transform: [{ rotate: '-12deg' }],
    borderRadius: 12,
  },
  chocolateRibbonTwo: {
    position: 'absolute',
    width: 125,
    height: 14,
    backgroundColor: 'rgba(93,57,42,0.88)',
    bottom: 38,
    left: -10,
    transform: [{ rotate: '14deg' }],
    borderRadius: 12,
  },
  pistachioRibbon: {
    position: 'absolute',
    width: 145,
    height: 16,
    backgroundColor: 'rgba(134,154,90,0.88)',
    top: 88,
    left: -18,
    transform: [{ rotate: '8deg' }],
    borderRadius: 12,
  },
  cupMark: {
    position: 'absolute',
    width: 42,
    height: 42,
    borderRadius: 21,
    left: 34,
    top: 82,
    borderWidth: 1.5,
    borderColor: 'rgba(32,63,44,0.75)',
    backgroundColor: 'rgba(245,240,230,0.42)',
  },
  cupMarkSmall: {},
  shadow: {
    position: 'absolute',
    bottom: -5,
    width: 124,
    height: 17,
    borderRadius: 30,
    backgroundColor: 'rgba(47,36,29,0.14)',
    transform: [{ scaleX: 1.2 }],
  },
  shadowSmall: {},
  sparkleA: {
    position: 'absolute',
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.gold,
    left: 21,
    top: 58,
  },
  sparkleB: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.goldSoft,
    right: 14,
    bottom: 54,
  },
});
