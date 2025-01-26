const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (pool) => {
  const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Accès refusé, token manquant' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'defaultSecret', (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token invalide' });
      }
      req.user = user;
      next();
    });
  };

  const register = async (req, res) => {
    try {
      const { email, password } = req.body;
      const checkUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (checkUser.rows.length > 0) {
        return res.status(400).json({ message: 'Email déjà utilisé' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await pool.query(
        'INSERT INTO users (email, password) VALUES ($1, $2)',
        [email, hashedPassword]
      );

      return res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
      console.error("register",error);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  };

  const login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (userResult.rows.length === 0) {
        return res.status(400).json({ message: 'Identifiants invalides' });
      }

      const user = userResult.rows[0];

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({ message: 'Identifiants invalides' });
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || 'defaultSecret',
        { expiresIn: '1h' }
      );

      return res.json({ message: 'Connexion réussie', token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  };

  return {
    authenticateToken,
    register,
    login
  };
};