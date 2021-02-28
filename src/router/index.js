import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';

import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Home from '../pages/Home';
import MovieDetail from '../pages/MovieDetail';
import Order from '../pages/Order';
import Payment from '../pages/Payment';
import Ticket from '../pages/Ticket';
import Profile from '../pages/Profile';
import ViewAllMovie from '../pages/ViewAllMovie';
import ViewAllUpComing from '../pages/ViewAllUpComing';
import Admin from '../pages/Admin';
import Navbar from '../components/Navbar';

const Stack = createStackNavigator();

class Router extends Component {
  render() {
    return (
      <Stack.Navigator
        screenOptions={{header: (props) => <Navbar {...props} />}}>
        {this.props.auth.token === null && (
          <>
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPassword}
              options={{headerShown: false}}
            />
          </>
        )}
        {this.props.auth.user !== null && this.props.auth.user.role === 1 && (
          <Stack.Screen name="Admin" component={Admin} />
        )}
        {this.props.auth.token !== null && (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Details" component={MovieDetail} />
            <Stack.Screen name="Order" component={Order} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="Ticket" component={Ticket} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="ViewAllMovie" component={ViewAllMovie} />
            <Stack.Screen name="ViewAllUpComing" component={ViewAllUpComing} />
          </>
        )}
      </Stack.Navigator>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Router);
