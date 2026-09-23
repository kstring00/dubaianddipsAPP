import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/theme';

export function BrandMark() {
  return (
    <View style={styles.mark}>
      <Text style={styles.dd}>D&D</Text>
      <View style={styles.starRow}>
        <Text style={styles.star}>✦</Text>
        <Text style={styles.starSmall}>✧</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mark: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: colors.pine,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.goldSoft,
  },
  dd: {
    color: colors.cream,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  starRow: {
    flexDirection: 'row',
    gap: 2,
    marginTop: -1,
  },
  star: {
    color: colors.gold,
    fontSize: 9,
  },
  starSmall: {
    color: colors.goldSoft,
    fontSize: 7,
    marginTop: 2,
  },
});
