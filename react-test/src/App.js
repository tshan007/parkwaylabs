import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';
import AppRouter from './router/AppRouter';
import './App.css';
import 'semantic-ui-css/semantic.min.css'

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);

export default App;
