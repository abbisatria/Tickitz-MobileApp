import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'

import InputText from '../../components/Form/InputText'
import Button from '../../components/Button'
import FooterHome from '../../components/FooterHome'
import Hero from '../../components/Hero'
import NowShowing from '../../components/NowShowing'
import UpComing from '../../components/UpComing'

import http from '../../helpers/http'

export default class Home extends Component {
  state = {
    month: [
      "September",
      "October",
      "November",
      "December",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
    ],
    nowShowingList: []
  }
  async componentDidMount(){
    try {
      const response = await http().get('movies/movieNowShowing')
      this.setState({
        nowShowingList: response.data.results
      })
    } catch(err) {
      console.log(err)
    }
  }
  render() {
    console.log(this.state.nowShowingList)
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Hero />
          <View>
            <View style={styles.row}>
              <Text style={styles.showText}>Now Showing</Text>
              <Text style={styles.showLink}>view all</Text>
            </View>
            <ScrollView style={styles.slide} horizontal showsHorizontalScrollIndicator={false}>
              {this.state.nowShowingList.map((value, index) => {
                return (
                  <View key={String(index)}>
                    <NowShowing data={value} onPress={() => this.props.navigation.navigate('Details')} />
                  </View>
                )
              })}
            </ScrollView>
          </View>
          <View>
            <View style={styles.row}>
              <Text style={[styles.showText, {color: 'black'}]}>Upcoming Movies</Text>
              <Text style={styles.showLink}>view all</Text>
            </View>
            <ScrollView style={styles.slide} horizontal showsHorizontalScrollIndicator={false}>
              {this.state.month.map((value, index) => {
                return (
                  <TouchableOpacity activeOpacity={0.7} key={String(index)}>
                    <View style={styles.button}>
                      <Text style={styles.textButton}>{value}</Text>
                    </View>
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
            <ScrollView style={styles.slide} horizontal showsHorizontalScrollIndicator={false}>
              {[...Array(10)].map((value, index) => {
                return (
                  <UpComing key={String(index)} onPress={() => this.props.navigation.navigate('Details')} />
                )
              })}
            </ScrollView>
          </View>
          <View style={styles.moviegoers}>
            <Text style={styles.moviegoersText}>Be the vanguard of the</Text>
            <Text style={styles.moviegoersTitle}>Moviegoers</Text>
            <InputText placeholder="Type your email" />
            <View style={{height: 16}} />
            <Button text="Join now" />
            <Text style={styles.moviegoersDesc}>By joining you as a Tickitz member, we will always send you the latest updates via email .</Text>
          </View>
          <FooterHome />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32
  },
  showText: {
    fontSize: 18,
    fontFamily: 'Mulish-Bold',
    color: '#5F2EEA'
  },
  showLink: {
    fontSize: 14,
    fontFamily: 'Mulish-SemiBold',
    color: '#5F2EEA'
  },
  slide: {
    marginBottom: 56
  },
  button: {
    borderRadius: 8,
    width: 127,
    height: 42,
    borderWidth: 1,
    borderColor: '#5F2EEA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  textButton: {
    fontSize: 14,
    fontFamily: 'Mulish-SemiBold',
    color: '#5F2EEA'
  },
  moviegoers: {
    elevation: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 48,
    paddingHorizontal: 32
  },
  moviegoersText: {
    fontSize: 14,
    fontFamily: 'Mulish-Regular',
    color: '#4E4B66',
    textAlign: 'center'
  },
  moviegoersTitle: {
    fontSize: 32,
    fontFamily: 'Mulish-Bold',
    color: '#5F2EEA',
    textAlign: 'center'
  },
  moviegoersDesc: {
    fontSize: 12,
    fontFamily: 'Mulish-Regular',
    color: '#6E7191',
    textAlign: 'center',
    letterSpacing: 1,
    marginTop: 32
  }
})
