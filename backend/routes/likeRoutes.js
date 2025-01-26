const express = require('express');
const router = express.Router();

module.exports = (pool) => {
  const { authenticateToken } = require('../controllers/authController')(pool);
  const { likeImage, dislikeImage } = require('../controllers/likeController')(pool);

  router.post('/:id/like', authenticateToken, likeImage);
  router.post('/:id/dislike', authenticateToken, dislikeImage);

  return router;
};