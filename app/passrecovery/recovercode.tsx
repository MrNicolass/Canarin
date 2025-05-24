import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function VerifyCodeScreen() {
  const router = useRouter();
  const [code, setCode] = useState('');

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.replace('/')}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Verify Phone Number</Text>
      <Text style={styles.subtitle}>We Have Sent Code To Your Phone Number</Text>
      <Text style={styles.phone}>+00 0000000000</Text>

      <View style={styles.codeContainer}>
        {Array.from({ length: 4 }).map((_, i) => (
          <TextInput key={i} style={styles.codeInput} maxLength={1} keyboardType="number-pad" />
        ))}
      </View>

      <Text style={styles.timer}>(04:30)</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/passrecovery/reset')}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
        <Text style={styles.buttonText}>Send Again</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  subtitle: { color: '#ccc', textAlign: 'center', marginTop: 8 },
  phone: { color: '#fff', marginTop: 4, marginBottom: 20 },
  codeContainer: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  codeInput: { width: 50, height: 50, borderWidth: 1, borderColor: '#fff', borderRadius: 10, textAlign: 'center', fontSize: 20, color: '#fff' },
  timer: { color: '#888', marginBottom: 20 },
  button: { backgroundColor: '#222', padding: 15, borderRadius: 10, alignItems: 'center', width: '100%', marginBottom: 10 },
  secondaryButton: { backgroundColor: '#111' },
  buttonText: { color: '#fff' },
  backBtn: { position: 'absolute', top: 50, left: 20 },
});
