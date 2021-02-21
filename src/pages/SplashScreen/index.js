import React, { Component } from 'react'
import {View} from 'react-native'
import Logo from '../../assets/images/logo.svg'
import {connect} from 'react-redux'

class SplashScreen extends Component {
  componentDidMount() {
    setTimeout(() => {
      if (this.props.auth.token) {
        this.props.navigation.reset({index: 0, routes: [{name: 'Home'}]})
      } else {
        this.props.navigation.replace('SignUp')
      }
    }, 2000)
  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Logo />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(SplashScreen)
