import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {createCinema} from '../../redux/actions/cinema';
import {showMessage} from '../../helpers/showMessage';
import {launchImageLibrary} from 'react-native-image-picker';
import {Formik} from 'formik';
import * as Yup from 'yup';

import InputText from '../Form/InputText';
import Button from '../Button';

const validationSchema = Yup.object().shape({
  cinemaName: Yup.string()
    .min(2, '*Cinema name must have at least 2 characters')
    .max(50, '*Cinema name must be less than 50 characters')
    .required('*Cinema name is required'),
  location: Yup.string()
    .min(2, '*Location must have at least 2 characters')
    .max(50, '*Location must be less than 50 characters')
    .required('*Location is required'),
  price: Yup.string()
    .min(2, '*Price must have at least 2 characters')
    .max(10, '*Price cant be longer than 10 characters')
    .required('*Price is required'),
  address: Yup.string()
    .min(2, '*Address must have at least 2 characters')
    .max(100, '*Address cant be longer than 100 characters')
    .required('*Address is required'),
});

class CinemaAdmin extends Component {
  state = {
    dataImage: null,
    image: '',
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
          showMessage('User cancelled image picker');
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
    const {cinemaName, location, price, address} = values;
    const {dataImage} = this.state;
    await this.props.createCinema(
      this.props.auth.token,
      cinemaName,
      location,
      dataImage,
      price,
      address,
    );
    if (this.props.cinema.errorMsg === '') {
      this.setState({image: ''});
      showMessage('Create Cinema successfully', 'success');
    } else {
      showMessage(this.props.cinema.errorMsg);
    }
  };
  render() {
    return (
      <ScrollView
        style={[styles.scene, styles.container]}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Create Cinema</Text>
        <View style={styles.card}>
          <TouchableOpacity onPress={() => this.addPhotoGallery()}>
            <View style={styles.cardCinema}>
              {this.state.image === '' ? (
                <Text>Upload Cinema</Text>
              ) : (
                <Image
                  source={{uri: this.state.image}}
                  style={styles.imageCinema}
                />
              )}
            </View>
          </TouchableOpacity>
          <Formik
            initialValues={{
              cinemaName: '',
              location: '',
              price: '',
              address: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, {resetForm}) => {
              this.submit(values);
              resetForm();
            }}>
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
                <View style={styles.gap}>
                  <InputText
                    label="Cinema Name"
                    placeholder="Type your cinema name"
                    paddingVertical={10}
                    onChange={handleChange('cinemaName')}
                    onBlur={handleBlur('cinemaName')}
                    value={values.cinemaName}
                  />
                  {errors.cinemaName && touched.cinemaName ? (
                    <Text style={styles.textError}>{errors.cinemaName}</Text>
                  ) : null}
                </View>
                <View style={styles.gap}>
                  <InputText
                    label="Location"
                    placeholder="Type your location"
                    paddingVertical={10}
                    onChange={handleChange('location')}
                    onBlur={handleBlur('location')}
                    value={values.location}
                  />
                  {errors.location && touched.location ? (
                    <Text style={styles.textError}>{errors.location}</Text>
                  ) : null}
                </View>
                <View style={styles.gap}>
                  <InputText
                    label="Price"
                    placeholder="Type your price"
                    paddingVertical={10}
                    keyboardType="numeric"
                    onChange={handleChange('price')}
                    onBlur={handleBlur('price')}
                    value={values.price}
                  />
                  {errors.price && touched.price ? (
                    <Text style={styles.textError}>{errors.price}</Text>
                  ) : null}
                </View>
                <View style={styles.gap}>
                  <InputText
                    multiline={true}
                    numberOfLines={4}
                    label="Address"
                    placeholder="Type your location"
                    paddingVertical={10}
                    onChange={handleChange('address')}
                    onBlur={handleBlur('address')}
                    value={values.address}
                  />
                  {errors.address && touched.address ? (
                    <Text style={styles.textError}>{errors.address}</Text>
                  ) : null}
                </View>
                <View style={styles.gap}>
                  <Button
                    text="Save"
                    padding={15}
                    color={!isValid ? '#D8CCFA' : '#5F2EEA'}
                    onPress={!isValid ? null : handleSubmit}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
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
  cardCinema: {
    borderWidth: 1,
    borderColor: '#A0A3BD',
    padding: 20,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
  },
  imageCinema: {
    width: 72,
    height: 23,
    resizeMode: 'contain',
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
  },
  gap: {
    marginTop: 15,
  },
  textError: {
    fontFamily: 'Mulish-Regular',
    fontSize: 12,
    color: 'red',
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  cinema: state.cinema,
});

const mapDispatchToProps = {createCinema};

export default connect(mapStateToProps, mapDispatchToProps)(CinemaAdmin);
