const express = require('express');
const router = express.Router();

// Exemple de route qui renvoie des données
router.get('/data', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' }
    ]
  });
});

// Ajoutez d'autres routes selon vos besoins

module.exports = router;
