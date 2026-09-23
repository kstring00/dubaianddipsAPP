import { useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/shared/AppText';
import { BrandMark } from '@/components/brand/BrandMark';
import { BrandPattern } from '@/components/brand/BrandPattern';
import { StarFour } from '@/components/brand/StarFour';
import { colors, gutter, motion, space } from '@/constants/theme';
import { previewMode } from '@/lib/toast';

/**
 * Editorial brand header: wordmark, time-aware greeting and a quiet
 * Editor's-Note accent over the tone-on-tone star lattice.
 */
export function HomeHero() {
  const reveal = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(reveal, {
      toValue: 1,
      duration: motion.slow,
      useNativeDriver: true,
    }).start();
  }, [reveal]);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  // Sample name only in preview builds; production greets neutrally
  // until Toast accounts provide a real profile.
  const name = previewMode ? ', Kyle' : '';

  return (
    <View style={styles.hero}>
      <BrandPattern color={colors.bark} opacity={0.045} cell={72} height={300} />

      <View style={styles.topbar}>
        <BrandMark variant="primary" size={21} />
        <StarFour size={14} color={colors.sugar} />
      </View>

      <Animated.View
        style={{
          opacity: reveal,
          transform: [
            {
              translateY: reveal.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 0],
              }),
            },
          ],
        }}
      >
        <AppText variant="hero" color={colors.ink} style={styles.greeting}>
          {greeting}
          {name}
        </AppText>
        <AppText variant="eyebrow" color={colors.green} style={styles.tagline}>
          Sweet destinations ahead
        </AppText>
      </Animated.View>

      <AppText variant="editorial" color={colors.sugar} style={styles.accent}>
        more than desserts
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingHorizontal: gutter,
    paddingTop: space.md,
    paddingBottom: space.x3l,
    overflow: 'hidden',
  },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: space.x4l,
  },
  greeting: {
    maxWidth: 300,
  },
  tagline: {
    marginTop: space.md,
  },
  accent: {
    position: 'absolute',
    right: gutter,
    bottom: space.sm,
    transform: [{ rotate: '-6deg' }],
  },
});
