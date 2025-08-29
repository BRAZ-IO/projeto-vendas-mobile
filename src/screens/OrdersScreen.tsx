import React, { useState, useEffect } from 'react';
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
  Chip,
  IconButton,
  Surface,
  Button,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Order, OrderStatus } from '../types';

const OrdersScreen = () => {
  const navigation = useNavigation<any>();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Mock orders data
    const mockOrders: Order[] = [
      {
        id: '1',
        userId: '1',
        items: [],
        total: 189.90,
        status: 'delivered',
        paymentMethod: 'pix',
        shippingAddress: {
          street: 'Rua das Flores',
          number: '123',
          neighborhood: 'Centro',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01234-567',
        },
        createdAt: new Date('2024-01-15'),
        estimatedDelivery: new Date('2024-01-20'),
        trackingCode: 'BR123456789',
      },
      {
        id: '2',
        userId: '1',
        items: [],
        total: 299.90,
        status: 'shipped',
        paymentMethod: 'credit-card',
        shippingAddress: {
          street: 'Rua das Flores',
          number: '123',
          neighborhood: 'Centro',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01234-567',
        },
        createdAt: new Date('2024-01-20'),
        estimatedDelivery: new Date('2024-01-25'),
        trackingCode: 'BR987654321',
      },
      {
        id: '3',
        userId: '1',
        items: [],
        total: 125.00,
        status: 'processing',
        paymentMethod: 'pix',
        shippingAddress: {
          street: 'Rua das Flores',
          number: '123',
          neighborhood: 'Centro',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01234-567',
        },
        createdAt: new Date('2024-01-22'),
        estimatedDelivery: new Date('2024-01-27'),
      },
    ];
    setOrders(mockOrders);
  }, []);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return '#F59E0B';
      case 'confirmed':
        return '#3B82F6';
      case 'processing':
        return '#8B5CF6';
      case 'shipped':
        return '#06B6D4';
      case 'delivered':
        return '#10B981';
      case 'cancelled':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'confirmed':
        return 'Confirmado';
      case 'processing':
        return 'Processando';
      case 'shipped':
        return 'Enviado';
      case 'delivered':
        return 'Entregue';
      case 'cancelled':
        return 'Cancelado';
      default:
        return 'Desconhecido';
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'clock-outline';
      case 'confirmed':
        return 'check-circle-outline';
      case 'processing':
        return 'cog-outline';
      case 'shipped':
        return 'truck-outline';
      case 'delivered':
        return 'check-all';
      case 'cancelled':
        return 'close-circle-outline';
      default:
        return 'help-circle-outline';
    }
  };

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'pix':
        return 'PIX';
      case 'credit-card':
        return 'Cartão de Crédito';
      case 'boleto':
        return 'Boleto';
      default:
        return method;
    }
  };

  const renderOrder = (order: Order) => (
    <Card key={order.id} style={styles.orderCard}>
      <Card.Content>
        <View style={styles.orderHeader}>
          <View>
            <Text style={styles.orderId}>Pedido #{order.id}</Text>
            <Text style={styles.orderDate}>
              {order.createdAt.toLocaleDateString('pt-BR')}
            </Text>
          </View>
          <Chip
            style={[styles.statusChip, { backgroundColor: getStatusColor(order.status) }]}
            textStyle={styles.statusText}
            icon={getStatusIcon(order.status)}
          >
            {getStatusText(order.status)}
          </Chip>
        </View>

        <View style={styles.orderDetails}>
          <View style={styles.orderRow}>
            <MaterialCommunityIcons name="currency-usd" size={20} color="#6B7280" />
            <Text style={styles.orderLabel}>Total:</Text>
            <Text style={styles.orderValue}>R$ {order.total.toFixed(2)}</Text>
          </View>

          <View style={styles.orderRow}>
            <MaterialCommunityIcons name="credit-card" size={20} color="#6B7280" />
            <Text style={styles.orderLabel}>Pagamento:</Text>
            <Text style={styles.orderValue}>{getPaymentMethodText(order.paymentMethod)}</Text>
          </View>

          <View style={styles.orderRow}>
            <MaterialCommunityIcons name="calendar" size={20} color="#6B7280" />
            <Text style={styles.orderLabel}>Entrega prevista:</Text>
            <Text style={styles.orderValue}>
              {order.estimatedDelivery.toLocaleDateString('pt-BR')}
            </Text>
          </View>

          {order.trackingCode && (
            <View style={styles.orderRow}>
              <MaterialCommunityIcons name="package-variant" size={20} color="#6B7280" />
              <Text style={styles.orderLabel}>Rastreamento:</Text>
              <Text style={styles.trackingCode}>{order.trackingCode}</Text>
            </View>
          )}
        </View>

        <View style={styles.orderActions}>
          {order.trackingCode && (
            <Button
              mode="outlined"
              onPress={() => {}}
              style={styles.actionButton}
              icon="truck"
            >
              Rastrear
            </Button>
          )}
          <Button
            mode="text"
            onPress={() => {}}
            style={styles.actionButton}
          >
            Ver Detalhes
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Surface style={styles.header}>
        <View style={styles.headerContent}>
          <IconButton
            icon="arrow-left"
            size={24}
            onPress={() => navigation.goBack()}
          />
          <Title style={styles.headerTitle}>Meus Pedidos</Title>
          <View style={styles.placeholder} />
        </View>
      </Surface>

      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="package-variant-closed" size={80} color="#6B7280" />
          <Text style={styles.emptyTitle}>Nenhum pedido ainda</Text>
          <Text style={styles.emptyText}>
            Seus pedidos aparecerão aqui após a primeira compra
          </Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Catalog')}
            style={styles.shopButton}
          >
            Começar a Comprar
          </Button>
        </View>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.ordersList}>
            {orders.map(renderOrder)}
          </View>
        </ScrollView>
      )}
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
  ordersList: {
    padding: 16,
    gap: 16,
  },
  orderCard: {
    borderRadius: 12,
    elevation: 2,
    marginBottom: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  orderDate: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  statusChip: {
    borderRadius: 16,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  orderDetails: {
    gap: 12,
    marginBottom: 16,
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  orderLabel: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  orderValue: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  trackingCode: {
    fontSize: 14,
    color: '#8B4B8C',
    fontWeight: '600',
  },
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  actionButton: {
    borderRadius: 8,
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

export default OrdersScreen;
