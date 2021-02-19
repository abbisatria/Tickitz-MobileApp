import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Seat = (props) => {
  const {seat, seatLove, seatSold, seatLoveSold} = props
  return (
    <View style={[seat ? styles.seat : seatLove ? styles.seatLove : seatSold ? styles.seatSold : seatLoveSold ? styles.seatLoveSold : null, props.selected && styles.selected]}/>
  )
}

export default Seat

const styles = StyleSheet.create({
  seat: {
    width: 14,
    height: 14,
    backgroundColor: '#D6D8E7',
    marginRight: 6,
    borderRadius: 2
  },
  seatSold: {
    width: 14,
    height: 14,
    backgroundColor: '#6E7191',
    marginRight: 6,
    borderRadius: 2
  },
  seatLove: {
    width: 34,
    height: 14,
    backgroundColor: '#F589D7',
    marginRight: 6,
    borderRadius: 2
  },
  seatLoveSold: {
    width: 34,
    height: 14,
    backgroundColor: '#6E7191',
    marginRight: 6,
    borderRadius: 2
  },
  selected: {
    backgroundColor: '#5F2EEA'
  }
})
