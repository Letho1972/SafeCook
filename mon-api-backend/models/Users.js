const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true }, // Ajout du champ nom
  email: { type: String, required: true, unique: true },
  allergies: { type: String, default: null }, // Ajout du champ allergies
  password: { type: String, required: true } // Renommé mdp en password pour la cohérence
});

module.exports = mongoose.model('User', userSchema);
