import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { auth } from '../services/firebase';
import './css/styles.css';


function TelaLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      // Login bem-sucedido
      setLoggedIn(true);
    } catch (error) {
        setError('Não existe uma empresa correspondente a este email. Verificar no setor responsável, se o cadastro foi feito.');

    }
  };

  if (isLoggedIn) {
    return <Navigate to="/estagiarios" />;
  }

  return (
    <div>
      <h1>Entrar com os dados da sua empresa</h1>
      {error && <p>{error}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
      />
      <button onClick={handleLogin}>Login</button>
      <p>Não tem uma conta? <Link to="/cadastro-usuario"className="link-cadastrar-usuario">Cadastrar</Link></p>
    </div>
  );
}

export default TelaLogin;
