import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, List, Button, Appbar, TextInput, Dialog, Portal, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SavedCard = {
  id: string;
  holderName: string;
  number: string; // stored masked? We'll store raw to re-mask; but avoid sensitive storage in prod
  expiry: string; // MM/YY
};

const STORAGE_KEY = 'payment_methods';

const PaymentMethodsScreen = () => {
  const navigation = useNavigation<any>();
  const [cards, setCards] = useState<SavedCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [holderName, setHolderName] = useState('');
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) setCards(JSON.parse(json));
      } catch {}
      setLoading(false);
    })();
  }, []);

  const saveCards = async (next: SavedCard[]) => {
    setCards(next);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const maskNumber = (num: string) => {
    const digits = num.replace(/\D/g, '');
    const last4 = digits.slice(-4);
    return `**** **** **** ${last4}`;
  };

  const resetForm = () => {
    setHolderName('');
    setNumber('');
    setExpiry('');
    setCvv('');
    setError(null);
  };

  const validateAndAdd = async () => {
    const cleanNumber = number.replace(/\s+/g, '');
    const cleanExpiry = expiry.replace(/\s+/g, '');
    if (!holderName.trim()) return setError('Informe o nome do titular');
    if (!/^\d{16}$/.test(cleanNumber)) return setError('Número do cartão inválido');
    if (!/^\d{2}\/\d{2}$/.test(cleanExpiry)) return setError('Validade no formato MM/AA');
    if (!/^\d{3,4}$/.test(cvv)) return setError('CVV inválido');

    const newCard: SavedCard = {
      id: `${Date.now()}`,
      holderName: holderName.trim(),
      number: cleanNumber,
      expiry: cleanExpiry,
    };
    const next = [...cards, newCard];
    await saveCards(next);
    setShowAdd(false);
    resetForm();
  };

  const removeCard = async (id: string) => {
    const next = cards.filter((c) => c.id !== id);
    await saveCards(next);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Formas de Pagamento" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.card}>
          <Card.Title title="Cartões" subtitle={`${cards.length} salvo(s)`} />
          <Card.Content>
            {cards.length === 0 ? (
              <Text style={styles.description}>
                Nenhum cartão salvo. Adicione um novo método de pagamento.
              </Text>
            ) : (
              cards.map((card) => (
                <List.Item
                  key={card.id}
                  title={maskNumber(card.number)}
                  description={`${card.holderName} • ${card.expiry}`}
                  left={(props) => <List.Icon {...props} icon="credit-card-outline" />}
                  right={(props) => (
                    <IconButton icon="delete" onPress={() => removeCard(card.id)} />
                  )}
                />)
              )
            )}
          </Card.Content>
        </Card>

        <Button mode="contained" style={styles.addButton} onPress={() => setShowAdd(true)}>
          Adicionar método de pagamento
        </Button>
      </ScrollView>

      <Portal>
        <Dialog visible={showAdd} onDismiss={() => { setShowAdd(false); resetForm(); }}>
          <Dialog.Title>Novo cartão</Dialog.Title>
          <Dialog.Content>
            {!!error && <Text style={styles.errorText}>{error}</Text>}
            <TextInput
              label="Nome impresso no cartão"
              value={holderName}
              onChangeText={setHolderName}
              style={styles.input}
            />
            <TextInput
              label="Número do cartão"
              value={number}
              onChangeText={(t) => setNumber(t.replace(/[^\d]/g, '').slice(0, 16))}
              keyboardType="number-pad"
              style={styles.input}
            />
            <View style={styles.row}>
              <TextInput
                label="Validade (MM/AA)"
                value={expiry}
                onChangeText={(t) => {
                  const digits = t.replace(/[^\d]/g, '').slice(0, 4);
                  const val = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
                  setExpiry(val);
                }}
                keyboardType="number-pad"
                style={[styles.input, styles.half]}
              />
              <TextInput
                label="CVV"
                value={cvv}
                onChangeText={(t) => setCvv(t.replace(/[^\d]/g, '').slice(0, 4))}
                keyboardType="number-pad"
                secureTextEntry
                style={[styles.input, styles.half]}
              />
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => { setShowAdd(false); resetForm(); }}>Cancelar</Button>
            <Button mode="contained" onPress={validateAndAdd}>Salvar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  content: { padding: 16 },
  card: { borderRadius: 12 },
  description: { color: '#6B7280' },
  addButton: { marginTop: 16 },
  input: { marginTop: 8, backgroundColor: 'transparent' },
  row: { flexDirection: 'row', gap: 8 },
  half: { flex: 1 },
  errorText: { color: '#DC2626', marginBottom: 8 },
});

export default PaymentMethodsScreen;
