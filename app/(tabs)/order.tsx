import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius } from '@/constants/theme';
import { openToast, toastLinks } from '@/lib/toast';

export default function OrderScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.eyebrow}>Order</Text>
        <Text style={styles.title}>The menu stays in Toast.</Text>
        <Text style={styles.body}>
          Dubai & Dips owns the experience around the order. Toast remains the
          source of truth for menu availability, modifiers, cart, payment,
          fulfillment and POS routing.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardCode}>D&D → TOAST</Text>
          <Text style={styles.cardTitle}>Ready for takeoff?</Text>
          <Text style={styles.cardBody}>
            Open the live ordering channel and complete your order there.
          </Text>
          <Pressable
            onPress={() => openToast(toastLinks.order)}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>Open ordering</Text>
            <Text style={styles.arrow}>→</Text>
          </Pressable>
        </View>
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
    fontSize: 35,
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
  card: {
    marginTop: 34,
    backgroundColor: colors.pine,
    borderRadius: radius.lg,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.goldSoft,
  },
  cardCode: {
    color: colors.goldSoft,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
  },
  cardTitle: {
    marginTop: 18,
    color: colors.cream,
    fontSize: 27,
    fontWeight: '600',
  },
  cardBody: {
    marginTop: 10,
    color: 'rgba(244,239,229,0.72)',
    lineHeight: 21,
    fontSize: 14,
  },
  button: {
    marginTop: 28,
    height: 56,
    borderRadius: radius.pill,
    backgroundColor: colors.cream,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonPressed: { opacity: 0.9, transform: [{ scale: 0.99 }] },
  buttonText: { color: colors.pine, fontWeight: '900', fontSize: 15 },
  arrow: { color: colors.gold, fontSize: 22 },
});
