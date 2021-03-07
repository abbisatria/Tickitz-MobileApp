import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {upComing} from '../../redux/actions/movie';
import {REACT_APP_API_URL as API_URL} from '@env';

import InputText from '../../components/Form/InputText';

class ViewAllUpComing extends Component {
  state = {
    loading: false,
    message: '',
    upComingList: [],
    page: 1,
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
    selectMonth: '',
    listRefresh: false,
  };
  async componentDidMount() {
    this.setState({loading: true});
    await this.props.upComing();
    if (this.props.movie.upComing.length > 0) {
      this.setState({
        upComingList: this.props.movie.upComing,
        loading: false,
        message: '',
      });
    } else {
      this.setState({message: 'Movie Not Found', loading: false});
    }
  }
  refresh = async () => {
    this.setState({loading: true});
    await this.props.upComing();
    if (this.props.movie.upComing.length > 0) {
      this.setState({
        upComingList: this.props.movie.upComing,
        loading: false,
        message: '',
        selectMonth: '',
        page: 1,
      });
    } else {
      this.setState({
        message: 'Movie Not Found',
        loading: false,
        selectMonth: '',
        page: 1,
      });
    }
  };
  search = async (value) => {
    this.setState({loading: true});
    await this.props.upComing(null, value);
    if (this.props.movie.upComing.length > 0) {
      this.setState({
        message: '',
        loading: false,
        upComingList: this.props.movie.upComing,
        page: 1,
      });
    } else {
      this.setState({
        message: 'Movie Not Found',
        loading: false,
        upComingList: this.props.movie.upComing,
        page: 1,
      });
    }
  };
  next = async () => {
    if (this.state.page !== this.props.movie.pageInfoUpComing.totalPage) {
      const {upComingList: oldupComingList, page} = this.state;
      await this.props.upComing(null, null, page + 1);
      const upComingList = this.props.movie.upComing;
      const newData = [...oldupComingList, ...upComingList];
      this.setState({upComingList: newData, page: page + 1});
    }
  };
  monthUpComing = async (value) => {
    this.setState({loading: true});
    await this.props.upComing(value);
    if (this.props.movie.upComing.length > 0) {
      this.setState({
        message: '',
        selectMonth: value,
        loading: false,
        upComingList: this.props.movie.upComing,
        page: 1,
      });
    } else {
      this.setState({
        message: 'Movie Not Found',
        selectMonth: value,
        loading: false,
        upComingList: this.props.movie.upComing,
        page: 1,
      });
    }
  };
  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.container}>
          <Text style={styles.title}>Up Coming</Text>
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
            refreshing={this.state.listRefresh}
            onRefresh={this.refresh}
          />
          <InputText
            placeholder="Search Movie...."
            paddingVertical={10}
            onChange={(value) => this.search(value)}
          />
        </View>
        {this.state.loading ? (
          <ActivityIndicator color="black" size="large" />
        ) : this.state.upComingList.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.upComingList}
            contentContainerStyle={styles.containerCard}
            renderItem={({item}) => (
              <View style={styles.card}>
                <View style={styles.row}>
                  <Image
                    source={{uri: `${API_URL}uploads/movies/${item.image}`}}
                    style={styles.image}
                  />
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
            keyExtractor={(item) => String(item.id)}
            refreshing={this.state.listRefresh}
            onRefresh={this.refresh}
          />
        ) : (
          <View style={styles.rowMessage}>
            <Text style={styles.message}>{this.state.message}</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginBottom: 10,
    backgroundColor: 'white',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  containerCard: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  image: {
    width: 122,
    height: 185,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Mulish-Bold',
    color: '#5F2EEA',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    flex: 1,
    marginLeft: 5,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Mulish-Bold',
  },
  textGenre: {
    fontSize: 11,
    fontFamily: 'Mulish-Regular',
    color: '#A0A3BD',
  },
  gap: {
    marginBottom: 40,
  },
  directed: {
    fontSize: 11,
    fontFamily: 'Mulish-Regular',
    color: '#A0A3BD',
    marginTop: 20,
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
  slide: {
    marginTop: 10,
  },
  rowMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 20,
    fontFamily: 'Mulish-Bold',
    color: '#A0A3BD',
  },
});

const mapStateToProps = (state) => ({
  movie: state.movie,
});

const mapDispatchToProps = {upComing};

export default connect(mapStateToProps, mapDispatchToProps)(ViewAllUpComing);
