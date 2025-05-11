import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/home'
import Principal from '../pages/principal'

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/principal" element={<Principal />} />
        {/* Outras rotas virão aqui futuramente */}
      </Routes>
    </BrowserRouter>
  )
}
