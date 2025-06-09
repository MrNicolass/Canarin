import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/base/text/BaseText';
import { BaseView } from '@/components/base/view/BaseView';
import { useRouter } from 'expo-router';

export default function NotFoundScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <BaseView style={styles.container}>
      <ThemedText type="title">{t('notFound')}</ThemedText>
      <TouchableOpacity style={styles.link} onPress={() => router.push('/(tabs)/home/page')}>
        <ThemedText type="link">Go to home screen!</ThemedText>
      </TouchableOpacity>
    </BaseView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
