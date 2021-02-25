import React, { Component } from 'react'
import { Image, StyleSheet, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Button from '../Button'
import { connect } from 'react-redux'
import { logout } from '../../redux/actions/auth'
import { clearOrder } from '../../redux/actions/order'
// import {REACT_APP_API_URL as API_URL} from '@env'
import {REACT_APP_API_URL as API_URL} from '@env'

import Logo from '../../assets/images/logo.svg'
import Menu from '../../assets/icons/ic-menu.svg'
import Profile from '../../assets/images/profile.jpg'

class Navbar extends Component {
  state = {
    headerShown: false
  }
  show = () => {
    this.setState({ headerShown: !this.state.headerShown })
  }
  signOut = async () => {
    await this.props.clearOrder()
    await this.props.logout()
    this.props.navigation.reset({index: 0, routes: [{name: 'SignIn'}]})
  }
  render() {
    return (
      <View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => this.props.navigation.reset({index: 0, routes: [{name: 'Home'}]})}>
            <Logo />
          </TouchableOpacity>
          {this.props.auth.token ? (this.props.auth.user.image === null ? <TouchableOpacity onPress={() => this.show()}><Image source={Profile} style={styles.profile} /></TouchableOpacity> : <TouchableOpacity onPress={() => this.show()}><Image source={{uri: `${API_URL}uploads/users/${this.props.auth.user.image}`}} style={styles.profile} /></TouchableOpacity>) : <TouchableOpacity onPress={() => this.show()}><Menu /></TouchableOpacity>}
        </View>
        {this.state.headerShown && (<View style={styles.menu}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
            <Text style={styles.textMenu}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.signOut()}>
            <Button text="Sign Out" padding={5} />
          </TouchableOpacity>
        </View>)}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = { logout, clearOrder }

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

const styles = StyleSheet.create({
  parent: {
    position: 'relative'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 15,
    elevation: 1,
    backgroundColor: 'white'
  },
  profile: {
    width: 40, 
    height: 40, 
    borderRadius: 20,
    resizeMode: 'cover'
  },
  menu: {
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    bottom: -90,
    paddingHorizontal: 24,
    paddingVertical: 15
  },
  textMenu: {
    fontSize: 14,
    fontFamily: 'Mulish-SemiBold',
    marginBottom: 10
  }
})
