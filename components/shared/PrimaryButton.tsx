import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/components/shared/AppText';
import { colors, radius, space } from '@/constants/theme';
import { PressableScale } from '@/components/shared/PressableScale';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  /** Muted style for not-yet-live states (still tappable, explains itself). */
  muted?: boolean;
  compact?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityHint?: string;
};

export function PrimaryButton({
  label,
  onPress,
  muted = false,
  compact = false,
  style,
  accessibilityHint,
}: PrimaryButtonProps) {
  return (
    <PressableScale
      onPress={onPress}
      haptic="primary"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      style={style}
    >
      <View
        style={[
          styles.button,
          compact && styles.buttonCompact,
          muted && styles.buttonMuted,
        ]}
      >
        <AppText
          variant={compact ? 'caption' : 'heading'}
          color={colors.onGreen}
          style={styles.label}
          numberOfLines={1}
        >
          {label}
        </AppText>
        <Ionicons
          name="arrow-forward"
          size={compact ? 14 : 17}
          color={colors.mint}
        />
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 54,
    borderRadius: radius.pill,
    backgroundColor: colors.green,
    paddingHorizontal: space.xxl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.md,
  },
  buttonCompact: {
    height: 44,
    paddingHorizontal: space.xl,
    alignSelf: 'flex-start',
  },
  buttonMuted: {
    backgroundColor: '#66755F',
  },
  label: {
    fontWeight: '600',
  },
});
