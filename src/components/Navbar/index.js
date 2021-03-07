import React, {Component} from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Button from '../Button';
import {connect} from 'react-redux';
import {logout} from '../../redux/actions/auth';
import {clearOrder} from '../../redux/actions/order';
import {REACT_APP_API_URL as API_URL} from '@env';

import Logo from '../../assets/images/logo.svg';
import Menu from '../../assets/icons/ic-menu.svg';
import Profile from '../../assets/images/profile.jpg';

class Navbar extends Component {
  state = {
    headerShown: false,
  };
  show = () => {
    this.setState({headerShown: !this.state.headerShown});
  };
  signOut = async () => {
    await this.props.clearOrder();
    await this.props.logout();
    this.setState({headerShown: false});
    this.props.navigation.reset({index: 0, routes: [{name: 'SignIn'}]});
  };
  signUp = () => {
    this.setState({headerShown: false});
    this.props.navigation.navigate('SignUp');
  };
  render() {
    return (
      <View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.reset({index: 0, routes: [{name: 'Home'}]})
            }>
            <Logo />
          </TouchableOpacity>
          {this.props.auth.token ? (
            this.props.auth.user.image === null ||
            this.props.auth.user.image === 'null' ? (
              <TouchableOpacity onPress={() => this.show()}>
                <Image source={Profile} style={styles.profile} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => this.show()}>
                <Image
                  source={{
                    uri: `${API_URL}uploads/users/${this.props.auth.user.image}`,
                  }}
                  style={styles.profile}
                />
              </TouchableOpacity>
            )
          ) : (
            <TouchableOpacity onPress={() => this.show()}>
              <Menu />
            </TouchableOpacity>
          )}
        </View>
        {this.state.headerShown && (
          <View style={styles.menu}>
            {this.props.auth.token ? (
              <>
                <View style={styles.line} />
                <TouchableOpacity
                  onPress={() => {
                    this.setState({headerShown: false});
                    this.props.navigation.navigate('Profile');
                  }}>
                  <Text style={styles.textMenu}>Profile</Text>
                </TouchableOpacity>
                <View style={styles.line} />
                {this.props.auth.user.role === 1 && (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({headerShown: false});
                        this.props.navigation.navigate('Admin');
                      }}>
                      <Text style={styles.textMenu}>Dashboard</Text>
                    </TouchableOpacity>
                    <View style={styles.line} />
                  </>
                )}
                <View style={styles.gap} />
                <TouchableOpacity
                  onPress={() => this.signOut()}
                  style={styles.button}>
                  <Button text="Sign Out" padding={5} />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                onPress={() => this.signUp()}
                style={styles.button}>
                <Button text="Sign Up" padding={5} />
              </TouchableOpacity>
            )}
            <Text style={styles.copyRight}>
              © 2020 Tickitz. All Rights Reserved.
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {logout, clearOrder};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

const styles = StyleSheet.create({
  parent: {
    position: 'relative',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 15,
    elevation: 1,
    backgroundColor: 'white',
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  menu: {
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    top: 60,
    paddingVertical: 15,
    elevation: 1,
  },
  textMenu: {
    fontSize: 16,
    fontFamily: 'Mulish-SemiBold',
    marginTop: 10,
    textAlign: 'center',
    color: '#14142B',
    marginBottom: 10,
  },
  gap: {
    height: 20,
  },
  copyRight: {
    fontSize: 13,
    fontFamily: 'Mulish-Regular',
    color: '#6E7191',
    textAlign: 'center',
    marginTop: 30,
  },
  button: {
    marginHorizontal: 24,
  },
  line: {
    height: 1,
    backgroundColor: '#DEDEDE',
  },
});
