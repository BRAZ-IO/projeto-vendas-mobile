import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Platform,
  SafeAreaView,
  RefreshControl,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import {
  Text,
  Card,
  Searchbar,
  Chip,
  Button,
  Surface,
  IconButton,
  Title,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../theme/theme';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { useFavorites } from '../contexts/FavoritesContext';
import { mockProducts } from '../data/mockData';
import { Product } from '../types';
import { ProductCategory } from '../types/enums';
import { Filter } from '../types';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 8;
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;
const CARD_HEIGHT = CARD_WIDTH * 1.4;

const CatalogScreen = () => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<any>();
  const paramCategory = route.params?.category;

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [filters, setFilters] = useState<Filter>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const categories = [
    { id: 'tecidos', name: 'Tecidos', icon: 'palette-swatch' },
    { id: 'cama', name: 'Cama', icon: 'bed' },
    { id: 'mesa', name: 'Mesa', icon: 'table-furniture' },
    { id: 'banho', name: 'Banho', icon: 'shower' },
    { id: 'decoracao', name: 'Decoração', icon: 'sofa' },
    { id: 'cortinas', name: 'Cortinas', icon: 'window-closed-variant' },
  ];

  const loadProducts = useCallback(async (isPullToRefresh = false) => {
    try {
      if (!isPullToRefresh) {
        setIsLoading(true);
      } else {
        setIsRefreshing(true);
      }
      
      // Simula chamada à API
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Em uma aplicação real, aqui viria a chamada à API
      setProducts(mockProducts);
      
      // Aplica os filtros atuais
      applyFilters(mockProducts);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [searchQuery, selectedCategory, filters]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    if (paramCategory) {
      setSelectedCategory(paramCategory as ProductCategory);
      setFilters((prev) => ({ ...prev, category: paramCategory as ProductCategory }));
    }
  }, [paramCategory]);

  const applyFilters = useCallback((productsList: Product[] = products) => {
    let filtered = [...productsList];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q)
      );
    }
    if (selectedCategory || filters.category) {
      filtered = filtered.filter((p) => p.category === (selectedCategory || filters.category));
    }
    if (filters.inStock) filtered = filtered.filter((p) => p.inStock);
    if (filters.onSale) filtered = filtered.filter((p) => p.onSale);

    setFilteredProducts(filtered);
    return filtered;
  }, [products, searchQuery, filters, selectedCategory]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const clearFilters = () => {
    setFilters({});
    setSelectedCategory(null);
    setSearchQuery('');
    setFilteredProducts(products);
  };

  const renderProduct = useCallback(({ item }: { item: Product }) => (
    <View style={styles.productCardContainer}>
      <TouchableOpacity 
        onPress={() => navigation.navigate('ProductDetail', { product: item })}
        activeOpacity={0.8}
      >
        <Card style={styles.productCard}>
          <View style={styles.imageWrapper}>
            <Image
              source={typeof item.images[0] === 'number' ? item.images[0] : { uri: String(item.images[0]) }}
              style={[styles.productImage, { width: '100%', height: '100%' }]}
              resizeMode="contain"
            />
            {item.onSale && (
              <View style={styles.saleBadge}>
                <Text style={styles.saleBadgeText}>PROMO</Text>
              </View>
            )}
            {!item.inStock && (
              <View style={styles.outOfStockOverlay}>
                <Text style={styles.outOfStockText}>ESGOTADO</Text>
              </View>
            )}
          </View>
          <Card.Content style={styles.cardContent}>
            <Text style={styles.productName} numberOfLines={2}>
              {item.name}
            </Text>
            <View style={styles.priceContainer}>
              {item.onSale && item.salePrice ? (
                <View style={styles.priceRow}>
                  <Text style={styles.oldPrice}>R$ {item.price.toFixed(2)}</Text>
                  <Text style={styles.salePrice}>R$ {item.salePrice.toFixed(2)}</Text>
                </View>
              ) : (
                <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
              )}
            </View>
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            <IconButton
              icon={isFavorite(item.id) ? 'heart' : 'heart-outline'}
              size={20}
              iconColor={isFavorite(item.id) ? theme.colors.error : theme.colors.onSurfaceVariant}
              style={styles.favoriteButton}
              onPress={(e) => {
                e.stopPropagation();
                if (isFavorite(item.id)) removeFavorite(item.id);
                else addFavorite(item);
              }}
            />
            <Button 
              mode="contained" 
              onPress={(e) => {
                e.stopPropagation();
                // Adicionar ao carrinho
              }}
              style={styles.addToCartButton}
              labelStyle={styles.addToCartButtonLabel}
              disabled={!item.inStock}
            >
              {item.inStock ? 'Adicionar' : 'Esgotado'}
            </Button>
          </Card.Actions>
        </Card>
      </TouchableOpacity>
    </View>
  ), [isFavorite, addFavorite, removeFavorite]);

  const renderHeader = useMemo(() => (
    <View style={styles.headerContainer}>
      <Searchbar
        placeholder="Buscar produtos..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchBar}
        iconColor={theme.colors.primary}
        placeholderTextColor="#9CA3AF"
        inputStyle={styles.searchInput}
        elevation={1}
      />
      
      <View style={styles.headerActions}>
        <Text style={styles.sectionTitle}>Categorias</Text>
        <Button 
          mode="text" 
          onPress={clearFilters}
          style={styles.clearFiltersButton}
          labelStyle={styles.clearFiltersButtonLabel}
          disabled={!searchQuery && !selectedCategory && Object.keys(filters).length === 0}
        >
          Limpar Filtros
        </Button>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.categoryScroll}
      >
        {categories.map((c) => (
          <Chip
            key={c.id}
            selected={selectedCategory === c.id}
            onPress={() =>
              setSelectedCategory(selectedCategory === c.id ? null : (c.id as ProductCategory))
            }
            style={[
              styles.categoryChip,
              selectedCategory === c.id && styles.categoryChipSelected,
            ]}
            textStyle={[
              styles.categoryText,
              selectedCategory === c.id && styles.categoryTextSelected,
            ]}
            icon={({ size, color }) => (
              <MaterialCommunityIcons 
                name={c.icon as any} 
                size={16} 
                color={selectedCategory === c.id ? '#FFFFFF' : theme.colors.primary} 
              />
            )}
            showSelectedOverlay
          >
            {c.name}
          </Chip>
        ))}
      </ScrollView>
    </View>
  ), [searchQuery, selectedCategory, categories, filters]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <FlatList
          data={filteredProducts}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={renderProduct}
          columnWrapperStyle={styles.productsGrid}
          contentContainerStyle={styles.productsContainer}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={
            <View style={styles.empty}>
              <MaterialCommunityIcons name="package-variant" size={80} color="#D1D5DB" />
              <Text style={styles.emptyTitle}>Nenhum produto encontrado</Text>
              <Text style={styles.emptyText}>Tente ajustar sua busca ou filtros</Text>
              <Button 
                mode="contained" 
                onPress={clearFilters}
                style={styles.emptyButton}
                labelStyle={styles.emptyButtonLabel}
              >
                Limpar Filtros
              </Button>
            </View>
          }
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => loadProducts(true)}
              colors={[theme.colors.primary]}
              tintColor={theme.colors.primary}
            />
          }
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Containers
  container: { 
    flex: 1, 
    backgroundColor: theme.colors.background,
  },
  innerContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  
  // Header
  headerContainer: {
    backgroundColor: theme.colors.background,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceVariant,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.onBackground,
  },
  clearFiltersButton: {
    margin: 0,
    minWidth: 0,
  },
  clearFiltersButtonLabel: {
    fontSize: 12,
    color: theme.colors.primary,
    textTransform: 'none',
  },
  
  // Search
  searchBar: {
    marginBottom: 16,
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    height: 48,
  },
  searchInput: {
    fontSize: 15,
    color: theme.colors.onSurface,
    minHeight: 0,
    paddingVertical: 0,
    marginVertical: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  
  // Categories
  categoryScroll: { 
    paddingVertical: 8,
    paddingRight: 16,
  },
  categoryChip: { 
    marginRight: 8, 
    backgroundColor: theme.colors.surfaceVariant,
    height: 36,
    borderRadius: 18,
  },
  categoryChipSelected: { 
    backgroundColor: theme.colors.primary,
  },
  categoryText: { 
    fontSize: 13, 
    color: theme.colors.onSurfaceVariant,
    lineHeight: 20,
    marginHorizontal: 0,
    marginVertical: 0,
  },
  categoryTextSelected: { 
    color: theme.colors.onPrimary,
    fontWeight: '600',
  },
  
  // Products Grid
  productsContainer: {
    padding: 8,
    paddingBottom: 100,
  },
  productsGrid: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  productCardContainer: {
    width: CARD_WIDTH,
    paddingHorizontal: CARD_MARGIN / 2,
    marginBottom: CARD_MARGIN,
  },
  productCard: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: theme.colors.surface,
    elevation: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    height: '100%', // Garante que o card ocupe toda a altura
    justifyContent: 'space-between', // Distribui o conteúdo verticalmente
  },
  imageWrapper: { 
    position: 'relative' as const,
    height: 200,
    width: '100%',
    backgroundColor: '#f8f8f8',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain' as const,
  },
  saleBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: theme.colors.error,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  saleBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outOfStockText: {
    color: theme.colors.error,
    fontWeight: 'bold',
    fontSize: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  cardContent: { 
    padding: 12,
    paddingBottom: 8,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  productName: { 
    fontSize: 13, 
    fontWeight: '500', 
    color: theme.colors.onSurface,
    marginBottom: 6,
    minHeight: 36,
  },
  priceContainer: {
    marginTop: 'auto',
  },
  priceRow: { 
    flexDirection: 'row', 
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  price: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: theme.colors.onSurface,
  },
  oldPrice: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
    textDecorationLine: 'line-through',
    marginRight: 4,
  },
  salePrice: { 
    fontSize: 15, 
    fontWeight: '700', 
    color: theme.colors.error,
  },
  favoriteButton: {
    margin: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  addToCartButton: {
    flex: 1,
    marginLeft: 8,
    borderRadius: 8,
    height: 36,
    justifyContent: 'center',
  },
  addToCartButtonLabel: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  },
  
  // Empty State
  empty: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: theme.colors.onBackground, 
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: { 
    fontSize: 14, 
    color: theme.colors.onSurfaceVariant, 
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyButton: {
    borderRadius: 8,
    paddingHorizontal: 24,
  },
  emptyButtonLabel: {
    fontWeight: '600',
  },
});

export default CatalogScreen;
