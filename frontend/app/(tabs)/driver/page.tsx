import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale } from 'react-native-size-matters';

import { getCurrentLocationAndAddress } from '@/services/location.service';
import api from '@/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DriverScreen() {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rippleAnim = useRef(new Animated.Value(0)).current;

  const [isLoading, setIsLoading] = useState(false);
  const [statusText, setStatusText] = useState('Toque para Simular');

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.1, duration: 1000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    );
    const rippleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(rippleAnim, { toValue: 1, duration: 1800, useNativeDriver: true }),
        Animated.timing(rippleAnim, { toValue: 0, duration: 0, useNativeDriver: true }),
      ]),
    );
    pulseAnimation.start();
    rippleAnimation.start();
    return () => {
      pulseAnimation.stop();
      rippleAnimation.stop();
    };
  }, [pulseAnim, rippleAnim]);

  const processCheckIn = async (userId: number) => {
    setIsLoading(true);
    setStatusText('Simulação iniciada! Localizando...');
    const locationData = await getCurrentLocationAndAddress();

    if (!locationData) {
      setIsLoading(false);
      setStatusText('Falha na localização. Toque para tentar novamente.');
      return;
    }

    setStatusText('Enviando registro para o backend...');
    const checkInData = { userId, ...locationData };

    try {
      await api.post('/check-in', checkInData);
      Alert.alert('Sucesso!', `Check-in simulado para o usuário ${userId} foi registrado no banco de dados.`);
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('Erro de Rede', 'Não foi possível registrar o check-in. Verifique se o seu backend está rodando.');
    } finally {
      setIsLoading(false);
      setStatusText('Toque para Simular');
    }
  };

  const handleSimulatedNfcScan = async () => {
    if (isLoading) return;

    const fakeUserId = Number(await AsyncStorage.getItem('userId')) || 0; 
    
    if(fakeUserId != 0) {
      processCheckIn(Number(fakeUserId));
    }
  };

  // --- Funções de animação e renderização ---
  const rippleScale = rippleAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 2.5] });
  const rippleOpacity = rippleAnim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0] });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.middleContent}>
          <Text style={styles.title}>{statusText}</Text>
          <TouchableWithoutFeedback onPress={handleSimulatedNfcScan} disabled={isLoading}>
            <View style={styles.logoWrapper}>
              <Animated.View style={[styles.ripple, { opacity: rippleOpacity, transform: [{ scale: rippleScale }] }]} />
              {isLoading ? (
                <ActivityIndicator size="large" color="#fff" style={styles.logo} />
              ) : (
                <Animated.Image
                  source={require('@/assets/images/logo.png')}
                  style={[styles.logo, { transform: [{ scale: pulseAnim }] }]}
                />
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.footer}>
          <Text style={styles.brand}>CanarinhoGo</Text>
          <Text style={styles.version}>Versão 1.1 (Modo Simulação)</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Estilos (sem alterações)
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000' },
  container: { flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingVertical: verticalScale(40) },
  middleContent: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: verticalScale(30) },
  title: { fontSize: RFValue(28), color: '#fff', fontWeight: '600', textAlign: 'center' },
  logoWrapper: { justifyContent: 'center', alignItems: 'center' },
  ripple: { position: 'absolute', width: scale(130), height: scale(130), borderRadius: scale(130 / 2), backgroundColor: 'white' },
  logo: { width: scale(120), height: scale(120), resizeMode: 'contain' },
  footer: { alignItems: 'center', marginBottom: verticalScale(20) },
  brand: { fontSize: RFValue(18), color: '#fff', fontWeight: '600' },
  version: { fontSize: RFValue(12), color: '#888', marginTop: 4 },
});
