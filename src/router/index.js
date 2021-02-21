import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import SplashScreen from '../pages/SplashScreen'
import SignUp from '../pages/SignUp'
import SignIn from '../pages/SignIn'
import ForgotPassword from '../pages/ForgotPassword'
import Home from '../pages/Home'
import MovieDetail from '../pages/MovieDetail'
import Order from '../pages/Order'
import Payment from '../pages/Payment'
import Ticket from '../pages/Ticket'
import Profile from '../pages/Profile'
import Navbar from '../components/Navbar'

const Stack = createStackNavigator()

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}} />
      <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}} />
      <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false}} />
      <Stack.Screen name="Home" component={Home} options={{header: props => <Navbar {...props} />}} />
      <Stack.Screen name="Details" component={MovieDetail} options={{header: props => <Navbar {...props} />}} />
      <Stack.Screen name="Order" component={Order} options={{header: props => <Navbar {...props} />}} />
      <Stack.Screen name="Payment" component={Payment} options={{header: props => <Navbar {...props} />}} />
      <Stack.Screen name="Ticket" component={Ticket} options={{header: props => <Navbar {...props} />}} />
      <Stack.Screen name="Profile" component={Profile} options={{header: props => <Navbar {...props} />}} />
    </Stack.Navigator>
  )
}

export default Router
