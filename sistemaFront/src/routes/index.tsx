import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Principal from "../pages/principal";
import { ProtectedRoute } from "./ProtectedRoute";
import ListagemPaciente from "../pages/ListagemPaciente";

export const AppRoutes = () => {
  return (

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/principal" element={<Principal />} />
        <Route
          path="/listagem"
          element={
            <ProtectedRoute>
              <ListagemPaciente />
            </ProtectedRoute>
          }
        />
      </Routes>
  );
};
