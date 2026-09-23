import { ScrollView, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/shared/AppText';
import { PassportCard } from '@/components/rewards/PassportCard';
import { PressableScale } from '@/components/shared/PressableScale';
import { colors, gutter, radius, space } from '@/constants/theme';

type IoniconName = keyof typeof Ionicons.glyphMap;

type Row = { icon: IoniconName; label: string; detail: string };

const sections: { title: string; rows: Row[] }[] = [
  {
    title: 'Preferences',
    rows: [
      { icon: 'notifications-outline', label: 'Notifications', detail: 'Order updates & drops' },
      { icon: 'heart-outline', label: 'Favorite destinations', detail: 'Save your regulars' },
      { icon: 'leaf-outline', label: 'Dietary preferences', detail: 'Allergens & swaps' },
    ],
  },
  {
    title: 'Travel records',
    rows: [
      { icon: 'receipt-outline', label: 'Order history', detail: 'Lives in Toast at launch' },
      { icon: 'help-buoy-outline', label: 'Help & support', detail: 'We reply fast' },
      { icon: 'settings-outline', label: 'App settings', detail: 'Version & legal' },
    ],
  },
];

export default function AccountScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <AppText variant="micro" color={colors.green}>
            Your passport
          </AppText>
          <AppText variant="hero" color={colors.ink} style={styles.title}>
            Ready for{'\n'}boarding.
          </AppText>
        </View>

        <View style={styles.cardWrap}>
          <PassportCard />
        </View>

        {sections.map((section) => (
          <View key={section.title} style={styles.section}>
            <AppText variant="micro" color={colors.inkFaint} style={styles.sectionTitle}>
              {section.title}
            </AppText>
            <View style={styles.panel}>
              {section.rows.map((row, index) => (
                <PressableScale
                  key={row.label}
                  pressedScale={0.99}
                  haptic="select"
                  onPress={() => {}}
                  accessibilityLabel={row.label}
                >
                  <View style={[styles.row, index > 0 && styles.rowBorder]}>
                    <View style={styles.rowIcon}>
                      <Ionicons name={row.icon} size={16} color={colors.green} />
                    </View>
                    <View style={styles.rowCopy}>
                      <AppText variant="heading" color={colors.ink} style={styles.rowLabel}>
                        {row.label}
                      </AppText>
                      <AppText variant="footnote" color={colors.inkFaint}>
                        {row.detail}
                      </AppText>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color={colors.inkFaint} />
                  </View>
                </PressableScale>
              ))}
            </View>
          </View>
        ))}

        <AppText
          variant="footnote"
          color={colors.inkFaint}
          align="center"
          style={styles.version}
        >
          DUBAI &amp; DIPS · v1.0
        </AppText>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  content: {
    paddingBottom: space.x4l,
  },
  header: {
    paddingHorizontal: gutter,
    paddingTop: space.xxl,
  },
  title: {
    marginTop: space.sm,
  },
  cardWrap: {
    paddingHorizontal: gutter,
    marginTop: space.xxl,
  },
  section: {
    marginTop: space.x3l,
  },
  sectionTitle: {
    paddingHorizontal: gutter,
    marginBottom: space.md,
  },
  panel: {
    marginHorizontal: gutter,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    paddingHorizontal: space.lg,
    paddingVertical: space.md + 2,
  },
  rowBorder: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.line,
  },
  rowIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowCopy: {
    flex: 1,
    gap: 1,
  },
  rowLabel: {
    fontSize: 15,
    lineHeight: 20,
  },
  version: {
    marginTop: space.x3l,
  },
});
