import React, { useEffect, useRef } from 'react';
import {
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

export default function DriverScreen() {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rippleAnim = useRef(new Animated.Value(0)).current;

  // Animação contínua de pulso (zoom sutil)
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
      ])
    ).start();
  }, []);

  // Animação contínua de "gota"
  useEffect(() => {
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
      ])
    ).start();
  }, []);

  const handleTap = () => {
    Vibration.vibrate(100);

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
          <Text style={styles.title}>Passe o cartão</Text>

          <TouchableWithoutFeedback onPress={handleTap}>
            <View style={styles.logoWrapper}>
              {/* Efeito de "gota" sutil atrás da logo */}
              <Animated.View
                style={[
                  styles.ripple,
                  {
                    opacity: rippleOpacity,
                    transform: [{ scale: rippleScale }],
                  },
                ]}
              />
              <Animated.Image
                source={require('@/assets/images/logo.png')}
                style={[
                  styles.logo,
                  {
                    transform: [{ scale: pulseAnim }],
                  },
                ]}
              />
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
