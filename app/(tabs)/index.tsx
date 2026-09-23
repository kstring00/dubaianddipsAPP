import { ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/shared/AppText';
import { BoardingClubCard } from '@/components/home/BoardingClubCard';
import { DeparturesBoard } from '@/components/home/DeparturesBoard';
import { FeaturedDestination } from '@/components/home/FeaturedDestination';
import { HomeHero } from '@/components/home/HomeHero';
import { OrderAgain } from '@/components/home/OrderAgain';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Departure, featuredItem } from '@/constants/menu';
import { colors, gutter, space } from '@/constants/theme';
import { hasToastLink, openToast, previewMode, toastLinks } from '@/lib/toast';

export default function HomeScreen() {
  const router = useRouter();

  const startOrder = async (url?: string) => {
    if (hasToastLink(url) || hasToastLink(toastLinks.order)) {
      await openToast(url);
      return;
    }
    router.push('/order');
  };

  const openDeparture = (departure: Departure) => {
    const url = toastLinks[departure.toastKey];
    if (hasToastLink(url)) {
      openToast(url);
      return;
    }
    router.push('/order');
  };

  const openRewards = () => {
    if (!previewMode && hasToastLink(toastLinks.rewards)) {
      openToast(toastLinks.rewards);
      return;
    }
    router.push('/rewards');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <HomeHero />

        <BoardingClubCard onPress={openRewards} />

        <View style={styles.featureBlock}>
          <FeaturedDestination
            onOrder={() => startOrder(toastLinks[featuredItem.toastKey])}
          />
        </View>

        <View style={styles.section}>
          <SectionHeader
            title="Departures"
            actionLabel="Full menu"
            onAction={() => router.push('/order')}
          />
          <View style={styles.sectionBody}>
            <DeparturesBoard onSelect={openDeparture} />
          </View>
        </View>

        <View style={styles.section}>
          <SectionHeader title="Order again" />
          <View style={styles.sectionBody}>
            <OrderAgain
              onPress={() => startOrder(toastLinks[featuredItem.toastKey])}
            />
          </View>
        </View>

        <AppText
          variant="footnote"
          color={colors.inkFaint}
          align="center"
          style={styles.note}
        >
          {previewMode
            ? 'Preview build — ordering and rewards connect to Toast at launch.'
            : 'Ordering and rewards powered by Toast.'}
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
    paddingBottom: space.x3l,
  },
  featureBlock: {
    marginTop: space.xl,
  },
  section: {
    marginTop: space.x3l,
  },
  sectionBody: {
    marginTop: space.lg,
  },
  note: {
    marginTop: space.x3l,
    paddingHorizontal: gutter * 2,
  },
});
