import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';

export default function VerifyCodeScreen() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [seconds, setSeconds] = useState(30); // 5 minutos
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const numeTel = '+55 (47) 912345678';

  // Inicia contagem regressiva
  useEffect(() => {
    setSeconds(30); // Reinicia o tempo toda vez que a tela monta
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Quando chega em 0 dispara alerta
  useEffect(() => {
    if (seconds <= 0 && intervalRef.current) {
      clearInterval(intervalRef.current);
      Alert.alert('Código expirado!', 'Peça um novo código.', [
        {
          text: 'OK',
          onPress: () => router.replace('/passrecovery/telefone'),
        },
      ]);
    }
  }, [seconds]);

  // Formata mm:ss
  const min = String(Math.floor(seconds / 60)).padStart(2, '0');
  const sec = String(seconds % 60).padStart(2, '0');

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.replace('/')}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Verifique seu Telefone</Text>
      <Text style={styles.subtitle}>Nós enviamos um código para seu telefone</Text>
      <Text style={styles.phone}>{numeTel}</Text>

      <View style={styles.codeContainer}>
        {Array.from({ length: 4 }).map((_, i) => (
          <TextInput
            key={i}
            style={styles.codeInput}
            maxLength={1}
            keyboardType="number-pad"
            onChangeText={(t) => setCode((prev) => prev.slice(0, i) + t)}
          />
        ))}
      </View>

      <Text style={styles.timer}>({min}:{sec})</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/passrecovery/reset')}
      >
        <Text style={styles.buttonText}>Validar Código</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
        <Text style={styles.buttonText}>Reenviar Código</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  subtitle: { color: '#ccc', textAlign: 'center', marginTop: 8 },
  phone: { color: '#fff', marginTop: 4, marginBottom: 20 },
  codeContainer: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  codeInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
  },
  timer: { color: '#888', marginBottom: 20 },
  button: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  secondaryButton: { backgroundColor: '#111' },
  buttonText: { color: '#fff' },
  backBtn: { position: 'absolute', top: 50, left: 20 },
});
