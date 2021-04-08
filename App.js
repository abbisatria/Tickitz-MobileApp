import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/router';
import {Provider} from 'react-redux';
import persistedStore from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import SplashScreen from 'react-native-splash-screen';
import PushNotification from 'react-native-push-notification';
import Linking from './src/router/Linking';

PushNotification.createChannel(
  {
    channelId: 'general',
    channelName: 'General Notification',
    channelDescription: 'A channel to categorise your notifications',
    playSound: false,
    soundName: 'default',
    importance: 4,
    vibrate: true,
  },
  (created) => console.log(`createChannel returned '${created}'`),
);

class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    const {store, persistor} = persistedStore();
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} />
        <NavigationContainer linking={Linking}>
          <Router />
          <FlashMessage position="top" duration={3000} />
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
