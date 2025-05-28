import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Principal from "../pages/principal";
import { ProtectedRoute } from "./ProtectedRoute";
import ListagemPaciente from "../pages/ListagemPaciente";
import Cadastro from "../pages/cadastroUser";
import { useAuth } from "../context/AuthContext";
import CadastroProfissional from "../pages/cadastroProfissional";

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
        path="/cadastro-de-Profissional"
        element={
          <ProtectedRoute>
            <CadastroProfissional />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
