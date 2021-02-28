import React, {Component} from 'react';
import {ScrollView, View, StyleSheet, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {resetPassword} from '../../redux/actions/auth';
import {showMessage} from '../../helpers/showMessage';

import Header from '../../components/Header';
import Button from '../../components/Button';
import InputPassword from '../../components/Form/InputPassword';

class ResetPassword extends Component {
  state = {
    password: '',
    loading: false,
  };
  resetPasswordSend = async () => {
    this.setState({loading: true});
    await this.props.resetPassword(
      this.props.auth.tokenResetPassword,
      this.state.password,
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Header
            title="Reset Password"
            subTitle="Please reset your password"
          />
          <View style={styles.form}>
            <InputPassword
              label="New Password"
              placeholder="Write your password"
              onChange={(password) => this.setState({password})}
              paddingVertical={10}
            />
          </View>
          {this.state.loading ? (
            <ActivityIndicator size="large" color="#000000" />
          ) : (
            <Button
              text="Reset Password"
              onPress={() => this.resetPasswordSend()}
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

const mapDispatchToProps = {resetPassword};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
