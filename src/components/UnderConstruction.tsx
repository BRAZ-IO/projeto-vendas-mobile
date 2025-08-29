import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title?: string;
  message?: string;
  showBackToCatalog?: boolean;
}

const UnderConstruction: React.FC<Props> = ({
  title = 'Funcionalidade indisponível',
  message = 'Esta área está em desenvolvimento e será lançada em breve.',
  showBackToCatalog = true,
}) => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="tools" size={84} color="#6B7280" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {showBackToCatalog && (
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Catalog')}
          style={styles.button}
        >
          Ir para o Catálogo
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 16,
  },
  message: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 8,
  },
  button: {
    marginTop: 20,
    borderRadius: 12,
  },
});

export default UnderConstruction;
