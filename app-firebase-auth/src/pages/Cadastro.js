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
      const userCred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.senha
      );
      const uid = userCred.user.uid;
      await setDoc(doc(db, 'users', uid), {
        nome: form.nome,
        sobrenome: form.sobrenome,
        dataNascimento: form.dataNascimento,
        uid
      });
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Cadastro</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="E-mail"
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
      <p>
        Já tem conta? <Link to="/login">Faça login aqui</Link>
      </p>
    </div>
  );
}
