import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'

import Button from '../../components/Button'

import { TouchableOpacity } from 'react-native-gesture-handler'
import {REACT_APP_API_URL as API_URL} from '@env'

export default class Showtime extends Component {
  state = {
    time: ''
  }
  render() {
    return (
      <View style={styles.cardCinema}>
        <View style={styles.rowCinema}>
          <Image source={{uri: `${API_URL}uploads/cinemas/${this.props.data.image}`}} style={styles.image} />
          <Text style={styles.textCinema}>{this.props.data.address}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.rowShowtime}>
          {this.props.data.showtime.map((value, index) => {
            return (
              <TouchableOpacity key={String(index)} onPress={() => this.setState({time: value.id})}>
                <Text style={this.state.time === value.id ? styles.textShowtimeActive : styles.textShowtime}>{value.name}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
        <View style={styles.rowPrice}>
          <Text style={styles.price}>Price</Text>
          <Text style={styles.seat}>${this.props.data.price}/seat</Text>
        </View>
        <View style={styles.rowBook}>
          <Button text="Book Now" padding={15} onPress={() => this.props.book(this.state.time)} />
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
    marginRight: 9, 
    marginBottom: 8,
    color: '#A0A3BD'
  },
  textShowtimeActive: {
    marginRight: 9, 
    marginBottom: 8,
    color: '#4E4B66'
  },
  image: {
    width: 106,
    height: 43,
    resizeMode: 'contain'
  }
})
