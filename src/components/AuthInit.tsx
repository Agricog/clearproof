import { useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { setAuthGetter } from '../services/api'

export default function AuthInit() {
  const { getToken } = useAuth()

  useEffect(() => {
    setAuthGetter(getToken)
  }, [getToken])

  return null
}
