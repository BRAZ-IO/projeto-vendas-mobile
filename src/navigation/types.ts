import { NavigatorScreenParams } from '@react-navigation/native';
import { Product } from '../types';

export type TabParamList = {
  Home: undefined;
  Catalog: { category?: string; onSale?: boolean } | undefined;
  Favorites: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Main: NavigatorScreenParams<TabParamList>;
  ProductDetail: { product: Product };
  Cart: undefined;
};
