import { View, ActivityIndicator, StyleSheet } from 'react-native'

import AuthRoutes from './AuthRoutes'
import NoAuthRoutes from './NoAuthRoutes'

export default function Routes() {
  const isAuthenticated = false
  const loading = false

  if(loading) {
    return (
      <View style={styles.isLoading}>
        <ActivityIndicator size={'large'} color={'white'} animating={true}/>
      </View>
    )
  }

  return isAuthenticated ? <AuthRoutes /> : <NoAuthRoutes/>
}

const styles = StyleSheet.create({
  isLoading: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  }
})