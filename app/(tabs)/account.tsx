import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandMark } from '@/components/BrandMark';
import { colors, radius } from '@/constants/theme';

const rows = [
  ['Notifications', 'Configure'],
  ['Favorite destinations', 'Choose'],
  ['Dietary preferences', 'Add'],
  ['Help & support', 'Open'],
];

export default function AccountScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.profileTop}>
          <BrandMark compact />
          <View style={styles.profileCopy}>
            <Text style={styles.eyebrow}>YOUR PASSPORT</Text>
            <Text style={styles.title}>Dubai & Dips</Text>
          </View>
        </View>

        <Text style={styles.body}>
          Save app preferences here. Live order history, checkout and loyalty will
          stay with Toast when those channels are activated.
        </Text>

        <View style={styles.pass}>
          <Text style={styles.passLabel}>PASSENGER</Text>
          <Text style={styles.passName}>Sweet-tooth traveler</Text>
          <View style={styles.passRule} />
          <View style={styles.passBottom}>
            <View>
              <Text style={styles.passLabel}>HOME AIRPORT</Text>
              <Text style={styles.passValue}>DXB & DIPS</Text>
            </View>
            <Text style={styles.passStar}>✦</Text>
          </View>
        </View>

        <View style={styles.panel}>
          {rows.map(([label, action], index) => (
            <Pressable
              key={label}
              onPress={() => Haptics.selectionAsync()}
              style={[
                styles.row,
                index !== rows.length - 1 && styles.rowBorder,
              ]}
            >
              <Text style={styles.rowLabel}>{label}</Text>
              <View style={styles.rowAction}>
                <Text style={styles.action}>{action}</Text>
                <Text style={styles.chevron}>›</Text>
              </View>
            </Pressable>
          ))}
        </View>

        <Text style={styles.version}>DUBAI & DIPS · APP PREVIEW 1.0</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  container: { flex: 1, padding: 22, paddingTop: 32 },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  profileCopy: { flex: 1 },
  eyebrow: {
    color: colors.gold,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 2.2,
  },
  title: {
    color: colors.ink,
    fontFamily: 'Georgia',
    fontSize: 31,
    marginTop: 4,
  },
  body: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 22,
  },
  pass: {
    marginTop: 28,
    borderRadius: radius.lg,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 22,
  },
  passLabel: {
    color: colors.gold,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 2,
  },
  passName: {
    color: colors.ink,
    fontFamily: 'Georgia',
    fontSize: 26,
    marginTop: 7,
  },
  passRule: {
    height: 1,
    backgroundColor: colors.line,
    marginVertical: 20,
  },
  passBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  passValue: {
    color: colors.pine,
    fontSize: 13,
    fontWeight: '800',
    marginTop: 5,
    letterSpacing: 1,
  },
  passStar: { color: colors.gold, fontSize: 24 },
  panel: {
    marginTop: 18,
    backgroundColor: colors.paper,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: 'hidden',
  },
  row: {
    minHeight: 64,
    paddingHorizontal: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  rowLabel: { color: colors.ink, fontSize: 13, fontWeight: '700' },
  rowAction: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  action: {
    color: colors.gold,
    fontSize: 9,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  chevron: { color: colors.muted, fontSize: 20 },
  version: {
    textAlign: 'center',
    color: '#9C9288',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginTop: 24,
  },
});
