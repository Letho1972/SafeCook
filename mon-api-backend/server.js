require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Remplacez <UTILISATEUR> et <MOTDEPASSE> par vos identifiants MongoDB Atlas
const MONGO_URI = 'mongodb+srv://9184:f9XGDwYrIBnUnNkw@cluster0.ufblf.mongodb.net/authentification_users?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connecté'))
  .catch(err => console.error(err));

app.use('/api', authRoutes);

app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});