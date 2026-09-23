import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/components/shared/AppText';
import { StarFour } from '@/components/brand/StarFour';
import { colors, gutter, space } from '@/constants/theme';
import { haptics } from '@/lib/haptics';

type SectionHeaderProps = {
  title: string;
  eyebrow?: string;
  actionLabel?: string;
  onAction?: () => void;
};

/** Editorial section heading: small star, serif title, quiet action link. */
export function SectionHeader({
  title,
  eyebrow,
  actionLabel,
  onAction,
}: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <View style={styles.titleBlock}>
        {eyebrow ? (
          <AppText variant="micro" color={colors.sugar} style={styles.eyebrow}>
            {eyebrow}
          </AppText>
        ) : null}
        <View style={styles.titleRow}>
          <StarFour size={11} color={colors.sugar} />
          <AppText variant="title" color={colors.ink}>
            {title}
          </AppText>
        </View>
      </View>

      {actionLabel && onAction ? (
        <Pressable
          onPress={() => {
            haptics.select();
            onAction();
          }}
          hitSlop={10}
          accessibilityRole="link"
          accessibilityLabel={actionLabel}
          style={styles.action}
        >
          <AppText variant="micro" color={colors.green}>
            {actionLabel}
          </AppText>
          <Ionicons name="arrow-forward" size={12} color={colors.green} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: gutter,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: space.lg,
  },
  titleBlock: {
    flexShrink: 1,
  },
  eyebrow: {
    marginBottom: space.xs,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingBottom: 5,
  },
});
