import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius } from '@/constants/theme';

const rows = [
  ['Notifications', 'Coming next'],
  ['Favorite destinations', 'Coming next'],
  ['App preferences', 'Coming next'],
];

export default function AccountScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.eyebrow}>You</Text>
        <Text style={styles.title}>Your Dubai & Dips.</Text>
        <Text style={styles.body}>
          This area will hold app-only preferences. We will keep transactional
          account data inside Toast unless there is a strong reason to integrate it.
        </Text>

        <View style={styles.panel}>
          {rows.map(([label, status], index) => (
            <View
              key={label}
              style={[
                styles.row,
                index !== rows.length - 1 && styles.rowBorder,
              ]}
            >
              <Text style={styles.rowLabel}>{label}</Text>
              <Text style={styles.status}>{status}</Text>
            </View>
          ))}
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
    fontSize: 36,
    lineHeight: 41,
    fontWeight: '600',
    letterSpacing: -1.2,
  },
  body: {
    marginTop: 14,
    color: colors.muted,
    fontSize: 15,
    lineHeight: 23,
  },
  panel: {
    marginTop: 34,
    backgroundColor: colors.paper,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: 'hidden',
  },
  row: {
    minHeight: 68,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  rowLabel: { color: colors.ink, fontSize: 15, fontWeight: '700' },
  status: {
    color: colors.gold,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
