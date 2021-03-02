import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Logo from '../../assets/images/logo.png';
import {connect} from 'react-redux';

class SplashScreen extends Component {
  componentDidMount() {
    setTimeout(() => {
      if (this.props.auth.token) {
        this.props.navigation.reset({index: 0, routes: [{name: 'Home'}]});
      } else {
        this.props.navigation.replace('SignUp');
      }
    }, 500);
  }
  render() {
    return (
      <View style={styles.row}>
        <Image source={Logo} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(SplashScreen);
