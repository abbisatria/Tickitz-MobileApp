import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import Button from '../../components/Button'

import EbvId from '../../assets/images/ebv.id.svg'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class Showtime extends Component {
  state = {
    time: '',
    showtime: ['08.30am', '09.30am', '10.30am', '11.30am', '12.30am']
  }
  render() {
    return (
      <View style={styles.cardCinema}>
        <View style={styles.rowCinema}>
          <EbvId />
          <Text style={styles.textCinema}>Whatever street No.12, South Purwokerto</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.rowShowtime}>
          {this.state.showtime.map((value, index) => {
            return (
              <TouchableOpacity key={String(index)} onPress={() => this.setState({time: value})}>
                <Text style={this.state.time === value ? styles.textShowtimeActive : styles.textShowtime}>{value}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
        <View style={styles.rowPrice}>
          <Text style={styles.price}>Price</Text>
          <Text style={styles.seat}>$10.00/seat</Text>
        </View>
        <View style={styles.rowBook}>
          <Button text="Book Now" padding={15} onPress={this.props.onPress} />
          <Button text="Add to cart" padding={15} color="white" textColor="#5F2EEA" />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardCinema: {
    padding: 24,
    borderRadius: 16,
    elevation: 2,
    backgroundColor: 'white',
    marginTop: 32
  },
  rowCinema: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowShowtime: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  rowPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 33,
    marginTop: 16
  },
  rowBook: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#DEDEDE',
    marginTop: 23,
    marginBottom: 16
  },
  price: {
    fontSize: 14,
    fontFamily: 'Mulish-Regular',
    color: '#6B6B6B'
  },
  seat: {
    fontSize: 14,
    fontFamily: 'Mulish-SemiBold'
  },
  textCinema: {
    fontSize: 13,
    fontFamily: 'Mulish-Regular',
    color: '#AAAAAA',
    marginTop: 12
  },
  textShowtime: {
    marginRight: 10, 
    marginBottom: 8,
    color: '#A0A3BD'
  },
  textShowtimeActive: {
    marginRight: 10, 
    marginBottom: 8,
    color: '#4E4B66'
  }
})
