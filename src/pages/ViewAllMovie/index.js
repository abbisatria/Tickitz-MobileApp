import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {nowShowing, detailMovie} from '../../redux/actions/movie';
import {REACT_APP_API_URL as API_URL} from '@env';
import {showMessage} from '../../helpers/showMessage';

import InputText from '../../components/Form/InputText';
import Button from '../../components/Button';
import {TouchableOpacity} from 'react-native-gesture-handler';

class ViewAllMovie extends Component {
  state = {
    loading: false,
    message: '',
    nowShowingList: [],
    page: 1,
    sort: '',
    order: 'ASC',
    listRefresh: false,
  };
  async componentDidMount() {
    this.setState({loading: true});
    await this.props.nowShowing();
    if (this.props.movie.nowShowing.length > 0) {
      this.setState({
        nowShowingList: this.props.movie.nowShowing,
        loading: false,
        message: '',
      });
    } else {
      this.setState({message: 'Movie Not Found', loading: false});
    }
  }
  refresh = async () => {
    this.setState({loading: true});
    await this.props.nowShowing();
    if (this.props.movie.nowShowing.length > 0) {
      this.setState({
        nowShowingList: this.props.movie.nowShowing,
        loading: false,
        message: '',
        page: 1,
      });
    } else {
      this.setState({message: 'Movie Not Found', loading: false, page: 1});
    }
  };
  search = async (value) => {
    this.setState({loading: true});
    await this.props.nowShowing(value);
    if (this.props.movie.nowShowing.length > 0) {
      this.setState({
        message: '',
        loading: false,
        nowShowingList: this.props.movie.nowShowing,
        page: 1,
      });
    } else {
      this.setState({
        message: 'Movie Not Found',
        loading: false,
        nowShowingList: this.props.movie.nowShowing,
        page: 1,
      });
    }
  };
  next = async () => {
    if (this.state.page !== this.props.movie.pageInfoNowShowing.totalPage) {
      const {nowShowingList: oldNowShowingList, page, sort, order} = this.state;
      await this.props.nowShowing(null, page + 1, null, sort, order);
      const nowShowingList = this.props.movie.nowShowing;
      const newData = [...oldNowShowingList, ...nowShowingList];
      this.setState({nowShowingList: newData, page: page + 1});
    }
  };
  sortBy = async () => {
    const {sort, order} = this.state;
    if (sort !== '') {
      if (order === 'ASC') {
        this.setState({loading: true});
        await this.props.nowShowing(null, null, null, sort, order);
        this.setState({
          loading: false,
          nowShowingList: this.props.movie.nowShowing,
          order: 'DESC',
          page: 1,
        });
      } else {
        this.setState({loading: true});
        await this.props.nowShowing(null, null, null, sort, order);
        this.setState({
          loading: false,
          nowShowingList: this.props.movie.nowShowing,
          order: 'ASC',
          page: 1,
        });
      }
    } else {
      showMessage('Please select the sort first');
    }
  };
  detailMovie = async (id) => {
    await this.props.detailMovie(id);
    this.props.navigation.navigate('Details');
  };
  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.container}>
          <View style={styles.rowHeader}>
            <Text style={styles.title}>Now Showing</Text>
            <View style={styles.select}>
              <Picker
                selectedValue={this.state.sort}
                onValueChange={(itemValue) => this.setState({sort: itemValue})}>
                <Picker.Item label="Sort" />
                <Picker.Item label="Movie" value="name" />
                <Picker.Item label="Release" value="releaseDate" />
              </Picker>
            </View>
            <TouchableOpacity onPress={this.sortBy}>
              {this.state.order === 'ASC' ? (
                <Icon size={15} name="arrow-down" />
              ) : (
                <Icon size={15} name="arrow-up" />
              )}
            </TouchableOpacity>
          </View>
          <InputText
            placeholder="Search Movie...."
            paddingVertical={10}
            onChange={(value) => this.search(value)}
          />
        </View>
        {this.state.loading ? (
          <ActivityIndicator color="black" size="large" />
        ) : this.state.nowShowingList.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.nowShowingList}
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
                    <Button
                      text="Book Now"
                      textColor="#5F2EEA"
                      padding={5}
                      borderWidth={1}
                      borderColor="#5F2EEA"
                      color="white"
                      onPress={() => this.detailMovie(item.id)}
                    />
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item) => String(item.id)}
            refreshing={this.state.listRefresh}
            onRefresh={this.refresh}
            onEndReached={this.next}
            onEndReachedThreshold={0.5}
          />
        ) : (
          <Text>{this.state.message}</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginRight: 40,
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
    marginBottom: 5,
  },
  select: {
    flex: 1,
  },
});

const mapStateToProps = (state) => ({
  movie: state.movie,
});

const mapDispatchToProps = {nowShowing, detailMovie};

export default connect(mapStateToProps, mapDispatchToProps)(ViewAllMovie);
