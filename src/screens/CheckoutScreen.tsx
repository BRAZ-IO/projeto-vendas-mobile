import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Card,
  Title,
  Button,
  RadioButton,
  TextInput,
  IconButton,
  Surface,
  Divider,
  Snackbar,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { PaymentMethod } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCorreiosQuotes, quoteToEta } from '../services/correios';

type SavedCard = { id: string; holderName: string; number: string; expiry: string };
const STORAGE_KEY = 'payment_methods';

const CheckoutScreen = () => {
  const navigation = useNavigation<any>();
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [savedCards, setSavedCards] = useState<SavedCard[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | 'new' | null>(null);
  const [useNewCard, setUseNewCard] = useState(false);
  const [address, setAddress] = useState({
    street: 'Rua das Flores',
    number: '123',
    complement: '',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567',
  });
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [discount, setDiscount] = useState(0);

  // Shipping via Correios + pickup option
  const ORIGIN_ZIP = '01001-000'; // TODO: mover para config da loja
  const [shippingOptions, setShippingOptions] = useState([
    { id: 'pickup', label: 'Retirar na Loja', price: 0, deliveryTime: 'Pronto em 24h' },
  ] as { id: string; label: string; price: number; deliveryTime: string }[]);
  const [selectedShipping, setSelectedShipping] = useState<{ id: string; label: string; price: number; deliveryTime: string }>(
    { id: 'pickup', label: 'Retirar na Loja', price: 0, deliveryTime: 'Pronto em 24h' }
  );

  const shippingCost = selectedShipping.price;
  const finalTotal = (Number(totalPrice) || 0) - (Number(discount) || 0) + (Number(shippingCost) || 0);

  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) setSavedCards(JSON.parse(json));
      } catch {}
    })();
  }, []);

  // Refresh Correios quotes whenever destination ZIP or cart items change
  useEffect(() => {
    let isCancelled = false;
    (async () => {
      try {
        const destinationZip = address?.zipCode || '';
        const itemCount = items?.length || 0;
        // Aproximação simples de peso e dimensões
        const weightKg = Math.max(0.3, itemCount * 0.5);
        const lengthCm = 20;
        const heightCm = 10;
        const widthCm = 15;

        const quotes = await getCorreiosQuotes({
          originZip: ORIGIN_ZIP,
          destinationZip,
          weightKg,
          lengthCm,
          heightCm,
          widthCm,
        });

        if (isCancelled) return;

        const mapped = quotes
          .filter((q) => !q.error)
          .map((q) => ({
            id: q.service.toLowerCase(),
            label: q.service === 'SEDEX' ? 'SEDEX' : 'PAC',
            price: q.price,
            deliveryTime: quoteToEta(q),
          }));

        const nextOptions = [
          { id: 'pickup', label: 'Retirar na Loja', price: 0, deliveryTime: 'Pronto em 24h' },
          ...mapped,
        ];
        setShippingOptions(nextOptions);

        // Preserve selection if possible; otherwise, escolher primeiro disponível
        const stillExists = nextOptions.find((o) => o.id === selectedShipping.id);
        setSelectedShipping(stillExists || nextOptions[0]);
      } catch (e) {
        // Em caso de erro, manter apenas pickup e seleção atual
      }
    })();
    return () => { isCancelled = true; };
  }, [address?.zipCode, items]);

  const maskNumber = (num: string) => {
    const digits = num.replace(/\D/g, '');
    const last4 = digits.slice(-4);
    return `**** **** **** ${last4}`;
  };


  const handlePlaceOrder = async () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      clearCart();
      setSnackbarMessage('Pedido realizado com sucesso!');
      setSnackbarVisible(true);
      
      setTimeout(() => {
        navigation.navigate('Orders');
      }, 2000);
    }, 2000);
  };

  const getPaymentIcon = (method: PaymentMethod) => {
    switch (method) {
      case 'pix':
        return 'qrcode';
      case 'credit-card':
        return 'credit-card';
      case 'boleto':
        return 'barcode';
      default:
        return 'credit-card';
    }
  };

  const getPaymentTitle = (method: PaymentMethod) => {
    switch (method) {
      case 'pix':
        return 'PIX';
      case 'credit-card':
        return 'Cartão de Crédito';
      case 'boleto':
        return 'Boleto Bancário';
      default:
        return 'Cartão de Crédito';
    }
  };

  const getPaymentDescription = (method: PaymentMethod) => {
    switch (method) {
      case 'pix':
        return 'Pagamento instantâneo';
      case 'credit-card':
        return 'Parcelamento em até 12x';
      case 'boleto':
        return 'Vencimento em 3 dias úteis';
      default:
        return '';
    }
  };

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
            <Title style={styles.headerTitle}>Finalizar Compra</Title>
            <View style={styles.placeholder} />
          </View>
        </Surface>
        <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="cart-off" size={80} color="#6B7280" />
            <Title style={styles.emptyTitle}>Seu carrinho está vazio</Title>
            <Text style={styles.emptyText}>Adicione itens para finalizar a compra.</Text>
            <Button mode="contained" onPress={() => navigation.navigate('Catalog')}>
                Ver catálogo
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
          <Title style={styles.headerTitle}>Finalizar Compra</Title>
          <View style={styles.placeholder} />
        </View>
      </Surface>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Delivery Address */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="map-marker" size={24} color="#8B4B8C" />
              <Title style={styles.sectionTitle}>Endereço de Entrega</Title>
            </View>
            
            <View style={styles.addressContainer}>
              <Text style={styles.addressText}>
                {address.street}, {address.number}
                {address.complement && `, ${address.complement}`}
              </Text>
              <Text style={styles.addressText}>
                {address.neighborhood} - {address.city}/{address.state}
              </Text>
              <Text style={styles.addressText}>CEP: {address.zipCode}</Text>
            </View>
            
            <Button mode="text" onPress={() => {}}>
              Alterar endereço
            </Button>
          </Card.Content>
        </Card>

        {/* Shipping Method */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="truck-delivery" size={24} color="#8B4B8C" />
              <Title style={styles.sectionTitle}>Método de Envio</Title>
            </View>
            <RadioButton.Group
              onValueChange={(value) => {
                const selected = shippingOptions.find(opt => opt.id === value);
                if (selected) {
                  setSelectedShipping(selected);
                }
              }}
              value={selectedShipping.id}
            >
              {shippingOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.paymentOption}
                  onPress={() => {
                    const selected = shippingOptions.find(opt => opt.id === option.id);
                    if (selected) {
                      setSelectedShipping(selected);
                    }
                  }}
                >
                  <View style={styles.paymentContent}>
                    <View style={styles.paymentInfo}>
                      <Text style={styles.paymentTitle}>{option.label}</Text>
                      <Text style={styles.paymentDescription}>
                        {option.deliveryTime}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.shippingPriceContainer}>
                    <Text style={styles.shippingPriceText}>
                      {option.price === 0 ? 'Grátis' : `R$ ${option.price.toFixed(2)}`}
                    </Text>
                    <RadioButton value={option.id} />
                  </View>
                </TouchableOpacity>
              ))}
            </RadioButton.Group>
          </Card.Content>
        </Card>

        {/* Payment Method */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="credit-card" size={24} color="#8B4B8C" />
              <Title style={styles.sectionTitle}>Forma de Pagamento</Title>
            </View>

            <RadioButton.Group
              onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
              value={paymentMethod}
            >
              {(['pix', 'credit-card', 'boleto'] as PaymentMethod[]).map((method) => (
                <TouchableOpacity
                  key={method}
                  style={styles.paymentOption}
                  onPress={() => setPaymentMethod(method)}
                >
                  <View style={styles.paymentContent}>
                    <MaterialCommunityIcons
                      name={getPaymentIcon(method)}
                      size={24}
                      color="#6B7280"
                    />
                    <View style={styles.paymentInfo}>
                      <Text style={styles.paymentTitle}>{getPaymentTitle(method)}</Text>
                      <Text style={styles.paymentDescription}>
                        {getPaymentDescription(method)}
                      </Text>
                    </View>
                  </View>
                  <RadioButton value={method} />
                </TouchableOpacity>
              ))}
            </RadioButton.Group>

            {paymentMethod === 'credit-card' && savedCards.length > 0 && (
              <View style={{ marginTop: 8 }}>
                <Text style={styles.paymentTitle}>Cartões salvos</Text>
                <RadioButton.Group
                  onValueChange={(value) => {
                    setSelectedCardId(value as string);
                    setUseNewCard(value === 'new');
                  }}
                  value={selectedCardId || 'new'}
                >
                  {savedCards.map((card) => (
                    <TouchableOpacity
                      key={card.id}
                      style={styles.paymentOption}
                      onPress={() => {
                        setSelectedCardId(card.id);
                        setUseNewCard(false);
                      }}
                    >
                      <View style={styles.paymentContent}>
                        <MaterialCommunityIcons name="credit-card-outline" size={24} color="#6B7280" />
                        <View style={styles.paymentInfo}>
                          <Text style={styles.paymentTitle}>{maskNumber(card.number)}</Text>
                          <Text style={styles.paymentDescription}>{`${card.holderName} • ${card.expiry}`}</Text>
                        </View>
                      </View>
                      <RadioButton value={card.id} />
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    key={'new'}
                    style={styles.paymentOption}
                    onPress={() => {
                      setSelectedCardId('new');
                      setUseNewCard(true);
                    }}
                  >
                    <View style={styles.paymentContent}>
                      <MaterialCommunityIcons name="plus-circle-outline" size={24} color="#6B7280" />
                      <View style={styles.paymentInfo}>
                        <Text style={styles.paymentTitle}>Usar outro cartão</Text>
                        <Text style={styles.paymentDescription}>Inserir dados de um novo cartão</Text>
                      </View>
                    </View>
                    <RadioButton value={'new'} />
                  </TouchableOpacity>
                </RadioButton.Group>
                <Button mode="text" onPress={() => navigation.navigate('PaymentMethods')}>Gerenciar cartões</Button>
              </View>
            )}

            {paymentMethod === 'credit-card' && (useNewCard || savedCards.length === 0) && (
              <View style={styles.cardForm}>
                <TextInput
                  label="Número do cartão"
                  mode="outlined"
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="0000 0000 0000 0000"
                />
                <View style={styles.cardRow}>
                  <TextInput
                    label="Validade"
                    mode="outlined"
                    style={[styles.input, styles.halfInput]}
                    placeholder="MM/AA"
                  />
                  <TextInput
                    label="CVV"
                    mode="outlined"
                    style={[styles.input, styles.halfInput]}
                    keyboardType="numeric"
                    placeholder="123"
                  />
                </View>
                <TextInput
                  label="Nome no cartão"
                  mode="outlined"
                  style={styles.input}
                  placeholder="Nome como está no cartão"
                />
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Coupon removido para liberar espaço */}

        {/* Order Summary */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="receipt" size={24} color="#8B4B8C" />
              <Title style={styles.sectionTitle}>Resumo do Pedido</Title>
            </View>

            <View style={styles.summaryContainer}>
              <Text style={styles.summaryLabel}>
                {items.length} {items.length === 1 ? 'item' : 'itens'}
              </Text>
              
              {items.map((item) => (
                <View key={item.product.id} style={styles.summaryItem}>
                  <Text style={styles.itemName} numberOfLines={1}>
                    {item.quantity}x {item.product.name}
                    {item.product.type === 'fabric' && item.meters && ` (${item.meters}m)`}
                  </Text>
                  <Text style={styles.itemPrice}>
                    R$ {((
                      (item.product.onSale && item.product.salePrice ? item.product.salePrice : item.product.price) *
                      (item.product.type === 'fabric' ? item.meters || 1 : item.quantity)
                    )).toFixed(2)}
                  </Text>
                </View>
              ))}

              <Divider style={styles.divider} />

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal:</Text>
                <Text style={styles.summaryValue}>R$ {Number(totalPrice).toFixed(2)}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Desconto:</Text>
                <Text style={[styles.summaryValue, styles.discountValue]}>- R$ {Number(discount).toFixed(2)}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Frete:</Text>
                <Text style={styles.summaryValue}>
                  {shippingCost === 0 ? 'Grátis' : `R$ ${Number(shippingCost).toFixed(2)}`}
                </Text>
              </View>

              <Divider style={styles.divider} />

              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalValue}>R$ {Number(finalTotal).toFixed(2)}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Loyalty Points */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <View style={styles.loyaltyContainer}>
              <MaterialCommunityIcons name="star-circle" size={24} color="#8B4B8C" />
              <View style={styles.loyaltyInfo}>
                <Text style={styles.loyaltyTitle}>Você ganhará pontos!</Text>
                <Text style={styles.loyaltyText}>
                  +{Math.floor(finalTotal / 10)} pontos de fidelidade
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Bottom Actions */}
      <Surface style={styles.bottomActions}>
        <View style={styles.totalContainer}>
          <Text style={styles.bottomTotalLabel}>Total</Text>
          <Text style={styles.bottomTotalValue}>R$ {Number(finalTotal).toFixed(2)}</Text>
        </View>
        <Button
          mode="contained"
          onPress={handlePlaceOrder}
          disabled={items.length === 0 || loading}
          loading={loading}
          style={styles.placeOrderButton}
          contentStyle={styles.placeOrderButtonContent}
        >
          {loading ? 'Processando...' : 'Finalizar Pedido'}
        </Button>
      </Surface>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 16,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
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
    paddingBottom: 160, // espaço para o footer e a tab bar flutuante
  },
  sectionCard: {
    margin: 16,
    marginBottom: 0,
    borderRadius: 12,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
    color: '#1F2937',
  },
  addressContainer: {
    marginBottom: 16,
  },
  addressText: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  paymentContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentInfo: {
    marginLeft: 16,
    flex: 1,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  paymentDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  shippingPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shippingPriceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginRight: 8,
  },
  cardForm: {
    marginTop: 16,
    gap: 12,
  },
  input: {
    backgroundColor: '#FFFFFF',
  },
  cardRow: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  summaryContainer: {
    gap: 8,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  itemName: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
    marginRight: 12,
  },
  itemPrice: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  divider: {
    marginVertical: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
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
  discountValue: {
    color: '#16A34A', // green-600
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
  loyaltyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loyaltyInfo: {
    marginLeft: 12,
  },
  loyaltyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  loyaltyText: {
    fontSize: 14,
    color: '#8B4B8C',
    marginTop: 2,
  },
  bottomActions: {
    padding: 20,
    elevation: 10,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 96, // eleva acima da tab bar (72) + margem inferior (16)
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
  placeOrderButton: {
    borderRadius: 12,
  },
  placeOrderButtonContent: {
    paddingVertical: 8,
  },
});

export default CheckoutScreen;
