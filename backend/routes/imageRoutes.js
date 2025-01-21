const express = require('express');
const router = express.Router();

module.exports = (pool) => {
  const { getImages } = require('../controllers/imageController')(pool);

  // 5) Route de récupération des images
  router.get('/', getImages);

  return router;
};
