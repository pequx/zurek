import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, responsiveFontSizes } from '@mui/material';
import { orange } from '@material-ui/core/colors';
import { ThemeProvider } from '@emotion/react';

if (module.hot) {
  module.hot.accept();
}

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

let theme = createTheme({
  status: {
    danger: orange[500],
  },
})
theme = responsiveFontSizes(theme)

ReactDOM.render(
  <React.Suspense fallback={<div></div>}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.Suspense>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
