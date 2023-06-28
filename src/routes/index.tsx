import { useContext } from 'react'

import { View, ActivityIndicator, StyleSheet } from 'react-native'

import AuthRoutes from './AuthRoutes'
import NoAuthRoutes from './NoAuthRoutes'

import { AuthContext } from '../contexts/AuthContext'

export default function Routes() {
  const { isAuthenticated, loading } = useContext(AuthContext)

  if(loading) {
    return (
      <View style={styles.isLoading}>
        <ActivityIndicator size={'large'} color={'white'} animating={true}/>
      </View>
    )
  }

  return !isAuthenticated ? <NoAuthRoutes/> : <AuthRoutes/> 
}

const styles = StyleSheet.create({
  isLoading: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  }
})