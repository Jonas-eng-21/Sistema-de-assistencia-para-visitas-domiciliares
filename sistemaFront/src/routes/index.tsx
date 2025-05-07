import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/home'

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Outras rotas virão aqui futuramente */}
      </Routes>
    </BrowserRouter>
  )
}
