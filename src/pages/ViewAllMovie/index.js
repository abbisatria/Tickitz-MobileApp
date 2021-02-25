import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, FlatList, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { nowShowing } from '../../redux/actions/movie'
import { REACT_APP_API_URL as API_URL } from '@env'

import InputText from '../../components/Form/InputText'

class ViewAllMovie extends Component {
  state = {
    loading: false,
    message: '',
    nowShowingList: [],
    page: 1
  }
  async componentDidMount(){
    this.setState({ loading: true })
    await this.props.nowShowing()
    if (this.props.movie.nowShowing.length > 0) {
      this.setState({ nowShowingList: this.props.movie.nowShowing, loading: false, message: '' })
    } else {
      this.setState({ message: 'Movie Not Found', loading: false })
    }
  }
  search = async (value) => {
    this.setState({ loading: true })
    await this.props.nowShowing(value)
    if (this.props.movie.nowShowing.length > 0) {
      this.setState({ message: '', loading: false, nowShowingList: this.props.movie.nowShowing, page: 1 })
    } else {
      this.setState({ message: 'Movie Not Found', loading: false, nowShowingList: this.props.movie.nowShowing, page: 1 })
    }
  }
  next = async () => {
    if (this.state.page !== this.props.movie.pageInfoNowShowing.totalPage) {
      const { nowShowingList: oldNowShowingList, page } = this.state
      await this.props.nowShowing(null, page + 1)
      const nowShowingList = this.props.movie.nowShowing
      const newData = [...oldNowShowingList, ...nowShowingList]
      this.setState({ nowShowingList: newData, page: page + 1 })
    }
  }
  render() {
    console.log(this.state.nowShowingList)
    return (
      <View style={styles.parent}>
        <View style={styles.container}>
          <Text style={styles.title}>Now Showing</Text>
          <InputText placeholder="Search Movie...." paddingVertical={10} onChange={(value) => this.search(value)} />
        </View>
        {this.state.loading ? (<ActivityIndicator color='black' size='large' />) : this.state.nowShowingList.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data = {this.state.nowShowingList}
          contentContainerStyle = {styles.containerCard}
          renderItem = {({ item }) => (
            <View style={styles.card}>
              <View style={styles.row}>
                <Image source={{uri: `${API_URL}uploads/movies/${item.image}`}} style={styles.image} />
                <View style={styles.col}>
                  <View style={styles.gap}>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={styles.textGenre}>{item.genre}</Text>
                  </View>
                  <Text style={styles.text}>{item.duration}</Text>
                  <Text style={styles.directed}>{item.casts}</Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor = {item => String(item.id)}
          onEndReached = {this.next}
          onEndReachedThreshold = {0.5}
        />
        ) : <Text>{this.state.message}</Text>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1
  },
  container: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginBottom: 10,
    backgroundColor: 'white',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16
  },
  containerCard: {
    paddingHorizontal: 24,
    paddingBottom: 20
  },
  image: {
    width: 122,
    height: 185,
    borderRadius: 8,
    resizeMode: 'cover'
  },
  title:{
    fontSize: 20,
    fontFamily: 'Mulish-Bold',
    color: '#5F2EEA'
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    marginTop: 20
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    flex: 1,
    marginLeft: 5
  },
  text: {
    fontSize: 14,
    fontFamily: 'Mulish-Bold',
  },
  textGenre: {
    fontSize: 11,
    fontFamily: 'Mulish-Regular',
    color: '#A0A3BD'
  },
  gap: {
    marginBottom: 40
  },
  directed: {
    fontSize: 11,
    fontFamily: 'Mulish-Regular',
    color: '#A0A3BD',
    marginTop: 20
  }
})

const mapStateToProps = state => ({
  movie: state.movie
})

const mapDispatchToProps = { nowShowing }

export default connect(mapStateToProps, mapDispatchToProps)(ViewAllMovie)
