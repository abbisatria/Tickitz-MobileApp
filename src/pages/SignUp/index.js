import React, { Component } from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'

import Header from '../../components/Header'
import Button from '../../components/Button'
import InputText from '../../components/Form/InputText'
import InputPassword from '../../components/Form/InputPassword'
import Footer from '../../components/Footer'

class SignUp extends Component {
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Header title="Sign Up" />
          <View style={styles.form}>
            <InputText label="Email" placeholder="Write your email" />
            <View style={styles.gap} />
            <InputPassword label="Password" placeholder="Write your password" paddingVertical={10} />
          </View>
          <Button text="Sign Up" />
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

export default SignUp
