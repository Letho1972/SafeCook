import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3000/api'; // URL pour le backend local avec le préfixe /api

export const login = async (email, password) => { // Changé username en email
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }), // Changé username en email
    });

    const data = await response.json();
    if (response.ok) {
      if (data.token) {
        await AsyncStorage.setItem('token', data.token); // Sauvegarde du jeton
        return { success: true, data };
      } else {
        // Si le token n'est pas dans la réponse même si response.ok est true
        return { success: false, message: data.message || 'Token non reçu.' };
      }
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    // Il est préférable de ne pas relancer l'erreur directement si vous la gérez déjà ici
    // et retournez un objet d'erreur standardisé.
    return { success: false, message: error.message || 'Une erreur réseau est survenue.' };
  }
};

// Vous aurez besoin d'une fonction pour l'inscription également
export const register = async (userData) => {
  // userData devrait maintenant contenir nom, email, password, et optionnellement allergies
  try {
    const response = await fetch(`${API_URL}/register`, { // Assuré que l'URL est correcte
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error);
    return { success: false, message: error.message || 'Une erreur réseau est survenue.' };
  }
};


export default { login, register };
