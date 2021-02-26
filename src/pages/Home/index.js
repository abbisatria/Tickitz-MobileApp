import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { nowShowing, upComing, detailMovie } from '../../redux/actions/movie'

import InputText from '../../components/Form/InputText'
import Button from '../../components/Button'
import FooterHome from '../../components/FooterHome'
import Hero from '../../components/Hero'
import NowShowing from '../../components/NowShowing'
import UpComing from '../../components/UpComing'

class Home extends Component {
  state = {
    selectMonth: '',
    month: [
      {
        id: 9,
        month: "September"
      },
      {
        id: 10,
        month: "October"
      },
      {
        id: 11,
        month: "November"
      },
      {
        id: 12,
        month: "December"
      },
      {
        id: 1,
        month: "January"
      },
      {
        id: 2,
        month: "February"
      },
      {
        id: 3,
        month: "March"
      },
      {
        id: 4,
        month: "April"
      },
      {
        id: 5,
        month: "May"
      },
      {
        id: 6,
        month: "June"
      },
      {
        id: 7,
        month: "July"
      },
      {
        id: 8,
        month: "August"
      }
    ]
  }
  async componentDidMount(){
    await this.props.nowShowing()
    await this.props.upComing()
  }
  detailMovie = async (id) => {
    await this.props.detailMovie(id)
    this.props.navigation.navigate('Details')
  }
  monthUpComing = async (value) => {
    await this.props.upComing(value)
    this.setState({ selectMonth: value })
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Hero />
          <View>
            <View style={styles.row}>
              <Text style={styles.showText}>Now Showing</Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewAllMovie')}>
                <Text style={styles.showLink}>view all</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.slide}
              data={this.props.movie.nowShowing}
              renderItem={({ item }) => (
                <NowShowing data={item} onPress={() => this.detailMovie(item.id)} />
              )}
              keyExtractor = {item => String(item.id)}
            />
          </View>
          <View>
            <View style={styles.row}>
              <Text style={[styles.showText, {color: 'black'}]}>Upcoming Movies</Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewAllUpComing')}>
                <Text style={styles.showLink}>view all</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.slide}
              data={this.state.month}
              renderItem={({ item }) => (
                <TouchableOpacity activeOpacity={0.7} onPress={() => this.monthUpComing(item.id)}>
                  <View style={[styles.button, this.state.selectMonth === item.id ? styles.buttonSelect : null]}>
                    <Text style={[styles.textButton, this.state.selectMonth === item.id ? styles.textButtonSelect : null]}>{item.month}</Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor = {item => String(item.id)}
            />
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.slide}
              data={this.props.movie.upComing}
              renderItem={({ item }) => (
                <UpComing data={item} onPress={() => this.detailMovie(item.id)} />
              )}
              keyExtractor = {item => String(item.id)}
            />
          </View>
          <View style={styles.moviegoers}>
            <Text style={styles.moviegoersText}>Be the vanguard of the</Text>
            <Text style={styles.moviegoersTitle}>Moviegoers</Text>
            <InputText placeholder="Type your email" keyboardType="email-address" />
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
  buttonSelect: {
    backgroundColor: '#5F2EEA'
  },
  textButton: {
    fontSize: 14,
    fontFamily: 'Mulish-SemiBold',
    color: '#5F2EEA'
  },
  textButtonSelect: {
    fontSize: 14,
    fontFamily: 'Mulish-SemiBold',
    color: 'white'
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

const mapStateToProps = state => ({
  movie: state.movie
})

const mapDispatchToProps = { nowShowing, upComing, detailMovie }

export default connect(mapStateToProps, mapDispatchToProps)(Home)
