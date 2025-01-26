require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const authRoutes = require('./routes/authRoutes');
const likeRoutes = require('./routes/likeRoutes');

const app = express();
const port = process.env.PORT || 4000;

const pool = new Pool({
  host: process.env.DB_HOST,  
  user: process.env.DB_USER,       
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port:5432
});

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes(pool));
app.use('/images', likeRoutes(pool));

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend running on port ${port}`);
});