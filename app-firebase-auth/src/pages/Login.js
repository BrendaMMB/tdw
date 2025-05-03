// src/pages/Login.js
import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate('/principal');
    } catch (err) {
      // Mapa de códigos → mensagens em PT-BR
      const traduzir = {
        'auth/invalid-email':      'O formato do e-mail é inválido.',
        'auth/user-disabled':      'Esta conta foi desativada.',
        'auth/user-not-found':     'Usuário não encontrado.',
        'auth/wrong-password':     'Senha incorreta.',
        // outros erros que quiser tratar...
      };
      // usa a tradução ou uma mensagem genérica
      const mensagem =
        traduzir[err.code] || 'Usuário ou senha incorretos.';
      setError(mensagem);
    }
  };

  return (
    <div className="auth-container">
      {/* coloque um logo em public/logo.png */}
      <img src="/logo2.png" alt="BMMB Logo" className="logo" />
      <h1>Entrar</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Endereço de e-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
      <p className="link-text">
        Não tem conta? <Link to="/cadastro">Cadastre-se aqui</Link>
      </p>
    </div>
  );
}
