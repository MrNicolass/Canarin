import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Image } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/styles/Colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].primary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="home/page"
        options={{
          title: 'Home',
          tabBarIcon: () => <Image source={require('@/assets/images/icons/homepng.png')} style={{ width: 28, height: 28 }} />,
        }}
      />
      <Tabs.Screen
        name="dashboard/page"
        options={{
          title: 'Dashboard',
          tabBarIcon: () => <Image source={require('@/assets/images/icons/dashboard.png')} style={{ width: 28, height: 28 }} />
        }}
      />
      <Tabs.Screen
        name="driver/page"
        options={{
          title: 'Entrada',
          tabBarIcon: () => <Image source={require('@/assets/images/icons/card.png')} style={{ width: 28, height: 28 }} />,
        }}
      />
      <Tabs.Screen
        name="account/login"
        options={{
          title: 'Login',
          tabBarIcon: () => <Image source={require('@/assets/images/icons/profile.png')} style={{ width: 28, height: 28 }} />,
        }}
      />
      <Tabs.Screen
        name="profile/perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: () => <Image source={require('@/assets/images/icons/settings.png')} style={{ width: 28, height: 28 }} />,
        }}
      />
    </Tabs>
  );
}
