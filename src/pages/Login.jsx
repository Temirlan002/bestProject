import { AuthForm } from '../features/auth/AuthForm'
import { useLogin } from '../features/auth/api'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const login = useLogin()

  return (
    <div style={{ maxWidth: 400, margin: 'auto', marginTop: 80 }}>
      <h2>Login</h2>
      <AuthForm
        onSubmit={(values) => login.mutate(values, { onSuccess: () => navigate('/profile') })}
        isLoading={login.isLoading}
      />
    </div>
  )
}
