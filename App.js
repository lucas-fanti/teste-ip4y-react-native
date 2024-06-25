import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ListScreen from './screens/ListScreen';
import EditScreen from './screens/EditScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="List" component={ListScreen} options={{ title: 'Lista de Usuários' }} />
        <Stack.Screen name="Edit" component={EditScreen} options={{ title: 'Editar Usuário' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
