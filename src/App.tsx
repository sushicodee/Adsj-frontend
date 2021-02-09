import React from 'react';
import { Provider } from 'react-redux';
import './App.scss';
import Header from './components/header/Header';
import { store } from './redux/store/store';
import Routes from './routes/Routes';
import { BrowserRouter as Router } from 'react-router-dom';
// import Footer from './components/footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Footer from 'components/footer/Footer';
import { CssBaseline } from '@material-ui/core';
import { AuthProvider } from 'context/authContext';
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ff8e8c',
      main: '#ff5a5f',
      dark: '#c62035',
      contrastText: '#fff',
    },
    secondary: {
      light: '#4da9b7',
      main: '#017a87',
      dark: '#004e5a',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: ['Montserrat', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    button: {
      fontFamily: ['Montserrat', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    },
  },
});
interface IProps {}

const App: React.FC<IProps> = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Router>
          <Provider store={store}>
            <AuthProvider>
              <CssBaseline />
              <div className='header-wrapper'>
                <Header />
              </div>
              <div className='body-wrapper'>
                <Routes />
              </div>
              <div className='footer-wrapper'>
                <Footer />
              </div>
              <ToastContainer
                containerId='toast-container-4646'
                draggable={false}
              />
            </AuthProvider>
          </Provider>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
