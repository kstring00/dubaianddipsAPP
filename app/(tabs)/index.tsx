import { useMemo } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandMark } from '@/components/BrandMark';
import { DrinkArtwork } from '@/components/DrinkArtwork';
import { departures } from '@/constants/menu';
import { colors, radius, shadow } from '@/constants/theme';
import { hasToastLink, openToast, previewMode, toastLinks } from '@/lib/toast';

const skyline = [28, 42, 30, 66, 34, 112, 48, 76, 39, 58, 32, 45];

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
          <LinearGradient
            colors={['#FFFDF8', '#F6EEDD', '#F5F0E6']}
            style={StyleSheet.absoluteFill}
          />

          <View style={styles.topbar}>
            <BrandMark />
            <View style={styles.heroRight}>
              <Text style={styles.microcopy}>SWEET{'
'}DESTINATIONS{'
'}AHEAD</Text>
              <Pressable
                style={styles.bell}
                onPress={() => Haptics.selectionAsync()}
                accessibilityLabel="Notifications"
              >
                <Text style={styles.bellIcon}>♢</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.city}>
            {skyline.map((height, index) => (
              <View
                key={index}
                style={[
                  styles.building,
                  { height, opacity: index === 5 ? 0.42 : 0.20 },
                  index === 5 && styles.burj,
                ]}
              />
            ))}
          </View>

          <View style={styles.greetingRow}>
            <View>
              <Text style={styles.greeting}>{greeting}, Kyle</Text>
              <Text style={styles.tagline}>DESSERTS BRING US FURTHER ✦</Text>
            </View>
            <Text style={styles.script}>More{'
'}than{'
'}desserts</Text>
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
          <LinearGradient
            colors={[colors.pineSoft, colors.pineDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.rewardsTop}>
            <Text style={styles.rewardsEyebrow}>BOARDING CLUB</Text>
            <Text style={styles.rewardsSmall}>A SWEETER{'
'}TOMORROW</Text>
          </View>

          <View style={styles.rewardsMain}>
            <Text style={styles.plane}>✈</Text>
            <View style={styles.pointsBlock}>
              <Text style={styles.points}>
                {previewMode ? '420 points' : 'Boarding Club'}
              </Text>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: previewMode ? '72%' : '28%' }]} />
              </View>
              <Text style={styles.progressText}>
                {previewMode ? '80 points until your next reward' : 'Rewards launching soon'}
              </Text>
            </View>
            <Text style={styles.cardChevron}>›</Text>
          </View>
        </Pressable>

        <View style={styles.featureCard}>
          <LinearGradient
            colors={['#E9D9BD', '#F4E7D1', '#DCC5A5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.featureCopy}>
            <Text style={styles.featureEyebrow}>FEATURED DESTINATION</Text>
            <Text style={styles.featureTitle}>Dubai{'
'}Chocolate{'
'}Frappe</Text>
            <Text style={styles.featureBody}>A taste of Dubai in{'
'}every sip.</Text>

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

          <View style={styles.featureStamp}>
            <Text style={styles.featureStampText}>SWEET{'
'}PLACES{'
'}BRING GOOD{'
'}PEOPLE</Text>
            <Text style={styles.featureStampStar}>✦</Text>
          </View>
        </View>

        <View style={styles.carouselDots}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionPlane}>✈</Text>
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
              <View style={[styles.destinationArt, { backgroundColor: item.accent }]}>
                {index === 0 ? (
                  <DrinkArtwork small />
                ) : (
                  <>
                    <View style={styles.artCircle} />
                    <View style={styles.artCup} />
                    <View style={styles.artFoam} />
                  </>
                )}
              </View>
              <View style={styles.destinationBottom}>
                <Text style={styles.destinationCode}>{item.code} ·</Text>
                <Text style={styles.destinationLabel}>{item.label}</Text>
                <Text style={styles.destinationArrow}>›</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionPlane}>↻</Text>
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
    backgroundColor: colors.cream,
  },
  content: {
    paddingBottom: 32,
  },
  hero: {
    minHeight: 285,
    overflow: 'hidden',
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 26,
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
    gap: 17,
  },
  microcopy: {
    color: colors.ink,
    fontSize: 8,
    lineHeight: 11,
    letterSpacing: 2.3,
    fontWeight: '700',
    textAlign: 'center',
  },
  bell: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(47,36,29,0.20)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.45)',
  },
  bellIcon: {
    color: colors.ink,
    fontSize: 21,
  },
  city: {
    position: 'absolute',
    right: 26,
    bottom: 14,
    height: 130,
    width: 250,
    flexDirection: 'row',
    gap: 4,
    alignItems: 'flex-end',
  },
  building: {
    width: 12,
    backgroundColor: colors.gold,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  burj: {
    width: 9,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  greetingRow: {
    marginTop: 54,
    zIndex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  greeting: {
    color: colors.ink,
    fontFamily: 'Georgia',
    fontSize: 31,
    lineHeight: 38,
    letterSpacing: -0.7,
  },
  tagline: {
    marginTop: 8,
    color: colors.ink,
    fontSize: 9,
    letterSpacing: 2.5,
    fontWeight: '700',
  },
  script: {
    color: colors.gold,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    fontSize: 16,
    lineHeight: 18,
    textAlign: 'center',
    transform: [{ rotate: '-8deg' }],
    marginRight: 8,
  },
  rewardsCard: {
    marginHorizontal: 20,
    marginTop: -12,
    minHeight: 148,
    borderRadius: radius.lg,
    padding: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(216,199,155,0.38)',
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
    color: colors.goldSoft,
    fontSize: 10,
    letterSpacing: 3.2,
    fontWeight: '800',
  },
  rewardsSmall: {
    color: colors.gold,
    fontSize: 8,
    lineHeight: 11,
    letterSpacing: 2,
    fontWeight: '800',
    textAlign: 'right',
  },
  rewardsMain: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  plane: {
    color: colors.cream,
    fontSize: 29,
    marginRight: 14,
  },
  pointsBlock: {
    flex: 1,
  },
  points: {
    color: colors.cream,
    fontFamily: 'Georgia',
    fontSize: 26,
    marginBottom: 9,
  },
  progressTrack: {
    height: 7,
    backgroundColor: 'rgba(245,240,230,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(216,199,155,0.58)',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.goldSoft,
    borderRadius: 10,
  },
  progressText: {
    color: 'rgba(245,240,230,0.78)',
    fontSize: 11,
    marginTop: 5,
  },
  cardChevron: {
    color: colors.cream,
    fontSize: 30,
    marginLeft: 12,
  },
  featureCard: {
    minHeight: 305,
    marginHorizontal: 20,
    marginTop: 18,
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#DAC9AE',
    ...shadow.card,
  },
  featureCopy: {
    width: '54%',
    padding: 21,
    zIndex: 5,
  },
  featureEyebrow: {
    color: colors.ink,
    fontSize: 8,
    letterSpacing: 2,
    fontWeight: '800',
    marginBottom: 8,
  },
  featureTitle: {
    color: colors.ink,
    fontFamily: 'Georgia',
    fontSize: 34,
    lineHeight: 33,
    letterSpacing: -0.9,
  },
  featureBody: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 17,
    marginTop: 12,
  },
  startButton: {
    marginTop: 18,
    width: 158,
    height: 45,
    borderRadius: radius.pill,
    backgroundColor: colors.pine,
    paddingHorizontal: 19,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  startButtonPressed: {
    backgroundColor: colors.pineSoft,
    transform: [{ scale: 0.98 }],
  },
  startButtonText: {
    color: colors.cream,
    fontSize: 14,
    fontWeight: '700',
  },
  startArrow: {
    color: colors.goldSoft,
    fontSize: 20,
  },
  drinkWrap: {
    position: 'absolute',
    right: 7,
    bottom: -4,
  },
  featureStamp: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    padding: 7,
    backgroundColor: 'rgba(53,43,34,0.78)',
    borderRadius: 4,
    zIndex: 7,
  },
  featureStampText: {
    color: colors.goldSoft,
    fontSize: 6,
    lineHeight: 8,
    letterSpacing: 1.4,
    fontWeight: '800',
  },
  featureStampStar: {
    color: colors.goldSoft,
    fontSize: 9,
    textAlign: 'center',
    marginTop: 2,
  },
  carouselDots: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 7,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#CBC4B8',
  },
  dotActive: {
    backgroundColor: colors.pine,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 22,
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
  sectionPlane: {
    color: colors.ink,
    fontSize: 22,
  },
  sectionTitle: {
    color: colors.ink,
    fontFamily: 'Georgia',
    fontSize: 25,
  },
  explore: {
    color: colors.muted,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1.8,
  },
  departuresRow: {
    paddingHorizontal: 20,
    gap: 10,
  },
  destinationCard: {
    width: 128,
    borderRadius: 14,
    backgroundColor: colors.paper,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.line,
  },
  destinationPressed: {
    opacity: 0.90,
    transform: [{ translateY: 1 }],
  },
  destinationArt: {
    height: 92,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  artCircle: {
    position: 'absolute',
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  artCup: {
    width: 38,
    height: 47,
    marginTop: 22,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    backgroundColor: '#EFE4CC',
    borderWidth: 1,
    borderColor: 'rgba(47,36,29,0.18)',
  },
  artFoam: {
    position: 'absolute',
    top: 22,
    width: 43,
    height: 16,
    borderRadius: 10,
    backgroundColor: '#FFF9ED',
  },
  destinationBottom: {
    minHeight: 69,
    padding: 11,
  },
  destinationCode: {
    color: colors.ink,
    fontFamily: 'Georgia',
    fontSize: 12,
  },
  destinationLabel: {
    color: colors.ink,
    fontFamily: 'Georgia',
    fontSize: 16,
    marginTop: 2,
  },
  destinationArrow: {
    position: 'absolute',
    right: 10,
    top: 27,
    color: colors.muted,
    fontSize: 19,
  },
  orderAgain: {
    marginHorizontal: 20,
    minHeight: 78,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.paper,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 9,
  },
  orderThumb: {
    width: 62,
    height: 60,
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5D5B9',
  },
  orderCopy: {
    marginLeft: 12,
    flex: 1,
  },
  orderTitle: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: '700',
  },
  orderMeta: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 5,
  },
  orderChevron: {
    color: colors.muted,
    fontSize: 25,
    paddingHorizontal: 8,
  },
  previewNote: {
    paddingHorizontal: 36,
    textAlign: 'center',
    marginTop: 24,
    color: '#958B80',
    fontSize: 9,
    lineHeight: 14,
  },
});
