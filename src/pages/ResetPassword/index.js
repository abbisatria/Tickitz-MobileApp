import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import {connect} from 'react-redux';
import {resetPassword} from '../../redux/actions/auth';
import {showMessage} from '../../helpers/showMessage';
import {Formik} from 'formik';
import * as Yup from 'yup';

import Header from '../../components/Header';
import Button from '../../components/Button';
import InputPassword from '../../components/Form/InputPassword';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, '*Password must have at least 8 characters')
    .max(50, '*Password must be less than 50 characters')
    .required('*Password is required'),
});

class ResetPassword extends Component {
  state = {
    loading: false,
  };
  resetPasswordSend = async (values) => {
    this.setState({loading: true});
    await this.props.resetPassword(
      this.props.auth.tokenResetPassword,
      values.password,
    );
    this.setState({loading: false});
    if (this.props.auth.errorMsg === '') {
      showMessage(this.props.auth.message, 'success');
      this.props.navigation.replace('SignIn');
    } else {
      showMessage(this.props.auth.errorMsg);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Header title="Reset Password" subTitle="Please reset your password" />
        <Formik
          initialValues={{
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => this.resetPasswordSend(values)}>
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
                <InputPassword
                  label="New Password"
                  placeholder="Write your password"
                  onChange={handleChange('password')}
                  onBlur={handleBlur('password')}
                  paddingVertical={10}
                  value={values.password}
                />
                {errors.password && touched.password ? (
                  <Text style={styles.textError}>{errors.password}</Text>
                ) : null}
              </View>
              {this.state.loading ? (
                <ActivityIndicator size="large" color="#000000" />
              ) : (
                <Button
                  text="Reset Password"
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

const mapDispatchToProps = {resetPassword};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
