import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Pressable,
  Modal,
} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {connect} from 'react-redux';
import {updateProfile, deletePhoto} from '../../redux/actions/auth';
import {REACT_APP_API_URL as API_URL} from '@env';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {showMessage} from '../../helpers/showMessage';
import {Formik} from 'formik';
import * as Yup from 'yup';

import InputText from '../Form/InputText';
import InputPassword from '../Form/InputPassword';
import InputNumber from '../Form/InputNumber';
import Button from '../Button';
import FooterHome from '../FooterHome';

import Stars from '../../assets/icons/ic-stars.svg';
import PhotoProfile from '../../assets/images/profile.jpg';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, '*Full Name must have at least 2 characters')
    .max(50, '*Full name must be less than 50 characters')
    .required('*Full name is required'),
  email: Yup.string()
    .email('*Must be a valid email address')
    .max(50, '*Email must be less than 100 characters')
    .required('*Email is required'),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('*Phone number is required'),
});

class DetailProfile extends Component {
  state = {
    loading: false,
    modalVisible: false,
  };
  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };
  addPhotoCamera = () => {
    this.setState({loading: true, modalVisible: false});
    launchCamera(
      {
        quality: 0.3,
      },
      async (response) => {
        if (response.didCancel) {
          showMessage('User cancelled upload image');
          this.setState({loading: false});
        } else if (response.errorMessage) {
          showMessage('Image Error: ', response.errorMessage);
          this.setState({loading: false});
        } else if (response.fileSize >= 1 * 1024 * 1024) {
          showMessage('Image to large');
          this.setState({loading: false});
        } else {
          const dataImage = {
            uri: response.uri,
            type: response.type,
            name: response.fileName,
          };
          await this.props.updateProfile(
            this.props.auth.token,
            this.props.auth.user.id,
            {file: dataImage},
          );
          this.setState({loading: false});
          showMessage(this.props.auth.message, 'success');
        }
      },
    );
  };
  addPhotoGallery = () => {
    this.setState({loading: true, modalVisible: false});
    launchImageLibrary({}, async (response) => {
      if (response.didCancel) {
        showMessage('User cancelled upload image');
        this.setState({loading: false});
      } else if (response.errorMessage) {
        showMessage('Image Error: ', response.errorMessage);
        this.setState({loading: false});
      } else if (response.fileSize >= 1 * 1024 * 1024) {
        showMessage('Image to large');
        this.setState({loading: false});
      } else {
        const dataImage = {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        };
        await this.props.updateProfile(
          this.props.auth.token,
          this.props.auth.user.id,
          {file: dataImage},
        );
        this.setState({loading: false});
        showMessage(this.props.auth.message, 'success');
      }
    });
  };
  updatePersonalInfo = async (values) => {
    this.setState({loading: true});
    const {token, user} = this.props.auth;
    const {fullName, email, phoneNumber} = values;
    const splitFullname = fullName.split(' ');
    if (splitFullname.length > 1) {
      await this.props.updateProfile(token, user.id, {
        firstname: splitFullname[0],
        lastname: splitFullname.splice(1, splitFullname.length).join(' '),
        email: email,
        phoneNumber: phoneNumber,
      });
      if (this.props.auth.errorMsg === '') {
        showMessage(this.props.auth.message, 'success');
        this.setState({loading: false});
      } else {
        showMessage(this.props.auth.errorMsg);
        this.setState({loading: false});
      }
    } else {
      await this.props.updateProfile(token, user.id, {
        firstname: splitFullname[0],
        lastname: ' ',
        email: email,
        phoneNumber: phoneNumber,
      });
      if (this.props.auth.errorMsg === '') {
        showMessage(this.props.auth.message, 'success');
        this.setState({loading: false});
      } else {
        showMessage(this.props.auth.errorMsg);
        this.setState({loading: false});
      }
    }
  };
  passwordValidation(values) {
    const errors = {};
    const {password, confirmPassword} = values;

    if (!password) {
      errors.msg = 'New Password Required';
    } else if (!confirmPassword) {
      errors.msg = 'Repeat your new password';
    } else if (password.length < 8 || confirmPassword.length < 8) {
      errors.msg = 'Password have at least 8 characters';
    } else if (password !== confirmPassword) {
      errors.msg = 'New password & repeat password not same';
    }
    return errors;
  }
  updatePassword = async (values) => {
    this.setState({loading: true});
    const {token, user} = this.props.auth;
    const {password} = values;
    await this.props.updateProfile(token, user.id, {
      password: password,
    });
    showMessage(this.props.auth.message, 'success');
    this.setState({loading: false});
  };
  deletePhoto = async () => {
    this.setState({loading: true});
    const {token, user} = this.props.auth;
    await this.props.deletePhoto(token, user.id);
    if (this.props.auth.errorMsg === '') {
      this.setState({loading: false, modalVisible: false});
      showMessage(this.props.auth.message, 'success');
    } else {
      this.setState({loading: false, modalVisible: false});
      showMessage(this.props.auth.errorMsg);
    }
  };
  render() {
    const {modalVisible} = this.state;
    const {auth} = this.props;
    return (
      <>
        {auth.token && (
          <ScrollView style={styles.scene} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <View style={styles.card}>
                <View style={styles.row}>
                  <Text style={styles.textInfo}>INFO</Text>
                  <Text style={styles.info}>...</Text>
                </View>
                <View style={styles.rowImage}>
                  <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                    {auth.user.image && auth.user.image !== 'null' ? (
                      <Image
                        source={{
                          uri: `${API_URL}uploads/users/${auth.user.image}`,
                        }}
                        style={styles.image}
                      />
                    ) : (
                      <Image source={PhotoProfile} style={styles.image} />
                    )}
                  </TouchableOpacity>
                  {this.state.loading ? (
                    <ActivityIndicator size="large" color="#000000" />
                  ) : auth.errorMsg !== '' ? (
                    <Text>{auth.errorMsg}</Text>
                  ) : null}
                  <Text style={styles.name}>
                    {auth.user.firstname
                      ? `${auth.user.firstname} ${auth.user.lastname}`
                      : 'No Name'}
                  </Text>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      this.setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <Pressable
                          style={[styles.button, styles.buttonLink]}
                          onPress={() => this.addPhotoCamera()}>
                          <Text style={styles.textStyle}>Camera</Text>
                        </Pressable>
                        <View style={styles.gap} />
                        <Pressable
                          style={[styles.button, styles.buttonLink]}
                          onPress={() => this.addPhotoGallery()}>
                          <Text style={styles.textStyle}>Gallery</Text>
                        </Pressable>
                        <View style={styles.gap} />
                        <Pressable
                          style={[styles.button, styles.buttonDelete]}
                          onPress={() => this.deletePhoto()}>
                          <Text style={styles.textStyle}>
                            Delete Photo Profile
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  </Modal>
                  <Text style={styles.moviegoers}>Moviegoers</Text>
                </View>
                <View style={styles.line} />
                <Text style={styles.loyalty}>Loyalty Points</Text>
                <View style={styles.cardLoyalty}>
                  <View style={styles.row}>
                    <Text style={styles.textMoviegoer}>Moviegoers</Text>
                    <Stars />
                  </View>
                  <Text style={styles.numPoint}>
                    320<Text style={styles.textPoint}> points</Text>
                  </Text>
                </View>
                <View style={styles.rowProgres}>
                  <Text style={styles.textMaster}>
                    180 points become a master
                  </Text>
                </View>
                <ProgressBar
                  progress={0.5}
                  color="#5F2EEA"
                  style={styles.progress}
                />
              </View>
              <Text style={styles.account}>Account Setting</Text>
              <View style={styles.card}>
                <Text style={styles.detailInfo}>Detail Information</Text>
                <View style={styles.line} />
                <Formik
                  initialValues={{
                    fullName: `${
                      auth.user.firstname
                        ? `${auth.user.firstname} ${auth.user.lastname}`
                        : ''
                    }`,
                    email: auth.user.email,
                    phoneNumber: auth.user.phoneNumber
                      ? auth.user.phoneNumber
                      : '',
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values) => this.updatePersonalInfo(values)}>
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    isValid,
                    touched,
                  }) => (
                    <View>
                      <InputText
                        label="Full Name"
                        value={values.fullName}
                        placeholder="Type your full name"
                        paddingVertical={12}
                        onChange={handleChange('fullName')}
                        onBlur={handleBlur('fullName')}
                      />
                      {errors.fullName && touched.fullName ? (
                        <Text style={styles.textError}>{errors.fullName}</Text>
                      ) : null}
                      <View style={styles.gap} />
                      <InputText
                        label="Email"
                        keyboardType="email-address"
                        value={values.email}
                        placeholder="Type your email"
                        paddingVertical={12}
                        onChange={handleChange('email')}
                        onBlur={handleBlur('email')}
                      />
                      {errors.email && touched.email ? (
                        <Text style={styles.textError}>{errors.email}</Text>
                      ) : null}
                      <View style={styles.gap} />
                      <InputNumber
                        label="Phone Number"
                        value={values.phoneNumber}
                        placeholder="Type your phone"
                        onChange={handleChange('phoneNumber')}
                        onBlur={handleBlur('phoneNumber')}
                      />
                      {errors.phoneNumber && touched.phoneNumber ? (
                        <Text style={styles.textError}>
                          {errors.phoneNumber}
                        </Text>
                      ) : null}
                      <View style={styles.gap} />
                      {this.state.loading ? (
                        <ActivityIndicator size="large" color="#000000" />
                      ) : (
                        <Button
                          text="Update changes"
                          color={!isValid ? '#D8CCFA' : '#5F2EEA'}
                          onPress={!isValid ? null : handleSubmit}
                        />
                      )}
                    </View>
                  )}
                </Formik>
              </View>
              <View style={styles.card}>
                <Text style={styles.detailInfo}>Account and Privacy</Text>
                <View style={styles.line} />
                <Formik
                  initialValues={{
                    password: '',
                    confirmPassword: '',
                  }}
                  validate={(values) => this.passwordValidation(values)}
                  onSubmit={(values, {resetForm}) => {
                    this.updatePassword(values);
                    resetForm();
                  }}>
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                  }) => (
                    <View>
                      <InputPassword
                        label="New Password"
                        placeholder="New password"
                        value={values.password}
                        paddingVertical={1}
                        onChange={handleChange('password')}
                        onBlur={handleBlur('password')}
                      />
                      <View style={styles.gap} />
                      <InputPassword
                        label="Confirm Password"
                        placeholder="Confirm password"
                        value={values.confirmPassword}
                        paddingVertical={1}
                        onChange={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                      />
                      {errors.msg ? (
                        <Text style={styles.textError}>{errors.msg}</Text>
                      ) : null}
                      <View style={styles.gap} />
                      {this.state.loading ? (
                        <ActivityIndicator size="large" color="#000000" />
                      ) : (
                        <Button
                          text="Update changes"
                          color={
                            values.password === '' ||
                            values.confirmPassword === '' ||
                            errors.msg
                              ? '#D8CCFA'
                              : '#5F2EEA'
                          }
                          onPress={
                            values.password === '' ||
                            values.confirmPassword === '' ||
                            errors.msg
                              ? null
                              : handleSubmit
                          }
                        />
                      )}
                    </View>
                  )}
                </Formik>
              </View>
            </View>
            <View style={styles.containerFooter}>
              <FooterHome />
            </View>
          </ScrollView>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  card: {
    marginTop: 32,
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInfo: {
    fontSize: 16,
    fontFamily: 'Mulish-Regular',
    color: '#4E4B66',
  },
  info: {
    fontSize: 20,
    fontFamily: 'Mulish-Regular',
    color: '#5F2EEA',
  },
  rowImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 32,
  },
  image: {
    width: 136,
    height: 136,
    borderRadius: 68,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 20,
    fontFamily: 'Mulish-SemiBold',
    color: '#14142B',
    marginTop: 32,
    marginBottom: 4,
  },
  moviegoers: {
    fontSize: 14,
    fontFamily: 'Mulish-Regular',
    color: '#4E4B66',
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#DEDEDE',
    marginBottom: 40,
  },
  cardLoyalty: {
    backgroundColor: '#5F2EEA',
    marginVertical: 24,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
  },
  textMoviegoer: {
    fontSize: 18,
    fontFamily: 'Mulish-Bold',
    color: 'white',
  },
  loyalty: {
    fontSize: 16,
    fontFamily: 'Mulish-SemiBold',
    color: '#4E4B66',
  },
  numPoint: {
    fontSize: 24,
    fontFamily: 'Mulish-Regular',
    color: 'white',
  },
  textPoint: {
    fontSize: 10,
    fontFamily: 'Mulish-Regular',
    color: 'white',
  },
  rowProgres: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMaster: {
    fontSize: 16,
    fontFamily: 'Mulish-Regular',
    color: '#4E4B66',
    marginBottom: 5,
  },
  account: {
    fontSize: 18,
    fontFamily: 'Mulish-SemiBold',
    color: '#14142B',
    marginTop: 48,
  },
  detailInfo: {
    fontSize: 16,
    fontFamily: 'Mulish-Regular',
    color: '#14142B',
    marginBottom: 8,
  },
  containerFooter: {
    paddingHorizontal: 24,
    backgroundColor: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonLink: {
    backgroundColor: '#5F2EEA',
  },
  buttonDelete: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  progress: {
    borderRadius: 2,
    height: 5,
  },
  gap: {
    height: 24,
  },
  textError: {
    fontFamily: 'Mulish-Regular',
    fontSize: 12,
    color: 'red',
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {updateProfile, deletePhoto};

export default connect(mapStateToProps, mapDispatchToProps)(DetailProfile);
