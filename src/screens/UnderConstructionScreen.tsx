import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme/theme';

const UnderConstructionScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons 
        name="hammer-wrench" 
        size={80} 
        color={theme.colors.primary} 
        style={styles.icon}
      />
      <Text variant="headlineMedium" style={styles.title}>
        Em Desenvolvimento
      </Text>
      <Text variant="bodyLarge" style={styles.message}>
        Estamos trabalhando para trazer esta funcionalidade em breve!
      </Text>
      <Button 
        mode="contained" 
        onPress={() => navigation.goBack()}
        style={styles.button}
        icon="arrow-left"
      >
        Voltar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
    color: theme.colors.onBackground,
  },
  message: {
    textAlign: 'center',
    marginBottom: 30,
    color: theme.colors.onSurfaceVariant,
  },
  button: {
    width: '100%',
    maxWidth: 300,
  },
});

export default UnderConstructionScreen;
