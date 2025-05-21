const API_URL = 'https://safe-cook-5qgvqhfdz-eric-marescqs-projects.vercel.app'; // Remplacez par l'URL de votre déploiement Vercel

export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, { // Assurez-vous que votre backend a une route /login
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      // Ici, vous recevriez probablement un jeton
      // exemple: await saveToken(data.token);
      return { success: true, data };
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
  try {
    const response = await fetch(`${API_URL}/register`, { // Assurez-vous que votre backend a une route /register
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
