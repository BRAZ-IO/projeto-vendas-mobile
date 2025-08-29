import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Card,
  Title,
  Button,
  IconButton,
  Surface,
  Divider,
  TextInput,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../contexts/CartContext';
import { CartItem } from '../types';

const CartScreen = () => {
  const navigation = useNavigation();
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();

  const renderCartItem = (item: CartItem) => (
    <Card key={item.product.id} style={styles.itemCard}>
      <View style={styles.itemContent}>
        <Image 
          source={typeof item.product.images[0] === 'number' 
            ? item.product.images[0] 
            : { uri: String(item.product.images[0]) }}
          style={styles.itemImage}
          resizeMode="cover"
        />
        
        <View style={styles.itemDetails}>
          <Text style={styles.itemName} numberOfLines={2}>
            {item.product.name}
          </Text>
          
          <View style={styles.priceContainer}>
            {item.product.onSale && item.product.salePrice ? (
              <>
                <Text style={styles.originalPrice}>
                  R$ {item.product.price.toFixed(2)}
                </Text>
                <Text style={styles.salePrice}>
                  R$ {item.product.salePrice.toFixed(2)}
                </Text>
              </>
            ) : (
              <Text style={styles.price}>
                R$ {item.product.price.toFixed(2)}
              </Text>
            )}
            {item.product.type === 'fabric' && (
              <Text style={styles.priceUnit}>/m</Text>
            )}
          </View>

          <View style={styles.quantityContainer}>
            <View style={styles.quantityControls}>
              <Text style={styles.quantityLabel}>Qtd:</Text>
              <IconButton
                icon="minus"
                size={20}
                onPress={() => updateQuantity(item.product.id, item.quantity - 1, item.meters)}
                disabled={item.quantity <= 1}
              />
              <Text style={styles.quantityValue}>{item.quantity}</Text>
              <IconButton
                icon="plus"
                size={20}
                onPress={() => updateQuantity(item.product.id, item.quantity + 1, item.meters)}
              />
            </View>

            {item.product.type === 'fabric' && item.meters && (
              <View style={styles.quantityControls}>
                <Text style={styles.quantityLabel}>Metros:</Text>
                <IconButton
                  icon="minus"
                  size={20}
                  onPress={() => updateQuantity(item.product.id, item.quantity, Math.max(0.5, item.meters - 0.5))}
                  disabled={item.meters <= 0.5}
                />
                <Text style={styles.quantityValue}>{item.meters}m</Text>
                <IconButton
                  icon="plus"
                  size={20}
                  onPress={() => updateQuantity(item.product.id, item.quantity, item.meters + 0.5)}
                />
              </View>
            )}
          </View>

          <View style={styles.itemFooter}>
            <Text style={styles.itemTotal}>
              Total: R$ {(
                (item.product.onSale && item.product.salePrice ? item.product.salePrice : item.product.price) *
                (item.product.type === 'fabric' ? item.meters || 1 : item.quantity)
              ).toFixed(2)}
            </Text>
            <IconButton
              icon="delete"
              size={20}
              iconColor="#DC2626"
              onPress={() => removeFromCart(item.product.id)}
            />
          </View>
        </View>
      </View>
    </Card>
  );

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <Surface style={styles.header}>
          <View style={styles.headerContent}>
            <IconButton
              icon="arrow-left"
              size={24}
              onPress={() => navigation.goBack()}
            />
            <Title style={styles.headerTitle}>Carrinho</Title>
            <View style={styles.placeholder} />
          </View>
        </Surface>

        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="shopping-outline" size={80} color="#6B7280" />
          <Text style={styles.emptyTitle}>Seu carrinho está vazio</Text>
          <Text style={styles.emptyText}>
            Adicione produtos ao seu carrinho para continuar
          </Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Catalog')}
            style={styles.shopButton}
          >
            Continuar Comprando
          </Button>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Surface style={styles.header}>
        <View style={styles.headerContent}>
          <IconButton
            icon="arrow-left"
            size={24}
            onPress={() => navigation.goBack()}
          />
          <Title style={styles.headerTitle}>
            Carrinho ({totalItems} {totalItems === 1 ? 'item' : 'itens'})
          </Title>
          <IconButton
            icon="delete-sweep"
            size={24}
            onPress={clearCart}
          />
        </View>
      </Surface>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.itemsList}>
          {items.map(renderCartItem)}
        </View>

        {/* Order Summary */}
        <Card style={styles.summaryCard}>
          <Card.Content>
            <Title style={styles.summaryTitle}>Resumo do Pedido</Title>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal:</Text>
              <Text style={styles.summaryValue}>R$ {totalPrice.toFixed(2)}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Frete:</Text>
              <Text style={styles.summaryValue}>Grátis</Text>
            </View>
            
            <Divider style={styles.divider} />
            
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>R$ {totalPrice.toFixed(2)}</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Cupom removido do carrinho */}
      </ScrollView>

      {/* Bottom Actions */}
      <Surface style={styles.bottomActions}>
        <View style={styles.totalContainer}>
          <Text style={styles.bottomTotalLabel}>Total</Text>
          <Text style={styles.bottomTotalValue}>R$ {totalPrice.toFixed(2)}</Text>
        </View>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Checkout')}
          style={styles.checkoutButton}
          contentStyle={styles.checkoutButtonContent}
        >
          Finalizar Compra
        </Button>
      </Surface>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 48,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 160, // espaço para footer + tab bar
  },
  itemsList: {
    padding: 16,
    gap: 12,
  },
  itemCard: {
    borderRadius: 12,
    elevation: 2,
    marginBottom: 12,
  },
  itemContent: {
    flexDirection: 'row',
    padding: 16,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4B8C',
  },
  originalPrice: {
    fontSize: 14,
    color: '#6B7280',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  salePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  priceUnit: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  quantityContainer: {
    gap: 8,
    marginBottom: 12,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 8,
    minWidth: 50,
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginHorizontal: 8,
    minWidth: 40,
    textAlign: 'center',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4B8C',
  },
  summaryCard: {
    margin: 16,
    borderRadius: 12,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1F2937',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  divider: {
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4B8C',
  },
  bottomActions: {
    padding: 20,
    elevation: 10,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 96, // acima da tab bar (72) + margem 16
    borderRadius: 16,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  bottomTotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  bottomTotalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4B8C',
  },
  checkoutButton: {
    borderRadius: 12,
  },
  checkoutButtonContent: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 24,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  shopButton: {
    borderRadius: 12,
    paddingHorizontal: 24,
  },
});

export default CartScreen;
