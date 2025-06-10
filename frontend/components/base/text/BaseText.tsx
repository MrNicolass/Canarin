import { Text } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { BaseTextProps } from '@/models/types/BaseTextProps';
import styles from './BaseText.styles';

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: BaseTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'white');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}