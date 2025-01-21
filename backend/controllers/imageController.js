module.exports = (pool) => {
    const getImages = async (req, res) => {
      try {
        const result = await pool.query('SELECT * FROM images ORDER BY id DESC');
        return res.json(result.rows);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur serveur' });
      }
    };
  
    return {
      getImages
    };
  };  