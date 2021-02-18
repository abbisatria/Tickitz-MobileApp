import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TextInput } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

import FooterHome from '../../components/FooterHome'
import Showtime from '../../components/Showtime'
import Select from '../../components/Form/Select'

import nowShowing from '../../assets/images/nowShowing1.png'
import Calendar from '../../assets/icons/ic-calendar.svg'
import Location from '../../assets/icons/ic-location.svg'

export default class MovieDetail extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.row}>
            <View style={styles.cardMovie}>
              <Image source={nowShowing} style={styles.imageMovie} />
            </View>
            <Text style={styles.title}>Spider-Man: Homecoming</Text>
            <Text style={styles.subTitle}>Adventure, Action, Sci-Fi</Text>
          </View>
          <View>
            <View style={styles.rowDetail}>
              <View style={styles.colRight}>
                <Text style={styles.text}>Release date</Text>
                <Text style={styles.name}>June 28, 2017</Text>
              </View>
              <View style={styles.colLeft}>
                <Text style={styles.text}>Directed by</Text>
                <Text style={styles.name}>Jon Watss</Text>
              </View>
            </View>
            <View style={styles.rowDetail}>
              <View style={styles.colRight}>
                <Text style={styles.text}>Duration</Text>
                <Text style={styles.name}>2 hrs 13 min</Text>
              </View>
              <View style={styles.colLeft}>
                <Text style={styles.text}>Casts</Text>
                <Text style={styles.name}>Tom Holland, Robert Downey Jr., etc.</Text>
              </View>
            </View>
            <View style={styles.line} />
            <View>
              <Text style={styles.desc}>Synopsis</Text>
              <Text style={styles.descText}>Thrilled by his experience with the Avengers, Peter returns home, where he lives with his Aunt May, under the watchful eye of his new mentor Tony Stark, Peter tries to fall back into his normal daily routine - distracted by thoughts of proving himself to be more than just your friendly neighborhood Spider-Man - but when the Vulture emerges as a new villain, everything that Peter holds most important will be threatened. </Text>
            </View>
          </View>
          <View style={styles.showtime}>
            <Text style={styles.titleShowtime}>Showtimes and Tickets</Text>
            <Select icon={<Calendar />} data={['2020-01-02', '2020-01-03']} label="Set a date" />
            <View style={{height: 12}} />
            <Select icon={<Location />} data={['Jakarta', 'Karawang']} label="Set a city" />
          </View>
          <Showtime />
          <Showtime />
          <Showtime />
          <View style={styles.viewMore}>
            <View style={styles.lineLeft} />
              <TouchableOpacity>
                <Text style={styles.textViewMore}>view more</Text>
              </TouchableOpacity>
            <View style={styles.lineRight} />
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
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 35
  },
  cardMovie: {
    padding: 32,
    backgroundColor: 'white',
    borderRadius: 24,
    elevation: 2,
    marginBottom: 32
  },
  imageMovie: {
    width: 159,
    height: 244,
    borderRadius: 16
  },
  title: {
    fontSize: 20,
    fontFamily: 'Mulish-SemiBold'
  },
  subTitle: {
    fontSize: 16,
    fontFamily: 'Mulish-Regular',
    color: '#4E4B66'
  },
  rowDetail: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 12
  },
  colRight: {
    marginRight: 60,
    width: 120
  },
  colLeft: {
    flex: 1
  },
  text: {
    fontSize: 13,
    fontFamily: 'Mulish-Regular',
    color: '#8692A6'
  },
  name: {
    fontSize: 16,
    fontFamily: 'Mulish-Regular',
    color: '#121212'
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#D6D8E7',
    marginTop: 40,
    marginBottom: 24
  },
  desc: {
    fontSize: 16,
    fontFamily: 'Mulish-SemiBold',
    marginBottom: 16
  },
  descText: {
    fontSize: 13,
    fontFamily: 'Mulish-Regular',
    color: '#4E4B66'
  },
  showtime: {
    marginTop: 96,
    marginBottom: 16
  },
  titleShowtime: {
    fontSize: 18,
    fontFamily: 'Mulish-Bold',
    textAlign: 'center',
    marginBottom: 24
  },
  viewMore: {
    marginVertical: 48, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  lineLeft: {
    flex: 1, 
    borderBottomWidth: 1, 
    borderBottomColor: '#5F2EEA'
  },
  textViewMore: {
    marginHorizontal: 30, 
    color: '#5F2EEA'
  },
  lineRight: {
    flex: 1, 
    borderBottomWidth: 1, 
    borderBottomColor: '#5F2EEA'
  }
})
