require('dotenv').config(); // Pour charger les variables d'environnement
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

// Import des routes
const authRoutes = require('./routes/authRoutes');
const imageRoutes = require('./routes/imageRoutes');
const likeRoutes = require('./routes/likeRoutes');

const app = express();
const port = process.env.PORT || 4000;

// 1) Connexion à PostgreSQL
//    Utilise les variables d'environnement (fichier .env ou Docker)
const pool = new Pool({
  host: process.env.DB_HOST,       
  user: process.env.DB_USER,       
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// Middleware globaux
app.use(express.json());
app.use(cors());

// Association des routes à l'application, en transmettant "pool" si nécessaire
app.use('/auth', authRoutes(pool));
app.use('/images', imageRoutes(pool));
app.use('/images', likeRoutes(pool));

// Lancement du serveur
app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});