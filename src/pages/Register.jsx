import { AuthForm } from '../features/auth/AuthForm'
import { useRegister } from '../features/auth/api'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()
  const register = useRegister()

  return (
    <div style={{ maxWidth: 400, margin: 'auto', marginTop: 80 }}>
      <h2>Register</h2>
      <AuthForm
        onSubmit={(values) => register.mutate(values, { onSuccess: () => navigate('/login') })}
        isLoading={register.isLoading}
        isRegister
      />
    </div>
  )
}
