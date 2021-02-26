import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

const InputText = ({label, placeholder, value, paddingHorizontal = 22,  paddingVertical= 20, onChange, keyboardType}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input(paddingHorizontal, paddingVertical)} placeholder={placeholder} defaultValue={value} onChangeText={onChange} keyboardType={keyboardType} />
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
  input: (paddingHorizontal, paddingVertical) => ({
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 12,
    paddingHorizontal: paddingHorizontal,
    paddingVertical: paddingVertical,
    fontSize: 16,
    fontFamily: 'Mulish-Regular'
  })
})
