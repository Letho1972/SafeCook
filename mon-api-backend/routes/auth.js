const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users'); // Corrigé: User -> Users
const router = express.Router();


router.get('/register', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API d\'authentification' });
});
router.post('/register', async (req, res) => {
  const { nom, email, password, allergies } = req.body; // Ajout de nom et allergies

  console.log("Données reçues pour l'inscription :", { nom, email, password, allergies });
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ nom, email, password: hashed, allergies }); // Ajout de nom et allergies
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res.status(500).json({ message: "Erreur lors de la création de l'utilisateur", error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' }); // Message plus générique
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' }); // Message plus générique
    }
    // Remplacer 'SECRET_KEY' par process.env.JWT_SECRET_KEY
    const token = jwt.sign({ userId: user._id, email: user.email, nom: user.nom }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, email: user.email, nom: user.nom, allergies: user.allergies } });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Erreur lors de la connexion", error: error.message });
  }
});

module.exports = router;
