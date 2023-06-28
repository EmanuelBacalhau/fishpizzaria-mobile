import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Dashboard from '../pages/Dashboard'

const Stack = createNativeStackNavigator()

export default function AuthRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Dashboard' component={Dashboard} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}