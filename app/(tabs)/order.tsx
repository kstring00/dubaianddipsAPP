import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/shared/AppText';
import { BrandMark } from '@/components/brand/BrandMark';
import { BrandPattern } from '@/components/brand/BrandPattern';
import { DepartureBoardPanel } from '@/components/menu/DepartureBoardPanel';
import { MenuTicket } from '@/components/menu/MenuTicket';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { Departure, MenuItem, menuItems } from '@/constants/menu';
import { colors, gutter, space } from '@/constants/theme';
import { hasToastLink, openToast, toastLinks } from '@/lib/toast';

export default function OrderScreen() {
  const toastLive = hasToastLink(toastLinks.order);

  const orderVia = async (url?: string) => {
    await openToast(url);
  };

  const openDeparture = (departure: Departure) => {
    orderVia(toastLinks[departure.toastKey]);
  };

  const openItem = (item: MenuItem) => {
    orderVia(toastLinks[item.toastKey]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <BrandPattern color={colors.bark} opacity={0.04} cell={72} height={240} />
          <View style={styles.headerTop}>
            <BrandMark variant="mark" size={30} />
            <AppText variant="micro" color={colors.green}>
              The menu
            </AppText>
          </View>
          <AppText variant="hero" color={colors.ink} style={styles.title}>
            Everything on{'\n'}the boards.
          </AppText>
          <AppText variant="caption" color={colors.inkSoft} style={styles.subtitle}>
            Choose a destination. When ordering goes live, every board hands
            off to Toast for modifiers, checkout and pickup.
          </AppText>

          <View style={styles.statusChip}>
            <View style={[styles.statusDot, toastLive && styles.statusDotLive]} />
            <AppText variant="ticketLabel" color={colors.inkSoft}>
              {toastLive ? 'TOAST ORDERING · LIVE' : 'ONLINE ORDERING · COMING SOON'}
            </AppText>
          </View>
        </View>

        <DepartureBoardPanel onSelect={openDeparture} />

        <View style={styles.grid}>
          {menuItems.map((item) => (
            <MenuTicket key={item.slug} item={item} onPress={() => openItem(item)} />
          ))}
        </View>

        <PrimaryButton
          label={toastLive ? 'Open Toast ordering' : 'Ordering coming soon'}
          muted={!toastLive}
          onPress={() => orderVia(toastLinks.order)}
          accessibilityHint="Opens Toast online ordering"
          style={styles.cta}
        />

        <AppText
          variant="footnote"
          color={colors.inkFaint}
          align="center"
          style={styles.foot}
        >
          Menu preview only until Dubai &amp; Dips activates its live Toast
          ordering channel.
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
    paddingTop: space.lg,
    paddingBottom: space.xxl,
    overflow: 'hidden',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    marginTop: space.xxl,
  },
  subtitle: {
    marginTop: space.md,
    maxWidth: 320,
  },
  statusChip: {
    alignSelf: 'flex-start',
    marginTop: space.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingHorizontal: space.md,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.sugar,
  },
  statusDotLive: {
    backgroundColor: colors.green,
  },
  grid: {
    paddingHorizontal: gutter,
    marginTop: space.xl,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: space.lg,
  },
  cta: {
    marginHorizontal: gutter,
    marginTop: space.xxl,
  },
  foot: {
    marginTop: space.lg,
    paddingHorizontal: gutter * 2,
  },
});
