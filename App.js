import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {LogBox, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/redux/store/store';
import Router from './src/router';

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs(true);
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar backgroundColor="#000" barStyle="light-content" />
        <Router />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
