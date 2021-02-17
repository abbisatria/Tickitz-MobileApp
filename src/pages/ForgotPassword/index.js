import React, { Component } from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'

import Header from '../../components/Header'
import Button from '../../components/Button'
import InputText from '../../components/Form/InputText'

class ForgotPassword extends Component {
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Header title="Forgot Password" subTitle="we'll send a link to your email shortly" />
          <View style={styles.form}>
            <InputText label="Email" placeholder="Write your email" />
          </View>
          <Button text="Active Now" />
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
  }
})

export default ForgotPassword
