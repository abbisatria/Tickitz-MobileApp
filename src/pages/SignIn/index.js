import React, { Component } from 'react'
import { ScrollView, View, StyleSheet, ActivityIndicator } from 'react-native'
import { showMessage } from 'react-native-flash-message'

import { connect } from 'react-redux'
import { login } from '../../redux/actions/auth'

import Header from '../../components/Header'
import Button from '../../components/Button'
import InputText from '../../components/Form/InputText'
import InputPassword from '../../components/Form/InputPassword'
import Footer from '../../components/Footer'

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    loading: false
  }
  login = async () => {
    this.setState({ loading: true })
    const { email, password } = this.state
    await this.props.login(email, password)
    if (this.props.auth.token) {
      this.setState({ loading: false })
      this.showToast('Login Success', 'success')
      this.props.navigation.navigate('Home')
    } else {
      this.setState({ loading: false })
      this.showToast(this.props.auth.errorMsg)
    }
  }
  showToast = (message, type) => {
    showMessage({
      message,
      type: type === 'success' ? 'success' : 'danger',
    })
  }
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Header title="Sign In" />
          <View style={styles.form}>
            <InputText label="Email" placeholder="Write your email" onChange={(email) => this.setState({email})} />
            <View style={styles.gap} />
            <InputPassword label="Password" placeholder="Write your password" onChange={(password) => this.setState({password})}  paddingVertical={10} />
          </View>
          {this.state.loading ? <ActivityIndicator size="large" color="#000000" /> : <Button text="Sign In" onPress={() => this.login()} />}
          <Footer title="Forgot your password?" textLink="Reset now" onPress={() => this.props.navigation.navigate('ForgotPassword')} />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    backgroundColor: 'white'
  },
  form: {
    marginVertical: 40
  },
  gap: {
    height: 25
  }
})

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = { login }

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
