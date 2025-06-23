import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import { useAuthStore } from './app/store'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'

const queryClient = new QueryClient()

export default function App() {

  const hydrated = useAuthStore((state) => state.hasHydrated)

  if (!hydrated) return null

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
