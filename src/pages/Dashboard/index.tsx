import { useContext } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

import { AuthContext } from '../../contexts/AuthContext';

export default function Dashboard() {
  const { signOut } = useContext(AuthContext)

  function handleSignOut() {
    signOut()
  }

  return (
    <View>
      <Text>Bem-vindo ao dashboard</Text>
      <TouchableOpacity style={styles.signOut} onPress={handleSignOut}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  signOut: {
    backgroundColor: 'red',
    padding: 10
  }
})