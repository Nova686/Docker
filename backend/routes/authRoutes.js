const express = require('express');
const router = express.Router();

module.exports = (pool) => {
  const { register, login } = require('../controllers/authController')(pool);

  // 3) Route d’inscription
  router.post('/register', register);

  // 4) Route de connexion
  router.post('/login', login);

  return router;
};