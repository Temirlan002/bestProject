import { useEffect } from 'react'
import api from '../shared/apiClient'

export default function Profile() {
  useEffect(() => {
    api.get('/profile') 
      .then(res => console.log('PROFILE:', res.data))
      .catch(err => console.error('ERR:', err))
  }, [])

  return <h2>Profile Page</h2>
}
