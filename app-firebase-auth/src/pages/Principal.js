// src/pages/Principal.js
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Principal() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Desloga e redireciona para o Login
  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  // Busca os dados do usuário logado
  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) return navigate('/login');
      const docSnap = await getDoc(doc(db, 'users', user.uid));
      if (docSnap.exists()) setUserData(docSnap.data());
    };
    fetchData();
  }, [navigate]);

  if (!userData) return <p>Carregando...</p>;

  return (
    <div className="auth-container">
      <img src="/logo2.png" alt="Brenda Logo" className="logo" />
      <h1>Bem-vindo(a), {userData.nome}!</h1>
      <p><strong>Nome:</strong> {userData.nome}</p>
      <p><strong>Sobrenome:</strong> {userData.sobrenome}</p>
      <p><strong>Data de Nascimento:</strong> {userData.dataNascimento}</p>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}
