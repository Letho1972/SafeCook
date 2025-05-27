import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Index from '../../index'; // Import the Index component

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur l'écran d'accueil</Text>
      <Index /> // Render the Index component
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;