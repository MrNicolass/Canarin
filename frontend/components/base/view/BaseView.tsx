import { SafeAreaView } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { BaseViewProps } from '@/models/types/BaseViewProps';

export function BaseView({ style, lightColor, darkColor, ...otherProps }: BaseViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'primary');

  return (
    <SafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />
  );
}