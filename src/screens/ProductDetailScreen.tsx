import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Card,
  Title,
  Paragraph,
  Chip,
  Surface,
  IconButton,
  
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Product, ImageSource } from '../types';

const { width, height } = Dimensions.get('window');

const ProductDetailScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { product: initialProduct } = route.params as { product: Product };
  const [product, setProduct] = useState(initialProduct);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<{id: string, name: string, price: number} | null>(
    initialProduct.variants?.[0] ? {
      id: initialProduct.variants[0].id,
      name: initialProduct.variants[0].name,
      price: initialProduct.variants[0].price || initialProduct.price
    } : null
  );
  
  // Helper function to get image source
  const getImageSource = (image: ImageSource) => {
    return typeof image === 'number' ? image : { uri: String(image) };
  };
  

  const renderSpecifications = () => {
    if (product.type === 'fabric') {
      return (
        <Card style={styles.specCard}>
          <Card.Content>
            <Title style={styles.specTitle}>Especificações Técnicas</Title>
            {typeof product.composition === 'object' ? (
              Object.entries(product.composition).map(([key, value]) => (
                <View key={key} style={styles.specRow}>
                  <Text style={styles.specLabel}>
                    {key === 'enchimento' ? 'Enchimento' : 
                     key === 'revestimento' ? 'Revestimento' : 
                     key.charAt(0).toUpperCase() + key.slice(1)}:
                  </Text>
                  <Text style={styles.specValue}>{value}</Text>
                </View>
              ))
            ) : (
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Composição:</Text>
                <Text style={styles.specValue}>{product.composition}</Text>
              </View>
            )}
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Largura:</Text>
              <Text style={styles.specValue}>{product.width}cm</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Gramatura:</Text>
              <Text style={styles.specValue}>{product.weight}g/m²</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Cor:</Text>
              <Text style={styles.specValue}>{product.color}</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Padrão:</Text>
              <Text style={styles.specValue}>{product.pattern}</Text>
            </View>
          </Card.Content>
        </Card>
      );
    } else {
      return (
        <Card style={styles.specCard}>
          <Card.Content>
            <Title style={styles.specTitle}>Especificações</Title>
            {typeof product.dimensions === 'object' ? (
              Object.entries(product.dimensions).map(([key, value]) => (
                <View key={key} style={styles.specRow}>
                  <Text style={styles.specLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}:</Text>
                  <Text style={styles.specValue}>{value}</Text>
                </View>
              ))
            ) : (
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Dimensões:</Text>
                <Text style={styles.specValue}>{product.dimensions}</Text>
              </View>
            )}
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Cor:</Text>
              <Text style={styles.specValue}>{product.color}</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Padrão:</Text>
              <Text style={styles.specValue}>{product.pattern}</Text>
            </View>
            {product.brand && (
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Marca:</Text>
                <Text style={styles.specValue}>{product.brand}</Text>
              </View>
            )}
          </Card.Content>
        </Card>
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Surface style={styles.header}>
        <View style={styles.headerContent}>
          <IconButton
            icon="arrow-left"
            size={24}
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                // Fallback to navigate to home if there's no screen to go back to
                navigation.navigate('Home');
              }
            }}
          />
          <View style={styles.headerActions}>
            <IconButton
              icon={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              iconColor={isFavorite ? '#DC2626' : '#6B7280'}
              onPress={() => setIsFavorite(!isFavorite)}
            />
            <IconButton
              icon="share-variant"
              size={24}
              onPress={() => {}}
            />
          </View>
        </View>
      </Surface>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View style={styles.imageGallery}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / width);
              setSelectedImageIndex(index);
            }}
          >
            {product.images.map((image, index) => (
              <Image
                key={index}
                source={typeof image === 'number' ? image : { uri: String(image) }}
                style={styles.productImage}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          
          {/* Image Indicators */}
          {product.images.length > 1 && (
            <View style={styles.imageIndicators}>
              {product.images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicator,
                    selectedImageIndex === index && styles.activeIndicator,
                  ]}
                />
              ))}
            </View>
          )}

          {/* Badges */}
          <View style={styles.badges}>
            {product.onSale && (
              <Chip style={styles.saleChip} textStyle={styles.saleText}>
                OFERTA
              </Chip>
            )}
            {product.featured && (
              <Chip style={styles.featuredChip} textStyle={styles.featuredText}>
                DESTAQUE
              </Chip>
            )}
            {!product.inStock && (
              <Chip style={styles.outOfStockChip} textStyle={styles.outOfStockText}>
                ESGOTADO
              </Chip>
            )}
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Title style={styles.productName}>{product.name}</Title>
          <View style={styles.priceRatingContainer}>
            <View>
              {selectedVariant ? (
                <Text style={styles.price}>
                  R$ {selectedVariant.price.toFixed(2)}
                </Text>
              ) : product.onSale && product.salePrice ? (
                <View style={styles.priceContainer}>
                  <Text style={styles.originalPrice}>
                    R$ {product.price.toFixed(2)}
                  </Text>
                  <Text style={styles.salePrice}>
                    R$ {product.salePrice.toFixed(2)}
                  </Text>
                </View>
              ) : (
                <Text style={styles.price}>
                  R$ {product.price.toFixed(2)}
                  {product.type === 'fabric' && ' /m'}
                </Text>
              )}
            </View>
            <View style={styles.ratingContainer}>
              <MaterialCommunityIcons name="star" size={20} color="#F59E0B" />
              <Text style={styles.ratingText}>
                {product.rating.toFixed(1)} ({product.reviewCount})
              </Text>
            </View>
          </View>
            
            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <View style={styles.variantsContainer}>
                <Text style={styles.variantsTitle}>Tamanhos disponíveis:</Text>
                <View style={styles.variantsList}>
                  {product.variants.map((variant) => (
                    <TouchableOpacity
                      key={variant.id}
                      style={[
                        styles.variantButton,
                        selectedVariant?.id === variant.id && styles.selectedVariant
                      ]}
                      onPress={() => setSelectedVariant({
                        id: variant.id,
                        name: variant.name,
                        price: variant.price || product.price
                      })}
                    >
                      <Text 
                        style={[
                          styles.variantText,
                          selectedVariant?.id === variant.id && styles.selectedVariantText
                        ]}
                      >
                        {variant.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {selectedVariant && (
                  <View style={styles.variantDetails}>
                    <Text style={styles.variantDetailText}>
                      <Text style={styles.variantDetailLabel}>Dimensões: </Text>
                      {product.variants.find(v => v.id === selectedVariant.id)?.dimensions}
                    </Text>
                    <Text style={styles.variantDetailText}>
                      <Text style={styles.variantDetailLabel}>Inclui: </Text>
                      {product.variants.find(v => v.id === selectedVariant.id)?.includes}
                    </Text>
                  </View>
                )}
              </View>
            )}
          {renderSpecifications()}
        </View>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    paddingTop: 50,
    elevation: 2,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  headerActions: {
    flexDirection: 'row',
  },
  content: {
    flex: 1,
  },
  imageGallery: {
    height: 300,
    position: 'relative',
  },
  productImage: {
    width,
    height: 300,
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  activeIndicator: {
    backgroundColor: '#FFFFFF',
  },
  badges: {
    position: 'absolute',
    top: 16,
    right: 16,
    gap: 8,
  },
  saleChip: {
    backgroundColor: '#DC2626',
  },
  saleText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  featuredChip: {
    backgroundColor: '#8B4B8C',
  },
  featuredText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  outOfStockChip: {
    backgroundColor: '#6B7280',
  },
  outOfStockText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  productInfo: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  priceRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#4B5563',
  },
  variantsContainer: {
    marginTop: 16,
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  variantsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  variantsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  variantButton: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    minWidth: 110,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedVariant: {
    borderColor: '#4F46E5',
    backgroundColor: '#EEF2FF',
  },
  variantText: {
    fontSize: 14,
    color: '#4B5563',
  },
  selectedVariantText: {
    color: '#4338CA',
    fontWeight: '600',
  },
  variantDetails: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    marginTop: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#8B4B8C',
  },
  variantDetailText: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 4,
  },
  variantDetailLabel: {
    fontWeight: '600',
    color: '#111827',
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  reviewCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8B4B8C',
  },
  originalPrice: {
    fontSize: 18,
    color: '#6B7280',
    textDecorationLine: 'line-through',
    marginRight: 12,
  },
  salePrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  priceUnit: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4B5563',
    marginBottom: 24,
  },
  specCard: {
    borderRadius: 12,
    marginBottom: 20,
  },
  specTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1F2937',
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  specLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  specValue: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '600',
  },
  
});

export default ProductDetailScreen;
