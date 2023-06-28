import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native'

import AuthProvider from './src/contexts/AuthContext';

import Routes from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor='black' style='dark' translucent={false}/>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}

