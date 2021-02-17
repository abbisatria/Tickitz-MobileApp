import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Button = ({text, color = '#5F2EEA', borderWidth = 0, borderColor = 'none', textColor = 'white', onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.container(color, borderColor, borderWidth)}>
        <Text style={styles.text(textColor)}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  container: (color, borderColor, borderWidth) => ({
    backgroundColor: color,
    borderRadius: 12,
    padding: 20,
    borderWidth: borderWidth,
    borderColor: borderColor
  }),
  text: (textColor) => ({
    fontSize: 16,
    fontFamily: 'Mulish-SemiBold',
    color: textColor,
    textAlign: 'center'
  })
})
