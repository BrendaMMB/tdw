import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Principal() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

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
    <div>
      <h1>Página Principal</h1>
      <p><strong>Nome:</strong> {userData.nome}</p>
      <p><strong>Sobrenome:</strong> {userData.sobrenome}</p>
      <p><strong>Data de Nascimento:</strong> {userData.dataNascimento}</p>
    </div>
  );
}