import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/base/text/BaseText';
import { BaseView } from '@/components/base/view/BaseView';

export default function NotFoundScreen() {
  const { t } = useTranslation();

  return (
    <BaseView style={styles.container}>
      <ThemedText type="title">{t('notFound')}</ThemedText>
      <Link href="/" style={styles.link}>
        <ThemedText type="link">Go to home screen!</ThemedText>
      </Link>
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
