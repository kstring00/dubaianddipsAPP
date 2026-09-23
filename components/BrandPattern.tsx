import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/theme';

export function BrandPattern({
  color = colors.bark,
  opacity = 0.055,
  dense = false,
}: {
  color?: string;
  opacity?: number;
  dense?: boolean;
}) {
  const count = dense ? 30 : 18;

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <View style={styles.grid}>
        {Array.from({ length: count }).map((_, index) => (
          <Text
            key={index}
            style={[
              styles.star,
              {
                color,
                opacity,
                marginHorizontal: dense ? 14 : 22,
                marginVertical: dense ? 12 : 18,
              },
            ]}
          >
            ✦
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-around',
    justifyContent: 'space-around',
    transform: [{ scale: 1.15 }],
  },
  star: {
    fontSize: 32,
    lineHeight: 34,
  },
});
