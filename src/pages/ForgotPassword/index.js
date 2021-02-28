import React, {Component} from 'react';
import {ScrollView, View, StyleSheet, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {forgotPassword} from '../../redux/actions/auth';
import {showMessage} from '../../helpers/showMessage';

import Header from '../../components/Header';
import Button from '../../components/Button';
import InputText from '../../components/Form/InputText';

class ForgotPassword extends Component {
  state = {
    email: '',
    loading: false,
  };
  forgotPasswordSend = async () => {
    this.setState({loading: true});
    await this.props.forgotPassword(this.state.email);
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Header
            title="Forgot Password"
            subTitle="we'll send a link to your email shortly"
          />
          <View style={styles.form}>
            <InputText
              label="Email"
              placeholder="Write your email"
              keyboardType="email-address"
              onChange={(email) => this.setState({email})}
            />
          </View>
          {this.state.loading ? (
            <ActivityIndicator size="large" color="#000000" />
          ) : (
            <Button
              text="Active Now"
              onPress={() => this.forgotPasswordSend()}
            />
          )}
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
});

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {forgotPassword};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
