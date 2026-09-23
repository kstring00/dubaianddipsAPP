import { useMemo } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BoardingPass } from '@/components/BoardingPass';
import { BrandMark } from '@/components/BrandMark';
import { BrandPattern } from '@/components/BrandPattern';
import { DrinkArtwork } from '@/components/DrinkArtwork';
import { departures } from '@/constants/menu';
import { colors, fonts, radius, shadow } from '@/constants/theme';
import { hasToastLink, openToast, previewMode, toastLinks } from '@/lib/toast';

export default function HomeScreen() {
  const router = useRouter();

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const order = async (url?: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (hasToastLink(url) || hasToastLink(toastLinks.order)) {
      await openToast(url);
      return;
    }
    router.push('/order');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.hero}>
          <BrandPattern color={colors.bark} opacity={0.035} dense />

          <View style={styles.topbar}>
            <BrandMark />
            <View style={styles.heroRight}>
              <Text style={styles.microcopy}>SWEET{'\n'}DESTINATIONS{'\n'}AHEAD</Text>
              <Pressable
                style={styles.bell}
                onPress={() => Haptics.selectionAsync()}
                accessibilityLabel="Notifications"
              >
                <Text style={styles.bellIcon}>✦</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.heroCopy}>
            <Text style={styles.greeting}>{greeting}, Kyle</Text>
            <Text style={styles.tagline}>DESSERTS BRING US FURTHER</Text>
          </View>

          <View style={styles.heroDecor}>
            <Text style={styles.heroScript}>More than{'\n'}desserts</Text>
            <Text style={styles.heroStar}>✦</Text>
          </View>
        </View>

        <Pressable
          onPress={() =>
            previewMode
              ? router.push('/rewards')
              : openToast(toastLinks.rewards || toastLinks.order)
          }
          style={({ pressed }) => [
            styles.rewardsCard,
            pressed && styles.pressed,
          ]}
        >
          <BrandPattern color={colors.mintCondition} opacity={0.08} />

          <View style={styles.rewardsTop}>
            <Text style={styles.rewardsEyebrow}>BOARDING CLUB</Text>
            <Text style={styles.rewardsSmall}>D&D AIRLINES</Text>
          </View>

          <View style={styles.rewardsMain}>
            <Text style={styles.plane}>✈</Text>
            <View style={styles.pointsBlock}>
              <Text style={styles.points}>
                {previewMode ? '420 points' : 'Boarding Club'}
              </Text>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: previewMode ? '72%' : '24%' },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                {previewMode ? '80 points until your next reward' : 'Rewards launching soon'}
              </Text>
            </View>
            <Text style={styles.cardChevron}>›</Text>
          </View>
        </Pressable>

        <View style={styles.featureCard}>
          <BrandPattern color={colors.bark} opacity={0.025} dense />

          <View style={styles.featureCopy}>
            <Text style={styles.featureEyebrow}>FEATURED DESTINATION</Text>
            <Text style={styles.featureTitle}>Dubai{'\n'}Chocolate{'\n'}Frappe</Text>
            <Text style={styles.featureBody}>Chocolate, pistachio and cream.</Text>

            <Pressable
              style={({ pressed }) => [
                styles.startButton,
                pressed && styles.startButtonPressed,
              ]}
              onPress={() => order(toastLinks.featured)}
            >
              <Text style={styles.startButtonText}>Start order</Text>
              <Text style={styles.startArrow}>→</Text>
            </Pressable>
          </View>

          <View style={styles.drinkWrap}>
            <DrinkArtwork />
          </View>

          <View style={styles.passWrap}>
            <BoardingPass
              compact
              code="DXB"
              destination="DUBAI"
              gate="A101"
              seat="2D"
              accent={colors.brownedSugar}
            />
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionStar}>✦</Text>
            <Text style={styles.sectionTitle}>Departures</Text>
          </View>
          <Pressable onPress={() => router.push('/order')}>
            <Text style={styles.explore}>EXPLORE THE MENU →</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.departuresRow}
        >
          {departures.map((item, index) => (
            <Pressable
              key={item.code}
              onPress={() => router.push('/order')}
              style={({ pressed }) => [
                styles.destinationCard,
                pressed && styles.destinationPressed,
              ]}
            >
              <View style={[styles.destinationTop, { backgroundColor: item.accent }]}>
                <Text
                  style={[
                    styles.destinationTopLabel,
                    {
                      color:
                        item.code === 'FCO' || item.code === 'DXB'
                          ? colors.offWhite
                          : colors.bark,
                    },
                  ]}
                >
                  {item.label.toUpperCase()}
                </Text>
                {index === 0 ? (
                  <View style={styles.miniDrink}>
                    <DrinkArtwork small />
                  </View>
                ) : (
                  <Text
                    style={[
                      styles.destinationGlyph,
                      {
                        color:
                          item.code === 'FCO' || item.code === 'DXB'
                            ? colors.offWhite
                            : colors.bark,
                      },
                    ]}
                  >
                    ✦
                  </Text>
                )}
              </View>

              <View style={styles.ticketBottom}>
                <View style={styles.miniBarcode}>
                  {Array.from({ length: 12 }).map((_, barIndex) => (
                    <View
                      key={barIndex}
                      style={[
                        styles.miniBar,
                        { height: 8 + ((barIndex * 5) % 10) },
                      ]}
                    />
                  ))}
                </View>
                <Text style={styles.destinationCode}>{item.code}</Text>
                <Text style={styles.destinationName}>{item.destination}</Text>
                <Text style={styles.destinationLabel}>{item.label}</Text>
                <Text style={styles.destinationArrow}>›</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionStar}>↻</Text>
            <Text style={styles.sectionTitle}>Order again</Text>
          </View>
          <Text style={styles.explore}>VIEW ALL →</Text>
        </View>

        <Pressable
          onPress={() => order(toastLinks.featured)}
          style={({ pressed }) => [
            styles.orderAgain,
            pressed && styles.pressed,
          ]}
        >
          <View style={styles.orderThumb}>
            <DrinkArtwork small />
          </View>
          <View style={styles.orderCopy}>
            <Text style={styles.orderRoute}>DXB · A101</Text>
            <Text style={styles.orderTitle}>Dubai Chocolate Frappe</Text>
            <Text style={styles.orderMeta}>Grande · Extra Pistachio</Text>
          </View>
          <Text style={styles.orderChevron}>›</Text>
        </Pressable>

        <Text style={styles.previewNote}>
          {previewMode
            ? 'Preview mode · Toast ordering and loyalty connect when the restaurant activates them.'
            : 'Order and rewards powered by Toast.'}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.offWhite,
  },
  content: {
    paddingBottom: 32,
  },
  hero: {
    minHeight: 255,
    overflow: 'hidden',
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 26,
    backgroundColor: colors.offWhite,
  },
  topbar: {
    zIndex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  heroRight: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  microcopy: {
    color: colors.bark,
    fontFamily: fonts.narrow,
    fontSize: 8,
    lineHeight: 11,
    letterSpacing: 2.1,
    fontWeight: '700',
    textAlign: 'center',
  },
  bell: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(73,60,53,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.28)',
  },
  bellIcon: {
    color: colors.brownedSugar,
    fontSize: 18,
  },
  heroCopy: {
    marginTop: 54,
    zIndex: 4,
  },
  greeting: {
    color: colors.bark,
    fontFamily: fonts.body,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '500',
    letterSpacing: -1,
  },
  tagline: {
    marginTop: 9,
    color: colors.courtyard,
    fontFamily: fonts.narrow,
    fontSize: 9,
    letterSpacing: 2.5,
    fontWeight: '700',
  },
  heroDecor: {
    position: 'absolute',
    right: 21,
    bottom: 22,
    alignItems: 'center',
  },
  heroScript: {
    color: colors.brownedSugar,
    fontFamily: fonts.editorial,
    fontStyle: 'italic',
    fontSize: 16,
    lineHeight: 18,
    textAlign: 'center',
    transform: [{ rotate: '-7deg' }],
  },
  heroStar: {
    color: colors.brownedSugar,
    marginTop: 8,
    fontSize: 15,
  },
  rewardsCard: {
    marginHorizontal: 20,
    marginTop: -10,
    minHeight: 145,
    borderRadius: radius.lg,
    padding: 20,
    overflow: 'hidden',
    backgroundColor: colors.courtyard,
    borderWidth: 1,
    borderColor: '#60715C',
    ...shadow.card,
  },
  pressed: {
    opacity: 0.94,
    transform: [{ scale: 0.99 }],
  },
  rewardsTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rewardsEyebrow: {
    color: colors.offWhite,
    fontFamily: fonts.narrow,
    fontSize: 9,
    letterSpacing: 2.7,
    fontWeight: '800',
  },
  rewardsSmall: {
    color: colors.mintCondition,
    fontFamily: fonts.narrow,
    fontSize: 8,
    letterSpacing: 2,
    fontWeight: '800',
  },
  rewardsMain: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  plane: {
    color: colors.offWhite,
    fontSize: 28,
    marginRight: 14,
  },
  pointsBlock: {
    flex: 1,
  },
  points: {
    color: colors.offWhite,
    fontFamily: fonts.display,
    fontSize: 25,
    marginBottom: 9,
  },
  progressTrack: {
    height: 7,
    backgroundColor: 'rgba(230,219,198,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(209,227,210,0.5)',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.mintCondition,
    borderRadius: 10,
  },
  progressText: {
    color: 'rgba(230,219,198,0.78)',
    fontFamily: fonts.body,
    fontSize: 10,
    marginTop: 6,
  },
  cardChevron: {
    color: colors.offWhite,
    fontSize: 30,
    marginLeft: 12,
  },
  featureCard: {
    minHeight: 315,
    marginHorizontal: 20,
    marginTop: 18,
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#D4C3BE',
    backgroundColor: colors.naturalChoice,
    ...shadow.card,
  },
  featureCopy: {
    width: '55%',
    padding: 21,
    zIndex: 5,
  },
  featureEyebrow: {
    color: colors.courtyard,
    fontFamily: fonts.narrow,
    fontSize: 8,
    letterSpacing: 2,
    fontWeight: '800',
    marginBottom: 8,
  },
  featureTitle: {
    color: colors.bark,
    fontFamily: fonts.display,
    fontSize: 34,
    lineHeight: 33,
    letterSpacing: -1,
  },
  featureBody: {
    color: colors.muted,
    fontFamily: fonts.body,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 12,
  },
  startButton: {
    marginTop: 18,
    width: 150,
    height: 45,
    borderRadius: radius.pill,
    backgroundColor: colors.courtyard,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  startButtonPressed: {
    backgroundColor: colors.pineDark,
    transform: [{ scale: 0.98 }],
  },
  startButtonText: {
    color: colors.offWhite,
    fontFamily: fonts.body,
    fontSize: 13,
    fontWeight: '700',
  },
  startArrow: {
    color: colors.mintCondition,
    fontSize: 20,
  },
  drinkWrap: {
    position: 'absolute',
    right: 4,
    bottom: 18,
  },
  passWrap: {
    position: 'absolute',
    right: -27,
    bottom: -52,
    transform: [{ rotate: '5deg' }, { scale: 0.58 }],
    zIndex: 9,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionStar: {
    color: colors.brownedSugar,
    fontSize: 20,
  },
  sectionTitle: {
    color: colors.bark,
    fontFamily: fonts.body,
    fontSize: 24,
    fontWeight: '500',
  },
  explore: {
    color: colors.courtyard,
    fontFamily: fonts.narrow,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  departuresRow: {
    paddingHorizontal: 20,
    gap: 10,
  },
  destinationCard: {
    width: 138,
    borderRadius: 13,
    backgroundColor: colors.white,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#DED8CF',
    ...shadow.card,
  },
  destinationPressed: {
    opacity: 0.90,
    transform: [{ translateY: 1 }],
  },
  destinationTop: {
    height: 90,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  destinationTopLabel: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontFamily: fonts.narrow,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  miniDrink: {
    marginTop: 24,
  },
  destinationGlyph: {
    fontSize: 34,
    marginTop: 14,
  },
  ticketBottom: {
    minHeight: 100,
    padding: 11,
  },
  miniBarcode: {
    height: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1.5,
    marginBottom: 5,
  },
  miniBar: {
    width: 1.5,
    backgroundColor: '#161616',
  },
  destinationCode: {
    color: colors.bark,
    fontFamily: fonts.narrow,
    fontSize: 8,
    letterSpacing: 1.2,
  },
  destinationName: {
    color: '#111111',
    fontFamily: fonts.body,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 2,
  },
  destinationLabel: {
    color: colors.muted,
    fontFamily: fonts.narrow,
    fontSize: 8,
    letterSpacing: 1,
    marginTop: 4,
    textTransform: 'uppercase',
  },
  destinationArrow: {
    position: 'absolute',
    right: 10,
    bottom: 11,
    color: colors.courtyard,
    fontSize: 19,
  },
  orderAgain: {
    marginHorizontal: 20,
    minHeight: 82,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.paper,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 9,
  },
  orderThumb: {
    width: 64,
    height: 64,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.naturalChoice,
  },
  orderCopy: {
    marginLeft: 12,
    flex: 1,
  },
  orderRoute: {
    color: colors.brownedSugar,
    fontFamily: fonts.narrow,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  orderTitle: {
    color: colors.bark,
    fontFamily: fonts.body,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  orderMeta: {
    color: colors.muted,
    fontFamily: fonts.body,
    fontSize: 10,
    marginTop: 4,
  },
  orderChevron: {
    color: colors.courtyard,
    fontSize: 25,
    paddingHorizontal: 8,
  },
  previewNote: {
    paddingHorizontal: 36,
    textAlign: 'center',
    marginTop: 24,
    color: '#8E817A',
    fontFamily: fonts.body,
    fontSize: 9,
    lineHeight: 14,
  },
});
