import { useContext, useState } from 'react'

import { 
  Text,
  View, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput, 
  ToastAndroid 
} from "react-native";

import { LogOut } from 'lucide-react-native'

import { AuthContext } from '../../contexts/AuthContext';

import { useNavigation } from '@react-navigation/native'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamsList } from '../../routes/AuthRoutes'

import api from '../../api';

export default function Dashboard() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

  const { signOut } = useContext(AuthContext)
  
  const [name, setName] = useState<string>('') 
  const [tableNumber, setTableNumber] = useState<string>('')

  function handleSignOut() {
    signOut()
  }

  async function handleSendDate() {
    if(tableNumber === '') {
      ToastAndroid.show('Number is required', ToastAndroid.SHORT)
      return
    }

    const response = await api.post('/order', { table: Number(tableNumber), name})

    navigation.navigate('Order', {
      table: response.data.table,
      orderId: response.data.id
    })

    setName('')
    setTableNumber('')
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerBtn}>
        <TouchableOpacity onPress={handleSignOut}>
          <LogOut size={25} color='white' />
        </TouchableOpacity>
      </View>
      <View style={styles.containerSection}>
        <View style={styles.containerInput}>
          <Text style={styles.inputText}>New order</Text>
          <TextInput 
            placeholder='Name' 
            style={styles.input} 
            keyboardType='default' 
            secureTextEntry={false}
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput 
            placeholder='Table number' 
            style={styles.input} 
            keyboardType='numeric' 
            secureTextEntry={false}
            value={tableNumber}
            onChangeText={(text) => setTableNumber(text)}
          />
          <TouchableOpacity style={styles.button} onPress={handleSendDate}>
            <Text style={styles.buttonText}>
              Open table
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1, 
    padding: 20,
  },
  containerBtn: {
    alignItems: 'flex-end',
    backgroundColor: 'black'
  },
  containerSection: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerInput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    gap: 8
  },
  inputText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40
  },
  input: {
    height: 40,
    backgroundColor: 'white',
    color: 'black',
    width: '95%',
    paddingHorizontal: 8,
    borderRadius: 4
  },
  button: {
    backgroundColor: '#42FF00',
    width: '95%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black'
  }
})