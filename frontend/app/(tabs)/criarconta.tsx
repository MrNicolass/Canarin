import CreateUserDTO from '@/models/interfaces/CreateUserDTO';
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

export default function RegisterScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cpf, setCpf] = useState('');
  const [cellPhone, setCellPhone] = useState('');

  const handleRegister = async () => {
    if(!email || !password || !name || !lastName || !cpf || !cellPhone) {
      Alert.alert('Há campos vazios!');
    }

    const userDTO: CreateUserDTO = {
      login: email,
      password: password,
      person: {
        name: name,
        lastName: lastName,
        cpf: cpf,
        phones: {
          cellPhone: cellPhone
        }
      }
    }
    
    const user = await UserService.createUser(userDTO);
    Alert.alert(user.data.message)
  }

  return (
    <View style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Crie sua conta</Text>

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

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#ccc" />
        <TextInput
          placeholder="Nome"
          placeholderTextColor="#ccc"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#ccc" />
        <TextInput
          placeholder="Sobrenome"
          placeholderTextColor="#ccc"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#ccc" />
        <TextInput
          placeholder="CPF"
          placeholderTextColor="#ccc"
          value={cpf}
          onChangeText={setCpf}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#ccc" />
        <TextInput
          placeholder="Celular"
          placeholderTextColor="#ccc"
          value={cellPhone}
          onChangeText={setCellPhone}
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerText}>Registrar</Text>
      </TouchableOpacity>

      <Text
        style={styles.loginLink}
        onPress={() => router.push('/account/login')}
      >
        Já possui uma conta? <Text style={styles.loginBold}>Entrar</Text>
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
  registerButton: {
    backgroundColor: '#222',
    paddingVertical: verticalScale(12),
    borderRadius: 8,
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  registerText: {
    color: '#fff',
    fontSize: RFValue(16),
    fontWeight: '600',
  },
  loginLink: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: verticalScale(20),
    fontSize: RFValue(13),
  },
  loginBold: {
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