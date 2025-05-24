import React, { useEffect, useRef } from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    Vibration,
    View
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale } from 'react-native-size-matters';

export default function DriverScreen() {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Animação contínua de flutuação
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -5,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 5,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleTap = () => {
    // Vibrar o celular (vibração curta)
    Vibration.vibrate(100);

    // Animação de pulso (aumenta e volta)
    Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.middleContent}>
          <Text style={styles.title}>Passe o cartão</Text>

          <TouchableWithoutFeedback onPress={handleTap}>
            <Animated.Image
              source={require('@/assets/images/logo.png')}
              style={[
                styles.logo,
                {
                  transform: [
                    { translateY: floatAnim },
                    { scale: pulseAnim },
                  ],
                },
              ]}
            />
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
