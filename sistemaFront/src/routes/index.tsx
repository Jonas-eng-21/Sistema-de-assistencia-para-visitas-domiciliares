import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Principal from "../pages/principal";
import { ProtectedRoute } from "./ProtectedRoute";
import ListagemPaciente from "../pages/ListagemPaciente";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/principal" element={<Principal />} />
        {/* Outras rotas virão aqui futuramente */}
        {/* <Route path="listagem" element={<ListagemPaciente />} /> */}
        <Route
          path="/listagem"
          element={
            <ProtectedRoute>
              <ListagemPaciente />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
