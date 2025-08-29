import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/contexts/AuthContext';
import { CartProvider } from './src/contexts/CartContext';
import { FavoritesProvider } from './src/contexts/FavoritesContext';
import AppNavigator from './src/navigation/AppNavigator';
import { theme } from './src/theme/theme';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <NavigationContainer>
            <StatusBar style="light" backgroundColor="#8B4B8C" />
            <AppNavigator />
            </NavigationContainer>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
