import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/home'
import Principal from '../pages/principal'
import Agendamento from '../pages/agendamento'

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/agendar-visita" element={<Agendamento />} />
        {/* Outras rotas virão aqui futuramente */}
      </Routes>
    </BrowserRouter>
  )
}
