import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import SplashScreen from '../pages/SplashScreen'
import SignUp from '../pages/SignUp'
import SignIn from '../pages/SignIn'
import ForgotPassword from '../pages/ForgotPassword'

const Stack = createStackNavigator()

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}} />
      <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}} />
      <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword}  options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

export default Router
