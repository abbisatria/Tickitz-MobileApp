import React from 'react'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import Router from './src/router'
import {Provider} from 'react-redux'
import persistedStore from './src/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import FlashMessage from 'react-native-flash-message'

const App = () => {
  const { store, persistor } = persistedStore()
  return (
    <NavigationContainer>
      <PersistGate persistor={persistor} />
      <Provider store={store}>
        <Router />
        <FlashMessage position="top" />
      </Provider>
    </NavigationContainer>
  )
}

export default App
