import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {nowShowing, upComing, detailMovie} from '../../redux/actions/movie';
import http from '../../helpers/http';
import {showMessage} from '../../helpers/showMessage';

import InputText from '../../components/Form/InputText';
import Button from '../../components/Button';
import FooterHome from '../../components/FooterHome';
import Hero from '../../components/Hero';
import NowShowing from '../../components/NowShowing';
import UpComing from '../../components/UpComing';

class Home extends Component {
  state = {
    selectMonth: '',
    month: [
      {
        id: 9,
        month: 'September',
      },
      {
        id: 10,
        month: 'October',
      },
      {
        id: 11,
        month: 'November',
      },
      {
        id: 12,
        month: 'December',
      },
      {
        id: 1,
        month: 'January',
      },
      {
        id: 2,
        month: 'February',
      },
      {
        id: 3,
        month: 'March',
      },
      {
        id: 4,
        month: 'April',
      },
      {
        id: 5,
        month: 'May',
      },
      {
        id: 6,
        month: 'June',
      },
      {
        id: 7,
        month: 'July',
      },
      {
        id: 8,
        month: 'August',
      },
    ],
    nowShowingList: [],
    upComingList: [],
    page: 1,
    email: '',
    message: '',
    loading: false,
    loadingMovie: false,
  };
  async componentDidMount() {
    await Linking.getInitialURL().then((URL) => {
      if (URL === 'tickitz://SignIn') {
        this.props.navigation.navigate('SignIn');
        showMessage('Account has been active', 'success');
      }
    });
    await this.props.nowShowing();
    await this.props.upComing();
    this.setState({
      nowShowingList: this.props.movie.nowShowing,
      upComingList: this.props.movie.upComing,
    });
  }
  next = async () => {
    if (this.state.page !== this.props.movie.pageInfoNowShowing.totalPage) {
      const {nowShowingList: oldNowShowingList, page} = this.state;
      await this.props.nowShowing(null, page + 1);
      const nowShowingList = this.props.movie.nowShowing;
      const newData = [...oldNowShowingList, ...nowShowingList];
      this.setState({nowShowingList: newData, page: page + 1});
    }
  };
  detailMovie = async (id) => {
    await this.props.detailMovie(id);
    this.props.navigation.navigate('Details');
  };
  monthUpComing = async (value) => {
    this.setState({loadingMovie: true});
    await this.props.upComing(value);
    if (this.props.movie.upComing.length > 0) {
      this.setState({
        selectMonth: value,
        upComingList: this.props.movie.upComing,
        message: '',
        loadingMovie: false,
      });
    } else {
      this.setState({
        selectMonth: value,
        message: 'Movie Not Found',
        loadingMovie: false,
      });
    }
  };
  moviegoers = async () => {
    this.setState({loading: true});
    const {email} = this.state;
    if (email !== '') {
      const params = new URLSearchParams();
      params.append('email', email);
      try {
        const results = await http().post('users/moviegoers', params);
        showMessage(results.data.message, 'success');
        this.setState({loading: false});
      } catch (err) {
        const {message} = err.response.data;
        showMessage(message);
        this.setState({loading: false});
      }
    } else {
      showMessage('Email is required');
      this.setState({loading: false});
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Hero />
          <View>
            <View style={styles.row}>
              <Text style={styles.showText}>Now Showing</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ViewAllMovie')}>
                <Text style={styles.showLink}>view all</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.slide}
              data={this.state.nowShowingList}
              renderItem={({item}) => (
                <NowShowing
                  data={item}
                  onPress={() => this.detailMovie(item.id)}
                />
              )}
              keyExtractor={(item) => String(item.id)}
              onEndReached={this.next}
              onEndReachedThreshold={0.5}
            />
          </View>
          <View>
            <View style={styles.row}>
              <Text style={[styles.showText, styles.colorUpComing]}>
                Upcoming Movies
              </Text>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('ViewAllUpComing')
                }>
                <Text style={styles.showLink}>view all</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.slide}
              data={this.state.month}
              renderItem={({item}) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => this.monthUpComing(item.id)}>
                  <View
                    style={[
                      styles.button,
                      this.state.selectMonth === item.id
                        ? styles.buttonSelect
                        : null,
                    ]}>
                    <Text
                      style={[
                        styles.textButton,
                        this.state.selectMonth === item.id
                          ? styles.textButtonSelect
                          : null,
                      ]}>
                      {item.month}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => String(item.id)}
            />
            {this.state.loadingMovie ? (
              <ActivityIndicator size="large" color="#000000" />
            ) : this.state.message === '' ? (
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.slide}
                data={this.state.upComingList}
                renderItem={({item}) => (
                  <UpComing
                    data={item}
                    onPress={() => this.detailMovie(item.id)}
                  />
                )}
                keyExtractor={(item) => String(item.id)}
              />
            ) : (
              <Text style={styles.message}>{this.state.message}</Text>
            )}
          </View>
          <View style={styles.moviegoers}>
            <Text style={styles.moviegoersText}>Be the vanguard of the</Text>
            <Text style={styles.moviegoersTitle}>Moviegoers</Text>
            <InputText
              placeholder="Type your email"
              keyboardType="email-address"
              onChange={(email) => this.setState({email})}
            />
            <View style={styles.gap} />
            {this.state.loading ? (
              <ActivityIndicator size="large" color="#000000" />
            ) : (
              <Button text="Join now" onPress={() => this.moviegoers()} />
            )}
            <Text style={styles.moviegoersDesc}>
              By joining you as a Tickitz member, we will always send you the
              latest updates via email .
            </Text>
          </View>
          <FooterHome />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  showText: {
    fontSize: 18,
    fontFamily: 'Mulish-Bold',
    color: '#5F2EEA',
  },
  showLink: {
    fontSize: 14,
    fontFamily: 'Mulish-SemiBold',
    color: '#5F2EEA',
  },
  slide: {
    marginBottom: 56,
  },
  button: {
    borderRadius: 8,
    width: 127,
    height: 42,
    borderWidth: 1,
    borderColor: '#5F2EEA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  buttonSelect: {
    backgroundColor: '#5F2EEA',
  },
  textButton: {
    fontSize: 14,
    fontFamily: 'Mulish-SemiBold',
    color: '#5F2EEA',
  },
  textButtonSelect: {
    fontSize: 14,
    fontFamily: 'Mulish-SemiBold',
    color: 'white',
  },
  moviegoers: {
    elevation: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 48,
    paddingHorizontal: 32,
  },
  moviegoersText: {
    fontSize: 14,
    fontFamily: 'Mulish-Regular',
    color: '#4E4B66',
    textAlign: 'center',
  },
  moviegoersTitle: {
    fontSize: 32,
    fontFamily: 'Mulish-Bold',
    color: '#5F2EEA',
    textAlign: 'center',
  },
  moviegoersDesc: {
    fontSize: 12,
    fontFamily: 'Mulish-Regular',
    color: '#6E7191',
    textAlign: 'center',
    letterSpacing: 1,
    marginTop: 32,
  },
  gap: {
    height: 16,
  },
  colorUpComing: {
    color: 'black',
  },
  message: {
    fontSize: 20,
    fontFamily: 'Mulish-Bold',
    color: '#A0A3BD',
    textAlign: 'center',
  },
});

const mapStateToProps = (state) => ({
  movie: state.movie,
});

const mapDispatchToProps = {nowShowing, upComing, detailMovie};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
