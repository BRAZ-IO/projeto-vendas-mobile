import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Surface } from 'react-native-paper';
import UnderConstruction from '../components/UnderConstruction';

const FavoritesScreen = () => {
  return (
    <View style={styles.container}>
      <Surface style={styles.header}>
        <View style={styles.headerContent}>
          <Title style={styles.headerTitle}>Favoritos</Title>
        </View>
      </Surface>
      <UnderConstruction title="Favoritos em desenvolvimento" message="Esta seção estará disponível em breve." />
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
    paddingBottom: 16,
    elevation: 2,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default FavoritesScreen;
