import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import { Text, Surface, IconButton } from 'react-native-paper';
import { theme } from '../theme/theme';
// Purchase and auth removed for catalog-only mode
import { RootStackParamList, TabParamList } from './types';

// Screens
import HomeScreen from '../screens/HomeScreen';
import CatalogScreen from '../screens/CatalogScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import UnderConstructionScreen from '../screens/UnderConstructionScreen';
// Removed: Login, Orders, Checkout, Addresses, PaymentMethods

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  // Cart removed

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof MaterialCommunityIcons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Catalog') {
            iconName = focused ? 'view-grid' : 'view-grid-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          } else {
            iconName = 'help-circle-outline';
          }
          // Custom icon with circular background when focused
          const isCart = false;
          const containerSize = focused ? 44 : 36;
          const iconSize = 22;
          const bgColor = focused ? theme.colors.primary : 'transparent';
          const iconColor = focused ? '#FFFFFF' : color;
          const lift = 0;

          return (
            <>
              <MaterialCommunityIcons
                name={iconName}
                size={iconSize}
                color={iconColor}
                style={{
                  backgroundColor: bgColor,
                  width: containerSize,
                  height: containerSize,
                  borderRadius: containerSize / 2,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  overflow: 'hidden',
                  // shadows
                  elevation: focused ? 8 : 0,
                  shadowColor: focused ? '#000' : 'transparent',
                  shadowOffset: { width: 0, height: focused ? 6 : 0 },
                  shadowOpacity: focused ? 0.15 : 0,
                  shadowRadius: focused ? 8 : 0,
                  transform: [{ translateY: lift }],
                }}
              />
            </>
          );
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarShowLabel: false,
        tabBarItemStyle: {
          paddingVertical: 6,
        },
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          left: 16,
          right: 16,
          bottom: 16,
          borderRadius: 24,
          height: 72,
          paddingBottom: 8,
          paddingTop: 8,
          // Android shadow
          elevation: 10,
          // iOS shadow
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.12,
          shadowRadius: 12,
        },
        tabBarHideOnKeyboard: true,
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ tabBarLabel: 'Início' }}
      />
      <Tab.Screen 
        name="Catalog" 
        component={CatalogScreen} 
        options={{ tabBarLabel: 'Catálogo' }}
      />
      {/** Cart tab removed for catalog-only mode */}
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen} 
        options={{ tabBarLabel: 'Favoritos' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ tabBarLabel: 'Perfil' }}
      />
    </Tab.Navigator>
  );
};

// Custom header component with cart button
const StackHeader = ({ navigation, route, options, back }: any) => {
  return (
    <Surface style={{
      flexDirection: 'row',
      height: 56,
      alignItems: 'center',
      paddingHorizontal: 16,
      backgroundColor: theme.colors.background,
      elevation: 0,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.surfaceVariant,
    }}>
      {back ? (
        <IconButton
          icon="arrow-left"
          onPress={navigation.goBack}
          iconColor={theme.colors.onBackground}
        />
      ) : (
        <View style={{ width: 48 }} />
      )}
      
      <Text variant="titleMedium" style={{ flex: 1, textAlign: 'center', color: theme.colors.onBackground }}>
        {options.title || route.name}
      </Text>
      
      {route.name !== 'Cart' && (
        <IconButton
          icon="cart-outline"
          onPress={() => navigation.navigate('Cart')}
          iconColor={theme.colors.onBackground}
        />
      )}
      
      {!back && <View style={{ width: 48 }} />}
    </Surface>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator 
      screenOptions={({ route }) => ({
        header: (props) => <StackHeader {...props} />,
        headerShown: route.name !== 'Main',
      })}
    >
      <Stack.Screen 
        name="Main" 
        component={TabNavigator} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen} 
        options={{ title: 'Detalhes do Produto' }}
      />
      <Stack.Screen 
        name="Cart" 
        component={UnderConstructionScreen} 
        options={{ title: 'Carrinho' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
