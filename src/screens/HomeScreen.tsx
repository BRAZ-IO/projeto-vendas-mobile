import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { Card, Searchbar, Chip, IconButton, Surface, Title, Button, Paragraph } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme/theme';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { mockProducts } from '../data/mockData';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { ProductCardSkeleton, CategorySkeleton } from '../components/LoadingSkeleton';

const { width } = Dimensions.get('window');

type HomeScreenNavigationProp = StackNavigationProp<any, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { totalItems } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFeaturedProducts(mockProducts.filter(p => p.featured).slice(0, 6));
    setIsLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const categories = [
    { id: 'tecidos', name: 'Tecidos', icon: 'texture', color: theme.colors.primary },
    { id: 'cama', name: 'Cama', icon: 'bed', color: theme.colors.secondary },
    { id: 'mesa', name: 'Mesa', icon: 'table-furniture', color: '#6B7280' },
    { id: 'banho', name: 'Banho', icon: 'shower', color: '#059669' },
    { id: 'decoracao', name: 'Decoração', icon: 'sofa', color: '#DC2626' },
    { id: 'cortinas', name: 'Cortinas', icon: 'window-closed-variant', color: '#7C3AED' },
  ];

  const renderProductCard = (product: Product, isSmall = false) => (
    <TouchableOpacity
      key={product.id}
      onPress={() => navigation.navigate('ProductDetail', { product })}
      style={isSmall ? styles.smallProductCard : styles.productCard}
    >
      <Card style={styles.card}>
        <View style={styles.imageContainer}>
          <Image 
            source={typeof product.images[0] === 'number' 
              ? product.images[0] 
              : { uri: String(product.images[0]) }}
            style={styles.productImage} 
            resizeMode="cover"
          />
        </View>
        <Card.Content style={styles.cardContent}>
          <Text style={styles.productName} numberOfLines={2}>
            {product.name}
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              R$ {product.price.toFixed(2)}
              {product.type === 'fabric' && '/m'}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <LinearGradient colors={[theme.colors.primary, theme.colors.secondary]} style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Olá, Cliente!</Text>
            <Text style={styles.subtitle}>Encontre os melhores tecidos e produtos</Text>
          </View>
          <View style={styles.headerIcons}>
            <IconButton
              icon="magnify"
              iconColor="#FFFFFF"
              size={24}
              onPress={() => navigation.navigate('Catalog')}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('Cart')}
              style={styles.cartButton}
            >
              <MaterialCommunityIcons name="shopping-outline" size={24} color="#FFFFFF" />
              {totalItems > 0 && (
                <Surface style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{totalItems}</Text>
                </Surface>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Categories */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Categorias</Title>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoriesContainer}>
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <CategorySkeleton key={index} />
              ))
            ) : (
              categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[styles.categoryCard, { backgroundColor: category.color }]}
                  onPress={() => navigation.navigate('Catalog', { category: category.id })}
                >
                  <MaterialCommunityIcons
                    name={category.icon as any}
                    size={32}
                    color="#FFFFFF"
                  />
                  <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        </ScrollView>
      </View>

      {/* Featured Products */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Title style={styles.sectionTitle}>Produtos em Destaque</Title>
          <Button
            mode="text"
            onPress={() => navigation.navigate('Catalog')}
            compact
          >
            Ver todos
          </Button>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.productsContainer}>
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            ) : (
              featuredProducts.map((product) => renderProductCard(product))
            )}
          </View>
        </ScrollView>
      </View>


      {/* Loyalty Program */}
      <Card style={styles.loyaltyCard}>
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.secondary]}
          style={styles.loyaltyGradient}
        >
          <Card.Content>
            <View style={styles.loyaltyContent}>
              <View style={styles.loyaltyInfo}>
                <Title style={styles.loyaltyTitle}>Programa de Fidelidade</Title>
                <Paragraph style={styles.loyaltyText}>
                  Você tem 150 pontos
                </Paragraph>
              </View>
              <MaterialCommunityIcons name="star-circle" size={48} color="#FFFFFF" />
            </View>
          </Card.Content>
        </LinearGradient>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 4,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartButton: {
    position: 'relative',
    marginLeft: 8,
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#DC2626',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  section: {
    marginVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryCard: {
    width: 80,
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryName: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
  productsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  productCard: {
    width: 180,
  },
  smallProductCard: {
    width: (width - 60) / 2,
  },
  card: {
    borderRadius: 12,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  saleChip: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#DC2626',
  },
  saleText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  loyaltyCard: {
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  loyaltyGradient: {
    padding: 20,
  },
  loyaltyContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loyaltyInfo: {
    flex: 1,
  },
  loyaltyTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loyaltyText: {
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 4,
  },
});

export default HomeScreen;
