import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen.js'
import PickUpScreen from './screens/PickUpScreen.js';
import CartScreen from './screens/CartScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import RegisterScreen from './screens/RegisterScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import OrderScreen from './screens/OrderScreen.js';

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown : false}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown : false}}/>
        <Stack.Screen name="PickUp" component={PickUpScreen} options={{headerShown : false}}/>
        <Stack.Screen name="Cart" component={CartScreen} options={{headerShown : false}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown : false}}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown : false}}/>
        <Stack.Screen name="Order" component={OrderScreen} options={{headerShown : false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator