import {StyleSheet} from 'react-native';
import React from 'react';
import Main from './src/Main';
import {Provider} from 'react-redux';
import { store } from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
