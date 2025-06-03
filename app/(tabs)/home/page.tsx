import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { scale, verticalScale } from 'react-native-size-matters';

export default function HomeScreen() {
  const userName = 'Canarinho Junior';
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>Bem vindo {userName}!</Text>
      <Text style={styles.brand}>CanarinhoGo</Text>

      <Text style={styles.subtitle}>
        {"\n"}Clique no botão abaixo para utilizar o ônibus.
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/driver/page')}>
        <Text style={styles.buttonText}>Passar Cartão</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(20),
  },
  iconContainer: {
    marginBottom: verticalScale(20),
    borderRadius: 100,
  },
  logo: {
    width: scale(140),
    height: scale(140),
    resizeMode: 'contain',
  },
  title: {
    fontSize: RFValue(20),
    color: '#fff',
    fontWeight: '400',
  },
  brand: {
    fontSize: RFValue(30),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: verticalScale(16),
  },
  subtitle: {
    textAlign: 'center',
    fontSize: RFValue(13),
    color: '#aaa',
    marginBottom: verticalScale(100),
  },
  button: {
    backgroundColor: '#232627',
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(60),
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: RFValue(15),
  },
});