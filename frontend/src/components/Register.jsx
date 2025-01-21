import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/auth/register', { email, password });
      setMessage('Inscription réussie !');
    } catch {
      setMessage('Erreur lors de l’inscription');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Register</h2>
      <form className="mx-auto" style={{ maxWidth: '400px' }} onSubmit={handleSubmit}>
        <div className="mb-3">
          <input 
            type="email" 
            className="form-control" 
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <input 
            type="password" 
            className="form-control" 
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">S’inscrire</button>
      </form>
      {message && <p className="text-center mt-3">{message}</p>}
    </div>
  );
}

export default Register;