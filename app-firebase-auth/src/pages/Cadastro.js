// src/pages/Cadastro.js
import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';

export default function Cadastro() {
  const [form, setForm] = useState({
    email: '',
    senha: '',
    nome: '',
    sobrenome: '',
    dataNascimento: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.senha
      );
      await setDoc(doc(db, 'users', user.uid), {
        nome: form.nome,
        sobrenome: form.sobrenome,
        dataNascimento: form.dataNascimento,
        uid: user.uid
      });
      navigate('/login');
    } catch (err) {
      // mapa de códigos de erro → mensagens em PT-BR
      const traduzir = {
        'auth/weak-password':         'A senha deve ter, no mínimo, 6 caracteres.',
        'auth/email-already-in-use':  'Este e-mail já está em uso.',
        'auth/invalid-email':         'O formato do e-mail é inválido.',
        'auth/user-disabled':         'Esta conta foi desativada.',
        'auth/user-not-found':        'Usuário não encontrado.',
        'auth/wrong-password':        'Senha incorreta.',
        // adicione outros códigos conforme achar necessário
      };
  
      // usa a tradução se existir, senão exibe a mensagem original
      const mensagem = traduzir[err.code] || err.message;
      setError(mensagem);
    }
  };
  

  return (
    <div className="auth-container">
      <img src="/logo2.png" alt="BMMB Logo" className="logo" />
      <h1>Criar conta</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Endereço de e-mail"
          onChange={handleChange}
          required
        />
        <input
          name="senha"
          type="password"
          placeholder="Senha"
          onChange={handleChange}
          required
        />
        <input
          name="nome"
          type="text"
          placeholder="Nome"
          onChange={handleChange}
          required
        />
        <input
          name="sobrenome"
          type="text"
          placeholder="Sobrenome"
          onChange={handleChange}
          required
        />
        <input
          name="dataNascimento"
          type="date"
          onChange={handleChange}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
      <p className="link-text">
        Já tem conta? <Link to="/login">Faça login aqui</Link>
      </p>
    </div>
  );
}
