import React from 'react';
import { AppRegistry, StyleSheet } from 'react-native'; // Import AppRegistry and StyleSheet
import { name as appName } from '../../app.json'; // Import appName from app.json
import AppNavigator from './navigation/AppNavigator'; // Import AppNavigator

export default function App() {
  return (
    <AppNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

AppRegistry.registerComponent("main", () => App); // Register the App component