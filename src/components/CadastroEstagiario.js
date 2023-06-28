import React, { useState } from 'react';
import { firestore, auth } from '../services/firebase';
import { Link, useNavigate } from 'react-router-dom';

function CadastroEstagiario() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [idade, setIdade] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [areaPretendida, setAreaPretendida] = useState('');
  const [cep, setCep] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;

      
      await firestore.collection('estagiarios').add({
        userId,
        nome,
        telefone,
        idade,
        endereco,
        cidade,
        estado,
        areaPretendida,
      });

      
      navigate('/estagiarios');
    }
  };

  const fetchAddress = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setCidade(data.localidade);
        setEstado(data.uf);
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const handleCepChange = (e) => {
    setCep(e.target.value);
  };

  return (
    <div>
      <h1>Cadastro de Estagiário</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="telefone">Telefone:</label>
          <input type="text" id="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="idade">Idade:</label>
          <input type="text" id="idade" value={idade} onChange={(e) => setIdade(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="cep">CEP:</label>
          <input type="text" id="cep" value={cep} onChange={handleCepChange} onBlur={fetchAddress} required />
        </div>
        <div>
          <label htmlFor="endereco">Endereço:</label>
          <input type="text" id="endereco" value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="cidade">Cidade:</label>
          <input type="text" id="cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="estado">Estado:</label>
          <input type="text" id="estado" value={estado} onChange={(e) => setEstado(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="areaPretendida">Área Pretendida:</label>
          <input type="text" id="areaPretendida" value={areaPretendida} onChange={(e) => setAreaPretendida(e.target.value)} required />
        </div>
        <div>
          <button type="submit">Cadastrar</button>
        </div>
      </form>
      <Link to="/estagiarios" className="link-exibir-estagiarios">Exibir os Estagiários Cadastrados</Link>
    </div>
  );
}

export default CadastroEstagiario;
