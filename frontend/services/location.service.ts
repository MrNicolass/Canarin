// frontend/services/location.service.ts
import * as Location from 'expo-location';
import { Alert } from 'react-native';

// Interface to define the structure of the returned location data
export interface LocationData {
  latitude: number;
  longitude: number;
  street?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

/**
 * Requests location permission, gets the current location, and reverse geocodes it.
 * @returns A promise that resolves with a structured location data object, or null if it fails.
 */
export const getCurrentLocationAndAddress = async (): Promise<LocationData | null> => {
  try {
    // 1. Request permission
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão Negada',
        'Para registrar o ponto, precisamos da sua permissão para acessar a localização.',
      );
      return null;
    }

    // 2. Get current position with high accuracy
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });
    const { latitude, longitude } = location.coords;

    // 3. Reverse geocode to get address details
    const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });

    if (geocode.length > 0) {
      const place = geocode[0];
      
      const locationDetails: LocationData = {
        latitude,
        longitude,
        street: place.street ?? undefined,
        // The reverse geocode might return different fields. 'subregion' often corresponds to neighborhood.
        neighborhood: place.subregion ?? undefined, 
        city: place.city ?? undefined,
        state: place.region ?? undefined,
        postalCode: place.postalCode ?? undefined,
        country: place.country ?? undefined,
      };
      return locationDetails;
    }
    
    // Fallback if geocoding returns no results
    return { latitude, longitude };

  } catch (error) {
    console.error('Error getting location:', error);
    Alert.alert('Erro de Localização', 'Não foi possível obter a sua localização atual. Tente novamente.');
    return null;
  }
};