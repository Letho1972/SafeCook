require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/voisin', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connecté'))
  .catch(err => console.error(err));

app.use('/api', authRoutes);

app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});