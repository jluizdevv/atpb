import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TelaLogin from './components/Login';
import CadastroUsuario from './components/CadastroUsuario';
import TelaEstagiarios from './components/Estagiarios';
import CadastroEstagiario from './components/CadastroEstagiario';
import EditarEstagiario from './components/EditarEstagiario';

function App() {
  return (
    <div className="app">
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<TelaLogin />} />
        <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
        <Route path="/estagiarios" element={<TelaEstagiarios />} />
        <Route path="/cadastrar-estagiario" element={<CadastroEstagiario />} />
        <Route path="/editar-estagiario/:id" element={<EditarEstagiario />} />

      </Routes>
    </Router>
    </div>
  );
}

export default App;
