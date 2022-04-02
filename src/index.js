import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import './index.css';
import App from './App';

import reportWebVitals from './reportWebVitals';
import store from './redux/store';
import { createTheme, ThemeProvider } from '@mui/material';

const firebaseConfig = {
  apiKey: 'AIzaSyCKlGcRJ7n1xbLnIGQObIiGanICztxmuG4',
  authDomain: 'managerz-ob.firebaseapp.com',
  projectId: 'managerz-ob',
  storageBucket: 'managerz-ob.appspot.com',
  messagingSenderId: '639216437398',
  appId: '1:639216437398:web:54a07f1cdee98766a65ab7',
  measurementId: 'G-MDRHJ624H3',
};
initializeApp(firebaseConfig);

const theme = createTheme({
  palette: {
    primary: {
      light: '#8af293',
      main: '#5cc465',
      dark: '#0a7001',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fff069',
      main: '#fccf38',
      dark: '#d47304',
      contrastText: '#000',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
