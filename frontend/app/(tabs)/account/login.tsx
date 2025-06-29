import UserService from '@/services/UserService';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { scale, verticalScale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin() {
    const user = await UserService.getUserByLogin(email);
    AsyncStorage.setItem('userId', String(user.data.message.id));
    Alert.alert(`Bem vindo usuário de ID ${await AsyncStorage.getItem('userId')}!`);
  }

  return (
    <View style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Bem-vindo de volta</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#ccc" />
        <TextInput
          placeholder="E-mail"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#ccc" />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#ccc"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
          <Ionicons
            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color="#ccc"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Entrar</Text>
      </TouchableOpacity>

    <Text
      style={styles.registerLink}
      onPress={() => router.push('/account/criarconta')}
    >
      Ainda não tem uma conta? <Text style={styles.registerBold}>Cadastre-se!</Text>
    </Text>

      <Text style={styles.altText}>Ou continue com</Text>

      <View style={styles.socialButtons}>
        <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
          <Text style={[styles.socialText, styles.googleText]}>GOOGLE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
          <Text style={[styles.socialText, styles.facebookText]}>FACEBOOK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: scale(20),
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: verticalScale(50),
    left: scale(20),
    zIndex: 10,
  },
  title: {
    color: '#fff',
    fontSize: RFValue(24),
    fontWeight: '700',
    marginBottom: verticalScale(20),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(10),
    marginBottom: verticalScale(12),
  },
  input: {
    flex: 1,
    color: '#fff',
    marginLeft: scale(10),
  },
  loginButton: {
    backgroundColor: '#222',
    paddingVertical: verticalScale(12),
    borderRadius: 8,
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  loginText: {
    color: '#fff',
    fontSize: RFValue(16),
    fontWeight: '600',
  },
  registerLink: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: verticalScale(20),
    fontSize: RFValue(13),
  },
  registerBold: {
    color: '#fff',
    fontWeight: '700',
  },
  altText: {
    textAlign: 'center',
    color: '#aaa',
    marginVertical: verticalScale(20),
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: scale(10),
  },
  socialButton: {
    flex: 1,
    paddingVertical: verticalScale(10),
    borderRadius: 8,
    alignItems: 'center',
  },
  googleButton: {
    backgroundColor: 'rgba(212, 70, 56, 0.25)',
  },
  facebookButton: {
    backgroundColor: 'rgba(66, 103, 178, 0.25)',
  },
  googleText: {
    color: '#D44638',
    fontWeight: '600',
    fontSize: RFValue(13),
  },
  facebookText: {
    color: '#4267B2',
    fontWeight: '600',
    fontSize: RFValue(13),
  },
  socialText: {
    fontWeight: '600',
  },
});
