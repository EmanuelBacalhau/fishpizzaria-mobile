import { useState, createContext, ReactNode } from 'react'

interface UserProps {
  id: string
  name: string
  email: string
  token: string
}

interface AuthContextData {
  user: UserProps
  isAuthenticated: boolean
}

export const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({
    id: '',
    name: '',
    email: '',
    token: ''
  })

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{isAuthenticated, user}}>
      {children}
    </AuthContext.Provider>

  )
}