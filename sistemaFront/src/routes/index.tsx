import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Principal from "../pages/principal";
import { ProtectedRoute } from "./ProtectedRoute";
import ListagemPaciente from "../pages/ListagemPaciente";
import Cadastro from "../pages/cadastroUser";
import { useAuth } from "../context/AuthContext";
import CadastroProfissional from "../pages/cadastroProfissional";
import CadastroPaciente from "../pages/cadastroPaciente";
import EditarPaciente from "../pages/editarPaciente";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import ListagemProffissionais from "../pages/ListagemProffissionais";
import EditarProfissional from "../pages/editarProfissional";
import AgendarVisita from "../pages/agendamento";
import Calendario from "../pages/calendario";

export const AppRoutes = () => {
  const { isLoggedIn, isReady } = useAuth();
  if (!isReady) return null;

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn() ? <Navigate to="/principal" replace /> : <Login />
        }
      />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
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

      <Route
        path="/listagemProfissionais"
        element={
          <ProtectedRoute>
            <ListagemProffissionais />
          </ProtectedRoute>
        }
      />

      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route
        path="/cadastro-de-Profissional"
        element={
          <ProtectedRoute>
            <CadastroProfissional />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cadastro-de-Paciente"
        element={
          <ProtectedRoute>
            <CadastroPaciente />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agendar-visita"
        element={
          <ProtectedRoute>
            <AgendarVisita />
          </ProtectedRoute>
        }
      />
      <Route
        path="/editar-paciente"
        element={
          <ProtectedRoute>
            <EditarPaciente />
          </ProtectedRoute>
        }
      />
      <Route
        path="/editar-profissional"
        element={
          <ProtectedRoute>
            <EditarProfissional />
          </ProtectedRoute>
        }
      />
      <Route
        path="/calendario"
        element={
          <ProtectedRoute>
            <Calendario />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
