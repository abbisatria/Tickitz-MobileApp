import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

const InputText = ({label, placeholder}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} placeholder={placeholder} />
    </View>
  )
}

export default InputText

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
