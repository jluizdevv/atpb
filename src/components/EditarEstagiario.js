import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { firestore } from '../services/firebase';

function EditarEstagiario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [idade, setIdade] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [areaPretendida, setAreaPretendida] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const estagiarioRef = firestore.collection('estagiarios').doc(id);
      const snapshot = await estagiarioRef.get();

      if (snapshot.exists) {
        const data = snapshot.data();
        setNome(data.nome);
        setTelefone(data.telefone);
        setIdade(data.idade);
        setEndereco(data.endereco);
        setCidade(data.cidade);
        setEstado(data.estado);
        setAreaPretendida(data.areaPretendida);
      } else {
        // Estagiário não encontrado, redirecionar para a página de estagiários
        navigate('/estagiarios');
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Atualizar os dados do estagiário no Firestore
    const estagiarioRef = firestore.collection('estagiarios').doc(id);
    await estagiarioRef.update({
      nome,
      telefone,
      idade,
      endereco,
      cidade,
      estado,
      areaPretendida,
    });

    // Redirecionar de volta para a página de estagiários
    navigate('/estagiarios');
  };

  return (
    <div>
      <h1>Editar Estagiário</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>
        <label>
          Telefone:
          <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        </label>
        <label>
          Idade:
          <input type="text" value={idade} onChange={(e) => setIdade(e.target.value)} />
        </label>
        <label>
          Endereço:
          <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
        </label>
        <label>
          Cidade:
          <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} />
        </label>
        <label>
          Estado:
          <input type="text" value={estado} onChange={(e) => setEstado(e.target.value)} />
        </label>
        <label>
          Área Pretendida:
          <input type="text" value={areaPretendida} onChange={(e) => setAreaPretendida(e.target.value)} />
        </label>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default EditarEstagiario;
