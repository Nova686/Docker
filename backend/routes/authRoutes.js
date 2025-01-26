const express = require('express');
const router = express.Router();

module.exports = (pool) => {
  const { register, login } = require('../controllers/authController')(pool);

  router.post('/register', register);

  router.post('/login', login);

  return router;
};