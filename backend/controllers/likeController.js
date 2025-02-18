module.exports = (pool) => {
  const likeImage = async (req, res) => {
    try {
      const userId = req.user.userId;
      const imageUrl = req.body.url;

      const existing = await pool.query(
        'SELECT * FROM likes WHERE user_id = $1 AND url = $2',
        [userId, imageUrl]
      );

      if (existing.rows.length > 0) {
        await pool.query(
          'UPDATE likes SET like_type = $1 WHERE user_id = $2 AND url = $3',
          [true, userId, imageUrl]
        );
        return res.json({ message: 'Like mis à jour' });
      } else {
        await pool.query(
          'INSERT INTO likes (user_id, url, like_type) VALUES ($1, $2, $3)',
          [userId, imageUrl, true]
        );
        return res.json({ message: 'Like enregistré' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  };

  const dislikeImage = async (req, res) => {
    try {
      const userId = req.user.userId;
      const imageUrl = req.body.url;

      const existing = await pool.query(
        'SELECT * FROM likes WHERE user_id = $1 AND url = $2',
        [userId, imageUrl]
      );

      if (existing.rows.length > 0) {
        await pool.query(
          'UPDATE likes SET like_type = $1 WHERE user_id = $2 AND url = $3',
          [false, userId, imageUrl]
        );
        return res.json({ message: 'Dislike mis à jour' });
      } else {
        await pool.query(
          'INSERT INTO likes (user_id, url, like_type) VALUES ($1, $2, $3)',
          [userId, imageUrl, false]
        );
        return res.json({ message: 'Dislike enregistré' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  };

  return {
    likeImage,
    dislikeImage
  };
};