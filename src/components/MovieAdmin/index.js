import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {connect} from 'react-redux';
import {
  cinemaLocation,
  listCinemaLocation,
  createShowtime,
} from '../../redux/actions/showtime';
import {listAllGenre} from '../../redux/actions/genre';
import {createMovie} from '../../redux/actions/movie';
import {REACT_APP_API_URL as API_URL} from '@env';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from '../../helpers/showMessage';
import Select2 from 'react-native-select-two';
import {Formik} from 'formik';
import * as Yup from 'yup';

import uploadHere from '../../assets/images/upload_here.jpeg';
import Location from '../../assets/icons/ic-location.svg';
import Calendar from '../../assets/icons/ic-calendar.svg';
import Button from '../Button';
import InputText from '../Form/InputText';
import Select from '../Form/Select';

const validationSchema = Yup.object().shape({
  movieName: Yup.string()
    .min(2, '*Movie name must have at least 2 characters')
    .max(50, '*Movie name must be less than 50 characters')
    .required('*Movie name is required'),
  duration: Yup.string()
    .min(8, '*Duration must have at least 8 characters')
    .max(8, '*Duration must be less than 8 characters')
    .required('*Duration is required'),
  director: Yup.string()
    .min(2, '*Director must have at least 2 characters')
    .max(50, '*Director must be less than 50 characters')
    .required('*Director is required'),
  casts: Yup.string()
    .min(2, '*Casts must have at least 2 characters')
    .max(150, '*Casts must be less than 150 characters')
    .required('*Casts is required'),
  category: Yup.string()
    .min(2, '*Category must have at least 2 characters')
    .max(50, '*Category must be less than 50 characters')
    .required('*Category is required'),
  description: Yup.string()
    .min(2, '*Description must have at least 2 characters')
    .max(150, '*Description must be less than 150 characters')
    .required('*Description is required'),
});

class MovieAdmin extends Component {
  state = {
    date: new Date(),
    show: false,
    showTime: false,
    placeholder: true,
    placeholderTime: true,
    time: new Date(),
    location: '',
    selectTime: [],
    selectCinema: [],
    dataImage: null,
    image: '',
    genre: [],
    listGenre: null,
    loading: false,
  };
  async componentDidMount() {
    await this.props.cinemaLocation();
    await this.props.listAllGenre();
    const listGenre = this.props.genre.results.map((item) => {
      return {id: item.id, name: item.name};
    });
    this.setState({listGenre});
  }
  showDatePicker = () => {
    this.setState({show: !this.state.show});
  };
  showTimePicker = () => {
    this.setState({showTime: !this.state.showTime});
  };
  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({
      date: currentDate,
      show: !this.state.show,
      placeholder: false,
    });
  };
  onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || this.state.time;
    this.setState({
      time: currentTime,
      showTime: !this.state.showTime,
      placeholderTime: false,
    });
  };
  changeLocation = async (value) => {
    this.setState({location: value});
    await this.props.listCinemaLocation(value);
  };
  selectedTime = (id) => {
    const {selectTime} = this.state;
    selectTime.push(id);
    this.setState({
      selectTime: selectTime,
    });
  };
  selectedCinema = (id) => {
    const {selectCinema} = this.state;
    let newArray = [];
    if (selectCinema.indexOf(id) === -1) {
      selectCinema.push(id);
      newArray = selectCinema;
    } else {
      newArray = selectCinema.filter((item) => item !== id);
    }
    this.setState({
      selectCinema: newArray,
    });
  };
  addPhotoGallery = () => {
    launchImageLibrary(
      {
        quality: 0.5,
        maxWidth: 300,
        maxHeight: 300,
      },
      async (response) => {
        if (response.didCancel) {
          showMessage('User cancelled upload image');
        } else if (response.errorMessage) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          const dataImage = {
            uri: response.uri,
            type: response.type,
            name: response.fileName,
          };
          this.setState({dataImage, image: response.uri});
        }
      },
    );
  };
  submit = async (values) => {
    const {genre, dataImage, date, selectCinema, selectTime} = this.state;
    const {
      movieName,
      duration,
      director,
      casts,
      category,
      description,
    } = values;
    const {token} = this.props.auth;
    try {
      this.setState({loading: true});
      if (
        genre.length > 1 &&
        selectCinema.length > 1 &&
        selectTime.length > 1 &&
        dataImage !== null
      ) {
        await this.props.createMovie(
          token,
          movieName,
          genre,
          dataImage,
          moment(date).format('YYYY-MM-DD'),
          category,
          duration,
          director,
          casts,
          description,
        );
        await this.props.createShowtime(
          token,
          this.props.movie.results.id,
          moment(date).format('YYYY-MM-DD'),
          selectCinema,
          selectTime,
        );
        if (
          this.props.showtime.success === true &&
          this.props.movie.success === true
        ) {
          showMessage('Create Movie and Showtime successfully', 'success');
          this.setState({loading: false});
        } else {
          showMessage('Failed');
          this.setState({loading: false});
        }
      } else {
        showMessage(
          'Failed to Make Movie and Showtime, please fill in all forms',
        );
        this.setState({loading: false});
      }
    } catch (err) {
      console.log(err);
      showMessage('Failed Create Movie and Showtime');
      this.setState({loading: false});
    }
  };
  render() {
    console.log(this.state.selectTime);
    return (
      <ScrollView
        style={[styles.scene, styles.container]}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Movie Description</Text>
        <Formik
          initialValues={{
            movieName: '',
            duration: '',
            director: '',
            casts: '',
            category: '',
            description: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => this.submit(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            values,
            isValid,
            touched,
          }) => (
            <View>
              <View style={styles.card}>
                <TouchableOpacity onPress={() => this.addPhotoGallery()}>
                  <View style={styles.cardMovie}>
                    {this.state.image === '' ? (
                      <Image source={uploadHere} style={styles.imageMovie} />
                    ) : (
                      <Image
                        source={{uri: this.state.image}}
                        style={styles.imageMovie}
                      />
                    )}
                  </View>
                </TouchableOpacity>
                {this.state.show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={this.state.date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={this.onChange}
                  />
                )}
                <View style={styles.gap}>
                  <InputText
                    label="Movie Name"
                    placeholder="Type your movie name"
                    paddingVertical={10}
                    onChange={handleChange('movieName')}
                    onBlur={handleBlur('movieName')}
                    value={values.movieName}
                  />
                  {errors.movieName && touched.movieName ? (
                    <Text style={styles.textError}>{errors.movieName}</Text>
                  ) : null}
                </View>
                <View style={styles.gap}>
                  <Text style={styles.label}>Genre</Text>
                  {this.state.listGenre && (
                    <Select2
                      style={styles.input}
                      colorTheme="blue"
                      popupTitle="Select Genre"
                      title="Select Genre"
                      data={this.state.listGenre}
                      onSelect={(data) => {
                        this.setState({genre: data});
                      }}
                      onRemoveItem={(data) => {
                        this.setState({genre: data});
                      }}
                      cancelButtonText="Cancel"
                      selectButtonText="Select"
                      showSearchBox={false}
                    />
                  )}
                </View>
                <View style={styles.gap}>
                  <Text style={styles.label}>Release Date</Text>
                  <TouchableOpacity onPress={this.showDatePicker}>
                    <View style={styles.input}>
                      <Text style={styles.textInput}>
                        {this.state.placeholder
                          ? 'Select Release Date'
                          : moment(this.state.date).format('YYYY-MM-DD')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.gap}>
                  <InputText
                    label="Duration"
                    placeholder="Type your duration"
                    paddingVertical={10}
                    onChange={handleChange('duration')}
                    onBlur={handleBlur('duration')}
                    value={values.duration}
                  />
                  {errors.duration && touched.duration ? (
                    <Text style={styles.textError}>{errors.duration}</Text>
                  ) : null}
                </View>
                <View style={styles.gap}>
                  <InputText
                    label="Director"
                    placeholder="Type your director"
                    paddingVertical={10}
                    onChange={handleChange('director')}
                    onBlur={handleBlur('director')}
                    value={values.director}
                  />
                  {errors.director && touched.director ? (
                    <Text style={styles.textError}>{errors.director}</Text>
                  ) : null}
                </View>
                <View style={styles.gap}>
                  <InputText
                    label="Casts"
                    placeholder="Type your casts"
                    paddingVertical={10}
                    onChange={handleChange('casts')}
                    onBlur={handleBlur('casts')}
                    value={values.casts}
                  />
                  {errors.casts && touched.casts ? (
                    <Text style={styles.textError}>{errors.casts}</Text>
                  ) : null}
                </View>
                <View style={styles.gap}>
                  <InputText
                    label="Category"
                    placeholder="Type your category"
                    paddingVertical={10}
                    onChange={handleChange('category')}
                    onBlur={handleBlur('category')}
                    value={values.category}
                  />
                  {errors.category && touched.category ? (
                    <Text style={styles.textError}>{errors.category}</Text>
                  ) : null}
                </View>
                <View style={styles.gap}>
                  <InputText
                    multiline={true}
                    numberOfLines={4}
                    label="Description"
                    placeholder="Type your description"
                    paddingVertical={10}
                    onChange={handleChange('description')}
                    onBlur={handleBlur('description')}
                    value={values.description}
                  />
                  {errors.description && touched.description ? (
                    <Text style={styles.textError}>{errors.description}</Text>
                  ) : null}
                </View>
              </View>
              <Text style={styles.title}>Premiere Location</Text>
              <View style={styles.card}>
                <Select
                  icon={<Location />}
                  data={
                    this.props.showtime.location && this.props.showtime.location
                  }
                  label="Set a city"
                  onChange={(value) => this.changeLocation(value)}
                  value={this.state.location}
                />
                <View style={styles.gap}>
                  <View style={styles.rowCinema}>
                    {this.props.showtime.results &&
                      this.props.showtime.results.map((item) => {
                        return (
                          <TouchableOpacity
                            key={String(item.id)}
                            onPress={() => this.selectedCinema(item.id)}>
                            <View
                              style={[
                                styles.cardCinema,
                                this.state.selectCinema.includes(item.id) &&
                                  styles.selectCinema,
                              ]}>
                              <Image
                                source={{
                                  uri: `${API_URL}uploads/cinemas/${item.image}`,
                                }}
                                style={styles.imageCinema}
                              />
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                  </View>
                </View>
              </View>
              <Text style={styles.title}>Showtimes</Text>
              <View style={styles.card}>
                {this.state.showTime && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={this.state.time}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={this.onChangeTime}
                  />
                )}
                <TouchableOpacity onPress={this.showTimePicker}>
                  <View style={styles.inputShowtime}>
                    <Calendar />
                    <Text style={styles.showtime}>
                      {this.state.placeholderTime
                        ? 'Set a time'
                        : moment(this.state.time).format('hh:mm A')}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.rowCinema}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>
                      this.selectedTime(
                        moment(this.state.time).format('hh:mm:ss'),
                      )
                    }>
                    <View style={styles.containerButton}>
                      <Text style={styles.textButton}>+</Text>
                    </View>
                  </TouchableOpacity>
                  {this.state.selectTime &&
                    this.state.selectTime.map((item, index) => {
                      return (
                        <React.Fragment key={String(index)}>
                          <Text style={styles.textShowtime}>{item}</Text>
                        </React.Fragment>
                      );
                    })}
                </View>
              </View>
              <View style={styles.gapButtom}>
                {this.state.loading ? (
                  <ActivityIndicator size="large" color="#000000" />
                ) : (
                  <Button
                    text="Save"
                    padding={15}
                    color={!isValid ? '#D8CCFA' : '#5F2EEA'}
                    onPress={!isValid ? null : handleSubmit}
                  />
                )}
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Mulish-SemiBold',
    marginBottom: 16,
  },
  card: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: 'white',
    borderRadius: 24,
    marginBottom: 32,
  },
  cardMovie: {
    borderWidth: 1,
    borderColor: '#A0A3BD',
    padding: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 32,
  },
  imageMovie: {
    width: 159,
    height: 244,
    borderRadius: 8,
  },
  gap: {
    marginTop: 15,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Mulish-Regular',
    color: '#4E4B66',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 12,
    paddingHorizontal: 22,
    paddingVertical: 14,
  },
  textInput: {
    fontSize: 16,
    fontFamily: 'Mulish-Regular',
  },
  rowCinema: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 10,
  },
  cardCinema: {
    width: 80,
    height: 51,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 10,
  },
  selectCinema: {
    backgroundColor: '#DEDEDE',
    borderRadius: 8,
  },
  imageCinema: {
    width: 72,
    height: 23,
    resizeMode: 'contain',
  },
  textShowtime: {
    fontSize: 13,
    fontFamily: 'Mulish-Regular',
    color: '#4E4B66',
    marginLeft: 10,
    marginTop: 10,
  },
  containerButton: {
    borderRadius: 8,
    paddingHorizontal: 26,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#5F2EEA',
  },
  textButton: {
    fontSize: 20,
    color: '#5F2EEA',
  },
  inputShowtime: {
    backgroundColor: '#EFF0F6',
    borderRadius: 16,
    paddingHorizontal: 26,
    paddingVertical: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  showtime: {
    flex: 1,
    marginLeft: 18,
    fontSize: 14,
    fontFamily: 'Mulish-SemiBold',
  },
  gapButtom: {
    marginBottom: 50,
  },
  textError: {
    fontFamily: 'Mulish-Regular',
    fontSize: 12,
    color: 'red',
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  showtime: state.showtime,
  genre: state.genre,
  movie: state.movie,
});

const mapDispatchToProps = {
  cinemaLocation,
  listCinemaLocation,
  listAllGenre,
  createMovie,
  createShowtime,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieAdmin);
