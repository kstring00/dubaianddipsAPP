import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/components/shared/AppText';
import { BoardingPass } from '@/components/brand/BoardingPass';
import { PressableScale } from '@/components/shared/PressableScale';
import { MenuItem } from '@/constants/menu';
import { colors, radius, shadow, space } from '@/constants/theme';

type MenuTicketProps = {
  item: MenuItem;
  onPress: () => void;
};

/** Product card pairing the official boarding-pass tag with menu details. */
export function MenuTicket({ item, onPress }: MenuTicketProps) {
  return (
    <PressableScale
      onPress={onPress}
      haptic="tap"
      accessibilityLabel={`${item.name}, ${item.price}`}
      accessibilityHint="Opens ordering for this item"
      style={styles.shadow}
    >
      <View style={styles.card}>
        <View style={styles.passWrap}>
          <BoardingPass
            size="sm"
            code={item.code}
            destination={item.destination}
            flight={item.flight}
            gate={item.gate}
            seat={item.seat}
            accent={item.accent}
          />
        </View>

        <View style={styles.copy}>
          <AppText variant="ticketLabel" color={colors.sugar}>
            {item.category.toUpperCase()}
          </AppText>
          <AppText variant="heading" color={colors.ink} style={styles.name}>
            {item.name}
          </AppText>
          <AppText variant="footnote" color={colors.inkSoft} numberOfLines={2}>
            {item.subtitle}
          </AppText>
          <View style={styles.bottomRow}>
            <AppText variant="micro" color={colors.green}>
              {item.price}
            </AppText>
            <Ionicons name="arrow-forward" size={14} color={colors.green} />
          </View>
        </View>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  shadow: {
    width: '48%',
    ...shadow.card,
  },
  card: {
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    padding: space.sm + 2,
    alignItems: 'center',
  },
  passWrap: {
    transform: [{ scale: 0.98 }],
  },
  copy: {
    width: '100%',
    paddingHorizontal: space.xs,
    paddingTop: space.md,
    paddingBottom: space.xs,
    gap: space.xs,
  },
  name: {
    fontSize: 15,
    lineHeight: 19,
  },
  bottomRow: {
    marginTop: space.xs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
