import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Logo from '../../assets/images/logo.svg'

const Header = ({title, subTitle}) => {
  return (
    <View>
      <Logo />
      <Text style={styles.title}>{title}</Text>
      {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontFamily: 'Mulish-Medium',
    color: '#121212',
    marginTop: 46
  },
  subTitle: {
    fontSize: 15,
    fontFamily: 'Mulish-Regular',
    color: '#8692A6',
    marginTop: 10
  }
})
