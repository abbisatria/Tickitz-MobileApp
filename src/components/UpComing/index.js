import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {REACT_APP_API_URL as API_URL} from '@env';

export default class UpComing extends Component {
  render() {
    return (
      <View style={styles.card}>
        <Image
          source={{uri: `${API_URL}uploads/movies/${this.props.data.image}`}}
          style={styles.imageUpcoming}
        />
        <Text style={styles.title}>{this.props.data.name}</Text>
        <Text style={styles.text}>{this.props.data.genre}</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={this.props.onPress}>
          <View style={styles.button}>
            <Text style={styles.textButton}>Details</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#DEDEDE',
    padding: 16,
    borderRadius: 16,
    marginRight: 16,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Mulish-SemiBold',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  text: {
    fontSize: 11,
    fontFamily: 'Mulish-Regular',
    color: '#A0A3BD',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    borderRadius: 8,
    padding: 5,
    borderWidth: 1,
    borderColor: '#5F2EEA',
  },
  textButton: {
    fontSize: 10,
    fontFamily: 'Mulish-Regular',
    color: '#5F2EEA',
    textAlign: 'center',
  },
  imageUpcoming: {
    width: 122,
    height: 185,
    borderRadius: 8,
    resizeMode: 'cover',
  },
});
