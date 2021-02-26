import React, { Component } from 'react'
import { ScrollView, View, StyleSheet, ActivityIndicator } from 'react-native'

import { connect } from 'react-redux'
import { signUp } from '../../redux/actions/auth'

import Header from '../../components/Header'
import Button from '../../components/Button'
import InputText from '../../components/Form/InputText'
import InputPassword from '../../components/Form/InputPassword'
import Footer from '../../components/Footer'

import { showMessage } from '../../helpers/showMessage'

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    loading: false
  }
  signUp = async () => {
    this.setState({ loading: true })
    const { email, password } = this.state
    await this.props.signUp(email, password)
    if (this.props.auth.message) {
      this.setState({ loading: false })
      showMessage(this.props.auth.message, 'success')
      this.props.navigation.navigate('SignIn')
    } else {
      this.setState({ loading: false })
      showMessage(this.props.auth.errorMsg)
    }
  }
  render() {
    console.log(this.props.auth.message)
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Header title="Sign Up" />
          <View style={styles.form}>
            <InputText label="Email" placeholder="Write your email" keyboardType="email-address" onChange={(email) => this.setState({email})} />
            <View style={styles.gap} />
            <InputPassword label="Password" placeholder="Write your password" paddingVertical={10} onChange={(password) => this.setState({password})} />
          </View>
          {this.state.loading ? <ActivityIndicator size="large" color="#000000" /> : <Button text="Sign Up" onPress={() => this.signUp()} />}
          <Footer title="Do you already have an account?" textLink="Log in" onPress={() => this.props.navigation.navigate('SignIn')} />
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

const mapDispatchToProps = { signUp }

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
