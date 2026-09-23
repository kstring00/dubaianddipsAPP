import { ScrollView, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/shared/AppText';
import { MembershipCard } from '@/components/rewards/MembershipCard';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { StarFour } from '@/components/brand/StarFour';
import { colors, gutter, space } from '@/constants/theme';
import { hasToastLink, openToast, previewMode, toastLinks } from '@/lib/toast';

type IoniconName = keyof typeof Ionicons.glyphMap;

const steps: { icon: IoniconName; title: string; body: string }[] = [
  {
    icon: 'sparkles-outline',
    title: 'Earn',
    body: 'Collect points on every order once Toast Loyalty is live.',
  },
  {
    icon: 'gift-outline',
    title: 'Redeem',
    body: 'Trade points for drinks, desserts and member-only drops.',
  },
  {
    icon: 'airplane-outline',
    title: 'Travel further',
    body: 'Seasonal destinations unlock extra rewards for members.',
  },
];

export default function RewardsScreen() {
  const rewardsLive = hasToastLink(toastLinks.rewards);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <AppText variant="micro" color={colors.green}>
            Boarding Club
          </AppText>
          <AppText variant="hero" color={colors.ink} style={styles.title}>
            Membership,{'\n'}first class.
          </AppText>
        </View>

        <View style={styles.cardWrap}>
          <MembershipCard rewardsLive={rewardsLive} />
        </View>

        {previewMode ? (
          <AppText variant="footnote" color={colors.inkFaint} style={styles.previewNote}>
            Sample balance for design preview — real points come from Toast
            Loyalty at launch.
          </AppText>
        ) : null}

        <View style={styles.steps}>
          {steps.map((step, index) => (
            <View
              key={step.title}
              style={[styles.step, index > 0 && styles.stepBorder]}
            >
              <View style={styles.stepIcon}>
                <Ionicons name={step.icon} size={17} color={colors.green} />
              </View>
              <View style={styles.stepCopy}>
                <AppText variant="heading" color={colors.ink}>
                  {step.title}
                </AppText>
                <AppText variant="caption" color={colors.inkSoft}>
                  {step.body}
                </AppText>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.memberRow}>
          <StarFour size={11} color={colors.sugar} />
          <AppText variant="footnote" color={colors.inkSoft} style={styles.memberText}>
            Membership, points and redemptions are managed by Toast — the app
            is your boarding pass to them.
          </AppText>
        </View>

        <PrimaryButton
          label={rewardsLive ? 'Open live rewards' : 'Rewards coming soon'}
          muted={!rewardsLive}
          onPress={() => openToast(toastLinks.rewards || toastLinks.order)}
          accessibilityHint="Opens Toast rewards"
          style={styles.cta}
        />
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
  previewNote: {
    paddingHorizontal: gutter,
    marginTop: space.md,
  },
  steps: {
    marginHorizontal: gutter,
    marginTop: space.x3l,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.lg,
    paddingVertical: space.lg,
  },
  stepBorder: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.line,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCopy: {
    flex: 1,
    gap: 2,
  },
  memberRow: {
    marginHorizontal: gutter,
    marginTop: space.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
  },
  memberText: {
    flex: 1,
  },
  cta: {
    marginHorizontal: gutter,
    marginTop: space.xxl,
  },
});
