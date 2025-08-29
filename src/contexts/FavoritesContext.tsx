import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../types';

const FAVORITES_KEY = '@favorites';

interface FavoritesContextData {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextData>({} as FavoritesContextData);

export const FavoritesProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
        if (storedFavorites !== null) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Failed to load favorites.', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const saveFavorites = async (newFavorites: Product[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Failed to save favorites.', error);
    }
  };

  const addFavorite = (product: Product) => {
    const newFavorites = [...favorites, product];
    saveFavorites(newFavorites);
  };

  const removeFavorite = (productId: string) => {
    const newFavorites = favorites.filter(p => p.id !== productId);
    saveFavorites(newFavorites);
  };

  const isFavorite = (productId: string) => {
    return favorites.some(p => p.id === productId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, loading }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  return useContext(FavoritesContext);
};
