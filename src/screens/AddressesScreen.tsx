import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Button, Card, Title, IconButton, Surface } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';

type Address = {
  id: string;
  name: string;
  street: string;
  city: string;
  zipCode: string;
  isPrimary: boolean;
};

type AddressesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Addresses'>;

const mockAddresses: Address[] = [
  {
    id: '1',
    name: 'Casa',
    street: 'Rua das Flores, 123',
    city: 'São Paulo, SP',
    zipCode: '01234-567',
    isPrimary: true,
  },
  {
    id: '2',
    name: 'Trabalho',
    street: 'Avenida Principal, 456',
    city: 'São Paulo, SP',
    zipCode: '09876-543',
    isPrimary: false,
  },
];

const AddressesScreen = () => {
  const navigation = useNavigation<AddressesScreenNavigationProp>();
  const [addresses, setAddresses] = useState(mockAddresses);

  const renderAddress = ({ item }: { item: Address }) => (
    <Card style={styles.addressCard}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.addressInfo}>
          <Title style={styles.addressName}>{item.name}</Title>
          {item.isPrimary && <Button mode="contained-tonal" compact style={styles.primaryBadge}>Principal</Button>}
        </View>
        <Text style={styles.addressText}>{item.street}</Text>
        <Text style={styles.addressText}>{item.city}</Text>
        <Text style={styles.addressText}>{item.zipCode}</Text>
        <View style={styles.cardActions}>
          <Button mode="text" onPress={() => { /* Edit address */ }}>Editar</Button>
          <Button mode="text" textColor="#DC2626" onPress={() => { /* Remove address */ }}>Remover</Button>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Surface style={styles.header}>
        <IconButton icon="arrow-left" size={24} onPress={() => navigation.goBack()} />
        <Title style={styles.headerTitle}>Meus Endereços</Title>
        <View style={{ width: 48 }} />
      </Surface>

      <FlatList
        data={addresses}
        renderItem={renderAddress}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={
          <Button
            mode="contained"
            icon="plus"
            onPress={() => { /* Navigate to add address screen */ }}
            style={styles.addButton}
          >
            Adicionar Novo Endereço
          </Button>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 8,
    paddingBottom: 16,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 20,
  },
  addressCard: {
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  cardContent: {
    gap: 8,
  },
  addressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  primaryBadge: {
    borderRadius: 8,
  },
  addressText: {
    fontSize: 14,
    color: '#6B7280',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  addButton: {
    marginTop: 16,
    borderRadius: 12,
    paddingVertical: 8,
  },
});

export default AddressesScreen;
