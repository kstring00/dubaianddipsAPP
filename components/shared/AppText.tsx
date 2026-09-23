import { ReactNode } from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';

import { colors, type, TypeVariant } from '@/constants/theme';

type AppTextProps = TextProps & {
  variant?: TypeVariant;
  color?: string;
  align?: TextStyle['textAlign'];
  style?: StyleProp<TextStyle>;
  children?: ReactNode;
};

/**
 * Themed Text. All copy in the app should flow through this so typography
 * stays on the brand scale and licensed fonts can be swapped in centrally.
 */
export function AppText({
  variant = 'body',
  color = colors.ink,
  align,
  style,
  children,
  ...rest
}: AppTextProps) {
  return (
    <Text
      {...rest}
      style={[type[variant], { color }, align ? { textAlign: align } : null, style]}
    >
      {children}
    </Text>
  );
}
