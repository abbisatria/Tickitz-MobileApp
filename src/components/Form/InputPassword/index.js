import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

class InputPassword extends Component {
  state = {
    isPasswordShown: false
  }
  togglePasswordVisiblity = () => {
    const { isPasswordShown } = this.state
    this.setState({ isPasswordShown: !isPasswordShown })
  }
  render() {
    const { isPasswordShown } = this.state
    return (
      <View>
        <Text style={styles.label}>{this.props.label}</Text>
        <TextInput style={styles.input} placeholder={this.props.placeholder} secureTextEntry={isPasswordShown ? false : true} />
        <TouchableOpacity onPress={this.togglePasswordVisiblity} style={{position: 'absolute', bottom: 25, right: 20}}><Icon name={isPasswordShown ? 'eye-slash' : 'eye'} size={20} color="#A0A3BD" /></TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontFamily: 'Mulish-Regular',
    color: '#4E4B66',
    marginBottom: 12
  },
  input: {
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 12,
    paddingHorizontal: 22,
    paddingVertical: 20,
    fontSize: 16,
    fontFamily: 'Mulish-Regular'
  }
})

export default InputPassword
