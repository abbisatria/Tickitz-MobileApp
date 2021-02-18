import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import Google from '../../assets/icons/ic-google.svg'
import Facebook from '../../assets/icons/ic-facebook.svg'

const Footer = ({title, textLink, onPress}) => {
  return (
    <View>
      <View style={styles.title}>
        <Text style={styles.textTitle}>{title} </Text>
        <TouchableOpacity onPress={onPress}><Text style={styles.link}>{textLink}</Text></TouchableOpacity>
      </View>
      <View style={styles.or}>
        <View style={styles.lineLeft} />
        <Text style={styles.textOr}>Or</Text>
        <View style={styles.lineRight} />
      </View>
      <View style={styles.row}>
        <View style={[styles.card, styles.cardRight]}>
          <Google />
        </View>
        <View style={styles.card}>
          <Facebook />
        </View>
      </View>
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({
  title: {
    marginTop: 32, 
    flexDirection: 'row', 
    justifyContent: 'center'
  },
  textTitle: {
    color: '#6E7191',
    fontSize: 16,
    fontFamily: 'Mulish-Medium'
  },
  link: {
    fontSize: 16,
    color: '#5F2EEA', 
    fontFamily: 'Mulish-Medium',
    textDecorationColor: '#5F2EEA', 
    textDecorationLine: 'underline'
  },
  row: {
    flexDirection: 'row', 
    justifyContent: 'center'
  },
  card: {
    elevation: 1, 
    padding: 20, 
    borderRadius: 12, 
    backgroundColor: 'white'
  },
  cardRight: {
    marginRight: 32
  },
  or: {
    marginVertical: 40, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  lineLeft: {
    flex: 1, 
    borderBottomWidth: 1, 
    borderBottomColor: '#DEDEDE'
  },
  textOr: {
    marginHorizontal: 40, 
    color: '#AAAAAA'
  },
  lineRight: {
    flex: 1, 
    borderBottomWidth: 1, 
    borderBottomColor: '#DEDEDE'
  }
})
