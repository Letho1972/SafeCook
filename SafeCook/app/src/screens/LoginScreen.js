import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Importer useNavigation

export default function LoginScreen() {
  const navigation = useNavigation(); // Initialiser la navigation
  // États pour l'inscription
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPassword2, setRegisterPassword2] = useState('');
  // États pour la connexion
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleRegister = async () => {
    if (registerPassword !== registerPassword2) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }
    try {
      const res = await fetch('http://localhost:3000/api/register', { // Utiliser l'URL locale de l'API
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: registerEmail, password: registerPassword }),
      });
      const data = await res.json();
      if (res.status === 201) {
        Alert.alert('Succès', 'Compte créé, vous pouvez vous connecter');
        setRegisterEmail('');
        setRegisterPassword('');
        setRegisterPassword2('');
      } else {
        Alert.alert('Erreur', data.message || 'Erreur lors de la création');
      }
    } catch (e) {
      Alert.alert('Erreur', 'Impossible de contacter le serveur');
    }
  };

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/login', { // Utiliser l'URL locale de l'API
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (data.token) {
        await AsyncStorage.setItem('token', data.token);
        Alert.alert('Succès', 'Connexion réussie');
        setLoginEmail('');
        setLoginPassword('');
        navigation.navigate('Home'); // Naviguer vers HomeScreen
      } else {
        Alert.alert('Erreur', data.message || 'Identifiants invalides');
      }
    } catch (e) {
      Alert.alert('Erreur', 'Impossible de contacter le serveur');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={registerEmail}
        onChangeText={setRegisterEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={registerPassword}
        onChangeText={setRegisterPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmer le mot de passe"
        value={registerPassword2}
        onChangeText={setRegisterPassword2}
        secureTextEntry
      />
      <Button title="Créer le compte" onPress={handleRegister} />

      <View style={styles.separator} />

      <Text style={styles.title}>Connexion</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={loginEmail}
        onChangeText={setLoginEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={loginPassword}
        onChangeText={setLoginPassword}
        secureTextEntry
      />
      <Button title="Se connecter" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginVertical: 5 },
  separator: { height: 30 },
});
