import { useState, createContext, ReactNode, useEffect } from 'react'

import { ToastAndroid } from 'react-native'

import { JWT_SECRET } from '@env'

import AsyncStorage from '@react-native-async-storage/async-storage'

import api from '../api'

interface UserProps {
  id: string
  name: string
  email: string
  token: string
}

interface SignInPros {
  email: string
  password: string
} 

interface AuthContextData {
  user: UserProps
  isAuthenticated: boolean
  loadingAuth: boolean
  loading: boolean
  signIn: (credentials: SignInPros) => Promise<void>
  signOut: () => Promise<void>
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

  const [loadingAuth, setLoadingAuth] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  const isAuthenticated = !!user.name

  useEffect(() => {
    async function getUser() {
      const userInfo = await AsyncStorage.getItem(JWT_SECRET)

      const hasUser: UserProps = JSON.parse(userInfo || '{}')

      if (Object.keys(hasUser).length > 0) {
        api.defaults.headers.common.Authorization = `Bearer ${hasUser.token}`

        setUser({
          id: hasUser.id,
          name: hasUser.name,
          email: hasUser.email,
          token: hasUser.token
        })
      }

      setLoading(false)

    }

    getUser()
  }, [])

  async function signIn({email, password}: SignInPros) {
    setLoadingAuth(true)    

    try {
      const response = await api.post('/login', {email, password})

      const { id, name, token} = response.data

      const data = {
        ...response.data
      }

      await AsyncStorage.setItem(JWT_SECRET, JSON.stringify(data))

      api.defaults.headers.common.Authorization = `Bearer ${token}`

      setUser({
        id,
        name,
        email,
        token
      })     
      
      setLoadingAuth(false)
    } catch (error) {
      ToastAndroid.show('Email or password invalid', ToastAndroid.SHORT)
      setLoadingAuth(false)
    }
  }

  async function signOut() {
    await AsyncStorage.clear().then(() => {
      setUser({
        id: '',
        name: '',
        email: '',
        token: ''
      })
    })
  }

  return (
    <AuthContext.Provider 
      value={{
        isAuthenticated, 
        user, 
        signIn, 
        loading, 
        loadingAuth, 
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>

  )
}