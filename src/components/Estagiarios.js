import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../services/firebase';
import { Link, Navigate } from 'react-router-dom';
import './css/styles.css';

function Estagiarios() {
  const [estagiarios, setEstagiarios] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        setUserEmail(user.email);

        const snapshot = await firestore
          .collection('estagiarios')
          .where('userId', '==', user.uid)
          .get();

        const estagiariosData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setEstagiarios(estagiariosData);
      } else {
        // User is not logged in, redirect to the login page
        setShouldRedirect(true);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    setShouldRedirect(true);
  };

  const handleDelete = async (estagiarioId) => {
    try {
      await firestore.collection('estagiarios').doc(estagiarioId).delete();
      setEstagiarios((prevEstagiarios) =>
        prevEstagiarios.filter((estagiario) => estagiario.id !== estagiarioId)
      );
    } catch (error) {
      console.error('Error deleting estagiario:', error);
    }
  };

  if (shouldRedirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Estagiários cadastrados para o programa da Empresa</h1>
      <p>Usuário conectado: {userEmail}</p>
      {estagiarios.length === 0 ? (
        <p>Nenhum estagiário cadastrado.</p>
      ) : (
        <ul className="estagiarios-list">
          {estagiarios.map((estagiario) => (
            <li className="estagiarios-list-item" key={estagiario.id}>
              <p>Nome: {estagiario.nome}</p>
              <p>Telefone: {estagiario.telefone}</p>
              <p>Idade: {estagiario.idade}</p>
              <p>Endereço: {estagiario.endereco}</p>
              <p>Cidade: {estagiario.cidade}</p>
              <p>Estado: {estagiario.estado}</p>
              <p>Área Pretendida: {estagiario.areaPretendida}</p>
              <div className="estagiarios-list-item-actions">
                <Link
                  to={`/editar-estagiario/${estagiario.id}`}
                  className="editar-estagiario-link"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(estagiario.id)}
                  className="excluir-estagiario-button"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Link to="/cadastrar-estagiario" className="link-cad-estagiario">
        Cadastrar um novo Estagiário
      </Link>
      <p>
        <button onClick={handleLogout}>Logout</button>
      </p>
    </div>
  );
}

export default Estagiarios;
