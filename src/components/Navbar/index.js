import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Logo from '../../assets/images/logo.svg'
import Menu from '../../assets/icons/ic-menu.svg'

const Navbar = () => {
  return (
    <View style={styles.row}>
      <Logo />
      <Menu />
    </View>
  )
}

export default Navbar

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 33
  }
})
