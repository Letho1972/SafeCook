const express = require('express');
const router = express.Router();

// Route d'inscription
router.post('/api/register', (req, res) => {
  // Logique d'inscription ici
  res.send('Register route');
});

// Route de connexion
router.post('/api/login', (req, res) => {
  // Logique de connexion ici
  res.send('Login route');
});

module.exports = router;