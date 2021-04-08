import React, {Component} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';

import {connect} from 'react-redux';
import {login} from '../../redux/actions/auth';
import {Formik} from 'formik';
import * as Yup from 'yup';

import Header from '../../components/Header';
import Button from '../../components/Button';
import InputText from '../../components/Form/InputText';
import InputPassword from '../../components/Form/InputPassword';
import Footer from '../../components/Footer';
import {showMessage} from '../../helpers/showMessage';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, '*Password must have at least 8 characters')
    .max(50, '*Password must be less than 50 characters')
    .required('*Password is required'),
  email: Yup.string()
    .email('*Must be a valid email address')
    .max(50, '*Email must be less than 100 characters')
    .required('*Email is required'),
});

class SignIn extends Component {
  state = {
    loading: false,
  };
  componentDidMount() {
    if (this.props.route.params) {
      const {activate} = this.props.route.params;
      if (activate) {
        showMessage('Account activation is successful', 'success');
      }
    }
  }
  login = async (values) => {
    this.setState({loading: true});
    const {email, password} = values;
    await this.props.login(email, password);
    if (this.props.auth.token) {
      this.setState({loading: false});
      showMessage('Login Success', 'success');
      if (this.props.auth.user.role !== 1) {
        this.props.navigation.navigate('Home');
      } else {
        this.props.navigation.navigate('Admin');
      }
    } else {
      this.setState({loading: false});
      showMessage(this.props.auth.errorMsg);
    }
  };
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Header title="Sign In" />
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => this.login(values)}>
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
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  {errors.email && touched.email ? (
                    <Text style={styles.textError}>{errors.email}</Text>
                  ) : null}
                  <View style={styles.gap} />
                  <InputPassword
                    label="Password"
                    placeholder="Write your password"
                    onChange={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    paddingVertical={10}
                  />
                  {errors.password && touched.password ? (
                    <Text style={styles.textError}>{errors.password}</Text>
                  ) : null}
                </View>
                {this.state.loading ? (
                  <ActivityIndicator size="large" color="#000000" />
                ) : (
                  <Button
                    text="Sign In"
                    color={!isValid ? '#D8CCFA' : '#5F2EEA'}
                    onPress={!isValid ? null : handleSubmit}
                    disabled={!isValid}
                  />
                )}
              </>
            )}
          </Formik>
          <Footer
            title="Forgot your password?"
            textLink="Reset now"
            onPress={() => this.props.navigation.navigate('ForgotPassword')}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    backgroundColor: 'white',
  },
  form: {
    marginVertical: 40,
  },
  gap: {
    height: 25,
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

const mapDispatchToProps = {login};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
