import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

// import nowShowing1 from '../../assets/images/nowShowing1.png'

export default class NowShowing extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.card}>
          <Image source={{uri: `http://192.168.1.13:5000/uploads/movies/${this.props.data.image}`}} style={styles.imageNowShowing} />
        </View>
      </TouchableOpacity>
  )
  }
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#DEDEDE',
    padding: 16,
    borderRadius: 16,
    marginRight: 16
  },
  imageNowShowing: {
    width: 122,
    height: 185,
    borderRadius: 8,
    resizeMode: 'cover'
  }
})
