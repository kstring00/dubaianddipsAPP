import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius } from '@/constants/theme';
import { openToast, toastLinks } from '@/lib/toast';

export default function RewardsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.eyebrow}>Boarding Club</Text>
        <Text style={styles.title}>Rewards without a second loyalty system.</Text>
        <Text style={styles.body}>
          We will send guests into the real Toast loyalty experience so balances,
          earning and redemption stay accurate.
        </Text>

        <View style={styles.pass}>
          <Text style={styles.passTop}>DUBAI & DIPS</Text>
          <Text style={styles.passTitle}>Boarding Club</Text>
          <View style={styles.rule} />
          <View style={styles.passRow}>
            <View>
              <Text style={styles.label}>Destination</Text>
              <Text style={styles.value}>Rewards</Text>
            </View>
            <Text style={styles.star}>✦</Text>
          </View>
        </View>

        <Pressable
          onPress={() => openToast(toastLinks.rewards || toastLinks.order)}
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        >
          <Text style={styles.buttonText}>View Toast rewards</Text>
          <Text style={styles.arrow}>→</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  container: { flex: 1, padding: 24, paddingTop: 38 },
  eyebrow: {
    color: colors.gold,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1.8,
  },
  title: {
    marginTop: 10,
    color: colors.ink,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '600',
    letterSpacing: -1.2,
  },
  body: {
    marginTop: 14,
    color: colors.muted,
    fontSize: 15,
    lineHeight: 23,
  },
  pass: {
    marginTop: 34,
    backgroundColor: colors.paper,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 24,
  },
  passTop: {
    color: colors.gold,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
  },
  passTitle: {
    color: colors.pine,
    fontSize: 30,
    fontWeight: '700',
    marginTop: 12,
  },
  rule: {
    height: 1,
    backgroundColor: colors.line,
    marginVertical: 24,
  },
  passRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: colors.muted,
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: '800',
    letterSpacing: 1.3,
  },
  value: {
    marginTop: 5,
    color: colors.ink,
    fontSize: 18,
    fontWeight: '700',
  },
  star: { color: colors.gold, fontSize: 28 },
  button: {
    marginTop: 18,
    height: 58,
    borderRadius: radius.pill,
    backgroundColor: colors.pine,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pressed: { opacity: 0.92, transform: [{ scale: 0.99 }] },
  buttonText: { color: colors.cream, fontSize: 15, fontWeight: '900' },
  arrow: { color: colors.goldSoft, fontSize: 22 },
});
