import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import {connect} from 'react-redux';
import {forgotPassword} from '../../redux/actions/auth';
import {showMessage} from '../../helpers/showMessage';
import * as Yup from 'yup';
import {Formik} from 'formik';

import Header from '../../components/Header';
import Button from '../../components/Button';
import InputText from '../../components/Form/InputText';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('*Must be a valid email address')
    .max(50, '*Email must be less than 100 characters')
    .required('*Email is required'),
});

class ForgotPassword extends Component {
  state = {
    loading: false,
  };
  forgotPasswordSend = async (values) => {
    this.setState({loading: true});
    await this.props.forgotPassword(values.email);
    this.setState({loading: false});
    if (this.props.auth.tokenResetPassword) {
      showMessage(this.props.auth.message, 'success');
      this.props.navigation.navigate('ResetPassword');
    } else {
      showMessage(this.props.auth.errorMsg);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Header
          title="Forgot Password"
          subTitle="we'll send a link to your email shortly"
        />
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => this.forgotPasswordSend(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
            touched,
          }) => (
            <>
              <View style={styles.form}>
                <InputText
                  label="Email"
                  placeholder="Write your email"
                  keyboardType="email-address"
                  onChange={handleChange('email')}
                  handleBlur={handleBlur('email')}
                  value={values.email}
                />
                {errors.email && touched.email ? (
                  <Text style={styles.textError}>{errors.email}</Text>
                ) : null}
              </View>
              {this.state.loading ? (
                <ActivityIndicator size="large" color="#000000" />
              ) : (
                <Button
                  text="Active Now"
                  color={!isValid ? '#D8CCFA' : '#5F2EEA'}
                  onPress={!isValid ? null : handleSubmit}
                  disabled={!isValid}
                />
              )}
            </>
          )}
        </Formik>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    backgroundColor: 'white',
  },
  form: {
    marginVertical: 40,
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

const mapDispatchToProps = {forgotPassword};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
