import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Principal from "../pages/principal";
import { ProtectedRoute } from "./ProtectedRoute";
import ListagemPaciente from "../pages/ListagemPaciente";
import Cadastro from "../pages/cadastroUser";
import Agendamento from "../pages/agendamento";
import ForgotPassword from './pages/ForgotPassword';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route
        path="/principal"
        element={
          <ProtectedRoute>
            <Principal />
          </ProtectedRoute>
        }
      />
      <Route
        path="/listagem"
        element={
          <ProtectedRoute>
            <ListagemPaciente />
          </ProtectedRoute>
        }
      />
      <Route path="/agendar-visita" element={<ProtectedRoute><Agendamento /></ProtectedRoute>} />
        
      <Route path="/forgot-password" element={<ForgotPassword />} />
        
    </Routes>
  );
};
