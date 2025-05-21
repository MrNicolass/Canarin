import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PerfilScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.pinimg.com/736x/b6/a6/d5/b6a6d50de7eb36065b98ebd254d46cd5.jpg' }}
        style={styles.profileImage}
      />
      <Text style={styles.name}>Canarinho Junior</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/preferencias')}>
        <Text style={styles.buttonText}>Preferencias</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/editarconta')}>
        <Text style={styles.buttonText}>Editar Conta</Text>
      </TouchableOpacity>

    <TouchableOpacity style={styles.button} onPress={() => router.replace('/')}>
        <Text style={styles.buttonText}>Logout</Text>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#1f1f1f',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 6,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
