import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function EnterPhoneScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Phone{'\n'}Number</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="call-outline" size={20} color="#fff" style={styles.icon} />
        <TextInput placeholder="+00 0000000000" placeholderTextColor="#aaa" style={styles.input} keyboardType="phone-pad" />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/passrecovery/recovercode')}>
        <Text style={styles.buttonText}>Verification</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
        <Text style={styles.buttonText}>Later</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20, justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginBottom: 30 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#fff', borderRadius: 10, padding: 10, marginBottom: 20 },
  input: { color: '#fff', flex: 1, marginLeft: 10 },
  icon: { marginLeft: 5 },
  button: { backgroundColor: '#222', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  secondaryButton: { backgroundColor: '#111' },
  buttonText: { color: '#fff' },
  backBtn: { position: 'absolute', top: 50, left: 20 },
});
