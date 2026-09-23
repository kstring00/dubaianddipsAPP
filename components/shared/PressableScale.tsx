import { ReactNode, useRef } from 'react';
import {
  AccessibilityProps,
  Animated,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { haptics } from '@/lib/haptics';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type PressableScaleProps = AccessibilityProps & {
  onPress?: () => void;
  disabled?: boolean;
  /** Scale when pressed. Keep subtle: 0.97–0.99. */
  pressedScale?: number;
  haptic?: keyof typeof haptics | null;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
};

/**
 * The app's standard tactile press treatment: a quick, springy scale-down
 * with an optional haptic on press-in. Layout styles apply directly to the
 * pressable node, so percentage widths and flex behave as expected.
 */
export function PressableScale({
  onPress,
  disabled,
  pressedScale = 0.975,
  haptic = 'tap',
  style,
  children,
  ...a11y
}: PressableScaleProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (value: number) => {
    Animated.spring(scale, {
      toValue: value,
      useNativeDriver: true,
      speed: 40,
      bounciness: 4,
    }).start();
  };

  return (
    <AnimatedPressable
      accessibilityRole="button"
      {...a11y}
      disabled={disabled}
      onPressIn={() => {
        if (haptic) haptics[haptic]();
        animateTo(pressedScale);
      }}
      onPressOut={() => animateTo(1)}
      onPress={onPress}
      style={[style, { transform: [{ scale }] }]}
    >
      {children}
    </AnimatedPressable>
  );
}
