import { useState, useContext} from "react";

import { 
  Image, 
  StyleSheet, 
  TextInput, 
  View, 
  TouchableOpacity, 
  Text,
  ActivityIndicator,
  ToastAndroid
} from "react-native";

import { AuthContext } from "../../contexts/AuthContext";

export default function SignIn() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { signIn, loadingAuth } = useContext(AuthContext)

  async function sendData() {
    if(email.trim() === '' || password.trim() === '') {
      ToastAndroid.show("Email/Password is required", ToastAndroid.SHORT)
      return
    }
    
    const data = {
      email,
      password
    }

    await signIn(data)
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} alt="Logo FishPizzaria"/>

      <View style={styles.containerInput}>
        <TextInput 
          value={email}
          onChangeText={(value) => setEmail(value)}
          placeholder="Type your email" 
          style={styles.input}
        />
        <TextInput 
          value={password}
          onChangeText={(value) => setPassword(value)}
          placeholder="Type your password" 
          style={styles.input} 
          secureTextEntry={true}
        />
        <TouchableOpacity 
          style={styles.button} 
          onPress={sendData} 
          disabled={loadingAuth ? true : false}
        >
          {
            loadingAuth ? (
              <ActivityIndicator size={16} color="white" />
            )
            : (
              <Text style={styles.buttonText}>
                ACCESS
              </Text>
            )
          }
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: "center",
    justifyContent: 'center',
    gap: 24
  },
  containerInput: {
    gap: 8,
    width: '95%',
    justifyContent: "center",
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    color: 'black',
    width: '85%',
    height: 40,
    paddingHorizontal: 8,
    borderRadius: 4
  },
  button: {
    backgroundColor: '#42FF00',
    width: '85%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black'
  },
})