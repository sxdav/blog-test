import React from 'react';
import './scss/index.scss';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store';
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App';
import { PersistGate } from 'redux-persist/integration/react';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);