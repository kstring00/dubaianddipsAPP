import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/components/shared/AppText';
import { DrinkArtwork } from '@/components/brand/DrinkArtwork';
import { PressableScale } from '@/components/shared/PressableScale';
import { featuredItem } from '@/constants/menu';
import { colors, gutter, radius, space } from '@/constants/theme';
import { previewMode } from '@/lib/toast';

type OrderAgainProps = {
  onPress: () => void;
};

/**
 * Reorder module. Real history lives in Toast; preview builds show a labelled
 * sample row, production shows a quiet pre-launch state instead of fake data.
 */
export function OrderAgain({ onPress }: OrderAgainProps) {
  if (!previewMode) {
    return (
      <View style={[styles.row, styles.rowEmpty]}>
        <Ionicons name="time-outline" size={18} color={colors.inkFaint} />
        <AppText variant="caption" color={colors.inkSoft} style={styles.emptyText}>
          Your recent orders will appear here once ordering is live.
        </AppText>
      </View>
    );
  }

  const item = featuredItem;

  return (
    <PressableScale
      onPress={onPress}
      haptic="tap"
      accessibilityLabel={`Order ${item.name} again`}
      style={styles.rowShadow}
    >
      <View style={styles.row}>
        <View style={styles.thumb}>
          <DrinkArtwork small />
        </View>
        <View style={styles.copy}>
          <AppText variant="ticketLabel" color={colors.sugar}>
            {item.code} · {item.gate} · SAMPLE
          </AppText>
          <AppText variant="heading" color={colors.ink} numberOfLines={1}>
            {item.name}
          </AppText>
          <AppText variant="footnote" color={colors.inkFaint}>
            Grande · extra pistachio
          </AppText>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.green} />
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  rowShadow: {
    marginHorizontal: gutter,
  },
  row: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space.md,
    paddingVertical: space.md,
    gap: space.md,
  },
  rowEmpty: {
    marginHorizontal: gutter,
    paddingVertical: space.xl,
    justifyContent: 'center',
  },
  emptyText: {
    flexShrink: 1,
  },
  thumb: {
    width: 58,
    height: 58,
    borderRadius: radius.sm,
    backgroundColor: colors.blush,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
    gap: 2,
  },
});
