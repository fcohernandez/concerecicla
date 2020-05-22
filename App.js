import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';

import Index from './src/screens/Index';

const store = configureStore();


export default function App() {
  return (
    <Provider store={store}>
      <Index/>
    </Provider>
  );
}


