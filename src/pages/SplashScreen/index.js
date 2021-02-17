import React, { useEffect } from 'react'
import {View} from 'react-native'
import Logo from '../../assets/images/logo.svg'

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('SignUp')
    }, 2000)
  }, [])
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Logo />
    </View>
  )
}

export default SplashScreen
