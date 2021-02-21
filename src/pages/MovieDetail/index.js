import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, ActivityIndicator } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import {REACT_APP_API_URL as API_URL} from '@env'
import { showtimeMovie } from '../../redux/actions/showtime'
import { order } from '../../redux/actions/order'
import moment from 'moment'

import FooterHome from '../../components/FooterHome'
import Showtime from '../../components/Showtime'
import Select from '../../components/Form/Select'

import Calendar from '../../assets/icons/ic-calendar.svg'
import Location from '../../assets/icons/ic-location.svg'

class MovieDetail extends Component {
  state = {
    date: '',
    idMovie: this.props.movie.detailMovie.id,
    location: '',
    showtime: null,
    loading: false
  }

  changeLocation = (value) => {
    this.setState({location: value, loading: true}, async () => {
      if(this.state.date !== '' && this.state.location !== '') {
        const { date, location, idMovie} = this.state
        await this.props.showtimeMovie(date, location, idMovie)
        this.setState({loading: false, showtime: this.props.showtime.results})
      }
    })
  }

  changeDate = (value) => {
    this.setState({date: value, loading: true}, async () => {
      if(this.state.date !== '' && this.state.location !== '') {
        const { date, location, idMovie} = this.state
        await this.props.showtimeMovie(date, location, idMovie)
        this.setState({loading: false})
      }
    })
  }

  bookNow = async (showtimesId) => {
    this.setState({loading: true})
    await this.props.order(showtimesId)
    this.setState({loading: false})
    this.props.navigation.navigate('Order')
  }
  render() {
    console.log(this.props.showtime)
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.row}>
            <View style={styles.cardMovie}>
              <Image source={{uri: `${API_URL}uploads/movies/${this.props.movie.detailMovie.image}`}} style={styles.imageMovie} />
            </View>
            <Text style={styles.title}>{this.props.movie.detailMovie.name}</Text>
            <Text style={styles.subTitle}>{this.props.movie.detailMovie.genre}</Text>
          </View>
          <View>
            <View style={styles.rowDetail}>
              <View style={styles.colRight}>
                <Text style={styles.text}>Release date</Text>
                <Text style={styles.name}>{moment(this.props.movie.detailMovie.releaseDate).format('MMMM D, YYYY')}</Text>
              </View>
              <View style={styles.colLeft}>
                <Text style={styles.text}>Directed by</Text>
                <Text style={styles.name}>{this.props.movie.detailMovie.directed}</Text>
              </View>
            </View>
            <View style={styles.rowDetail}>
              <View style={styles.colRight}>
                <Text style={styles.text}>Duration</Text>
                <Text style={styles.name}>{this.props.movie.detailMovie.duration}</Text>
              </View>
              <View style={styles.colLeft}>
                <Text style={styles.text}>Casts</Text>
                <Text style={styles.name}>{this.props.movie.detailMovie.casts}</Text>
              </View>
            </View>
            <View style={styles.line} />
            <View>
              <Text style={styles.desc}>Synopsis</Text>
              <Text style={styles.descText}>{this.props.movie.detailMovie.description}</Text>
            </View>
          </View>
          <View style={styles.showtime}>
            <Text style={styles.titleShowtime}>Showtimes and Tickets</Text>
            <Select icon={<Calendar />} data={['2021-01-28', '2020-01-03', '2021-02-21']} label="Set a date" onChange={(value) =>
            this.changeDate(value)
          } value={this.state.date} />
            <View style={{height: 12}} />
            <Select icon={<Location />} data={['Jakarta', 'Purwokerto']} label="Set a city" onChange={(value) =>
            this.changeLocation(value)
          } value={this.state.location} />
          </View>
          {this.props.showtime.errorMsg !== '' ? <Text>{this.props.showtime.errorMsg}</Text> : this.state.loading ? <ActivityIndicator size="large" color="#000000" /> : this.state.showtime ? this.state.showtime.map((value, index) => {
            return (
              <View key={String(index)}>
                <Showtime data={value} book={this.bookNow} />
              </View>
            )
          }) : <Text style={{textAlign: 'center'}}>Please select a date and location</Text>}
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
    borderRadius: 16,
    resizeMode: 'cover'
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

const mapStateToProps = state => ({
  movie: state.movie,
  showtime: state.showtime
})

const mapDispatchToProps = { showtimeMovie, order }

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail)
