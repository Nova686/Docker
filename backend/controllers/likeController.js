module.exports = (pool) => {
    // Like
    const likeImage = async (req, res) => {
      try {
        const userId = req.user.userId; // Récupéré depuis le token
        const imageId = req.params.id;
  
        // Vérifier s'il existe déjà un like/dislike
        const existing = await pool.query(
          'SELECT * FROM likes WHERE user_id = $1 AND image_id = $2',
          [userId, imageId]
        );
  
        if (existing.rows.length > 0) {
          // Mettre à jour la valeur like_type à true
          await pool.query(
            'UPDATE likes SET like_type = $1 WHERE user_id = $2 AND image_id = $3',
            [true, userId, imageId]
          );
          return res.json({ message: 'Like mis à jour' });
        } else {
          // Insérer un nouveau like
          await pool.query(
            'INSERT INTO likes (user_id, image_id, like_type) VALUES ($1, $2, $3)',
            [userId, imageId, true]
          );
          return res.json({ message: 'Like enregistré' });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur serveur' });
      }
    };
  
    // Dislike
    const dislikeImage = async (req, res) => {
      try {
        const userId = req.user.userId;
        const imageId = req.params.id;
  
        const existing = await pool.query(
          'SELECT * FROM likes WHERE user_id = $1 AND image_id = $2',
          [userId, imageId]
        );
  
        if (existing.rows.length > 0) {
          // Mettre à jour la valeur like_type à false
          await pool.query(
            'UPDATE likes SET like_type = $1 WHERE user_id = $2 AND image_id = $3',
            [false, userId, imageId]
          );
          return res.json({ message: 'Dislike mis à jour' });
        } else {
          // Insérer un nouveau dislike
          await pool.query(
            'INSERT INTO likes (user_id, image_id, like_type) VALUES ($1, $2, $3)',
            [userId, imageId, false]
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