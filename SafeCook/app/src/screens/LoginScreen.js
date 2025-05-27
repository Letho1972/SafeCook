import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { login as apiLogin, register as apiRegister } from '../services/authService'; // Importer les fonctions du service

export default function LoginScreen() {
  const navigation = useNavigation();
  // États pour l'inscription
  const [registerName, setRegisterName] = useState(''); // Ajout de l'état pour le nom
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
    if (!registerName.trim()) { // Vérifier si le nom n'est pas vide
      Alert.alert('Erreur', 'Veuillez entrer votre nom');
      return;
    }
    try {
      // Ajout de registerName à l'objet envoyé
      const result = await apiRegister({ nom: registerName, email: registerEmail, password: registerPassword });
      if (result.success) {
        Alert.alert('Succès', 'Compte créé, vous pouvez vous connecter');
        setRegisterName(''); // Réinitialiser le nom
        setRegisterEmail('');
        setRegisterPassword('');
        setRegisterPassword2('');
      } else {
        Alert.alert('Erreur', result.message || 'Erreur lors de la création');
      }
    } catch (e) {
      Alert.alert('Erreur', e.message || 'Impossible de contacter le serveur');
    }
  };

  const handleLogin = async () => {
    try {
      const result = await apiLogin(loginEmail, loginPassword);
      if (result.success && result.data.token) {
        Alert.alert('Succès', 'Connexion réussie');
        setLoginEmail('');
        setLoginPassword('');
        navigation.navigate('Home');
      } else {
        Alert.alert('Erreur', result.message || 'Identifiants invalides');
      }
    } catch (e) {
      Alert.alert('Erreur', e.message || 'Impossible de contacter le serveur');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom" // Ajout du champ Nom
        value={registerName}
        onChangeText={setRegisterName}
        autoCapitalize="words"
      />
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
