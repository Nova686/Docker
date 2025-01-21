import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/auth/login', {
        email,
        password
      });
      // Enregistrer le token dans le Local Storage ou un cookie
      localStorage.setItem('token', res.data.token);
      setMessage('Connexion réussie !');
    } catch (error) {
      setMessage('Erreur de connexion');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input 
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;