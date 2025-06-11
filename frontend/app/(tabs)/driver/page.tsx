import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Vibration,
  View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale } from 'react-native-size-matters';

// --- NOSSAS NOVAS IMPORTAÇÕES ---
import NfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager';
import { getCurrentLocationAndAddress } from '@/services/location.service'; // Ajuste o caminho se necessário
import api from '@/services/api'; // Ajuste o caminho se necessário

export default function DriverScreen() {
  // --- Refs de animação existentes ---
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rippleAnim = useRef(new Animated.Value(0)).current;

  // --- NOVOS ESTADOS PARA CONTROLE DE FLUXO ---
  const [isLoading, setIsLoading] = useState(false);
  const [statusText, setStatusText] = useState('Toque para Iniciar');

  // --- Animações contínuas (sem alterações) ---
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(rippleAnim, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(rippleAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [pulseAnim, rippleAnim]);


  // --- NOVA LÓGICA DE CHECK-IN ---
  /**
   * Função principal que é chamada após a leitura do NFC.
   * Ela busca a localização e envia os dados para o backend.
   */
  const processCheckIn = async (userId: number) => {
    setIsLoading(true);
    setStatusText('Localizando...');
    const locationData = await getCurrentLocationAndAddress();

    if (!locationData) {
      setIsLoading(false);
      setStatusText('Falha na localização. Toque para tentar novamente.');
      return;
    }

    setStatusText('Enviando registro...');
    const checkInData = { userId, ...locationData };

    try {
      await api.post('/check-in', checkInData);
      Alert.alert('Sucesso!', `Check-in do usuário ${userId} registrado.`);
      setStatusText('Toque para Iniciar'); // Reseta para a próxima leitura
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('Erro de Rede', 'Não foi possível registrar o check-in. Verifique sua conexão.');
      setStatusText('Erro no registro. Toque para tentar novamente.');
    } finally {
      setIsLoading(false);
    }
  };


  // --- NOVA LÓGICA DE LEITURA NFC ---
  /**
   * Inicia a busca por um cartão NFC. Se encontrar, decodifica o ID do usuário
   * e chama a função de processamento do check-in.
   */
  const startNfcScan = async () => {
    if (isLoading) return; // Previne múltiplas leituras

    setStatusText('Aproxime o cartão...');
    setIsLoading(true); // Bloqueia novos toques enquanto espera o NFC

    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();

      if (tag?.ndefMessage && tag.ndefMessage[0]) {
        Vibration.vibrate(100); // Vibra ao encontrar o cartão
        const payload = Ndef.text.decodePayload(new Uint8Array(tag.ndefMessage[0].payload));
        const userId = parseInt(payload, 10);

        if (!isNaN(userId)) {
          setStatusText(`Cartão lido! ID: ${userId}`);
          await processCheckIn(userId); // Processa o check-in com o ID lido
        } else {
          throw new Error('Payload do cartão não é um número válido.');
        }
      } else {
        throw new Error('Cartão não contém dados NDEF.');
      }
    } catch (ex) {
      console.warn('NFC Scan Error:', ex);
      setStatusText('Leitura cancelada. Toque para tentar novamente.');
    } finally {
      NfcManager.cancelTechnologyRequest().catch(() => 0); // Sempre cancela a requisição
      setIsLoading(false);
    }
  };

  // --- Funções de animação (sem alterações) ---
  const rippleScale = rippleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2.5],
  });

  const rippleOpacity = rippleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0],
  });


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.middleContent}>
          {/* O título agora mostra o status dinâmico */}
          <Text style={styles.title}>{statusText}</Text>

          <TouchableWithoutFeedback onPress={startNfcScan} disabled={isLoading}>
            <View style={styles.logoWrapper}>
              <Animated.View
                style={[
                  styles.ripple,
                  {
                    opacity: rippleOpacity,
                    transform: [{ scale: rippleScale }],
                  },
                ]}
              />
              {/* Mostra um indicador de loading no lugar da imagem */}
              {isLoading && statusText !== 'Toque para Iniciar' ? (
                <ActivityIndicator size="large" color="#fff" style={styles.logo} />
              ) : (
                <Animated.Image
                  source={require('@/assets/images/logo.png')}
                  style={[
                    styles.logo,
                    {
                      transform: [{ scale: pulseAnim }],
                    },
                  ]}
                />
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.footer}>
          <Text style={styles.brand}>CanarinhoGo</Text>
          <Text style={styles.version}>Versão 1.0</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

// --- Estilos (sem alterações) ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(40),
  },
  middleContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: verticalScale(30),
  },
  title: {
    fontSize: RFValue(28),
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  logoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ripple: {
    position: 'absolute',
    width: scale(130),
    height: scale(130),
    borderRadius: scale(160 / 2),
    backgroundColor: 'white',
  },
  logo: {
    width: scale(120),
    height: scale(120),
    resizeMode: 'contain',
  },
  footer: {
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  brand: {
    fontSize: RFValue(18),
    color: '#fff',
    fontWeight: '600',
  },
  version: {
    fontSize: RFValue(12),
    color: '#888',
    marginTop: 4,
  },
});
