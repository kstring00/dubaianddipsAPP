import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandMark } from '@/components/BrandMark';
import { BrandPattern } from '@/components/BrandPattern';
import { colors, fonts, radius, shadow } from '@/constants/theme';

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

        <View style={styles.passport}>
          <BrandPattern color={colors.mintCondition} opacity={0.08} dense />
          <View style={styles.passportTop}>
            <BrandMark compact light />
            <Text style={styles.passportType}>D&D{'\n'}PASSPORT</Text>
          </View>

          <View style={styles.passportCenter}>
            <Text style={styles.passportStar}>✦</Text>
            <Text style={styles.passportName}>Sweet-tooth traveler</Text>
            <Text style={styles.passportSub}>SWEET DESTINATIONS AHEAD</Text>
          </View>

          <View style={styles.passportBottom}>
            <View>
              <Text style={styles.passLabel}>HOME AIRPORT</Text>
              <Text style={styles.passValue}>DXB & DIPS</Text>
            </View>
            <View>
              <Text style={styles.passLabel}>STATUS</Text>
              <Text style={styles.passValue}>BOARDING</Text>
            </View>
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
  safe: { flex: 1, backgroundColor: colors.offWhite },
  container: { flex: 1, padding: 22, paddingTop: 30 },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  profileCopy: { flex: 1 },
  eyebrow: {
    color: colors.courtyard,
    fontFamily: fonts.narrow,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 2.1,
  },
  title: {
    color: colors.bark,
    fontFamily: fonts.body,
    fontSize: 28,
    fontWeight: '500',
    marginTop: 3,
  },
  body: {
    color: colors.muted,
    fontFamily: fonts.body,
    fontSize: 12,
    lineHeight: 19,
    marginTop: 20,
  },
  passport: {
    minHeight: 260,
    marginTop: 25,
    borderRadius: radius.lg,
    backgroundColor: colors.courtyard,
    padding: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#60715C',
    ...shadow.card,
  },
  passportTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  passportType: {
    color: colors.mintCondition,
    fontFamily: fonts.narrow,
    fontSize: 8,
    lineHeight: 12,
    letterSpacing: 2.1,
    textAlign: 'right',
    fontWeight: '900',
  },
  passportCenter: {
    alignItems: 'center',
    marginTop: 22,
  },
  passportStar: {
    color: colors.brownedSugar,
    fontSize: 20,
  },
  passportName: {
    color: colors.offWhite,
    fontFamily: fonts.display,
    fontSize: 25,
    marginTop: 8,
  },
  passportSub: {
    color: colors.mintCondition,
    fontFamily: fonts.narrow,
    fontSize: 7,
    letterSpacing: 1.8,
    marginTop: 7,
  },
  passportBottom: {
    marginTop: 30,
    paddingTop: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(230,219,198,0.28)',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  passLabel: {
    color: 'rgba(230,219,198,0.56)',
    fontFamily: fonts.narrow,
    fontSize: 6,
    letterSpacing: 1,
  },
  passValue: {
    color: colors.offWhite,
    fontFamily: fonts.narrow,
    fontSize: 9,
    marginTop: 4,
    letterSpacing: 1,
  },
  panel: {
    marginTop: 18,
    backgroundColor: colors.paper,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: 'hidden',
  },
  row: {
    minHeight: 61,
    paddingHorizontal: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  rowLabel: {
    color: colors.bark,
    fontFamily: fonts.body,
    fontSize: 12,
    fontWeight: '700',
  },
  rowAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  action: {
    color: colors.brownedSugar,
    fontFamily: fonts.narrow,
    fontSize: 8,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  chevron: {
    color: colors.courtyard,
    fontSize: 20,
  },
  version: {
    textAlign: 'center',
    color: '#8E817A',
    fontFamily: fonts.narrow,
    fontSize: 7,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginTop: 22,
  },
});
