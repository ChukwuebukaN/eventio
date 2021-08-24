import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from './redux/index';
import { Provider } from 'react-redux';
import { signinUser } from './redux/auth/authSlice';
import authHandler from './authHandler';
import { useWindowResize } from './useWindowResize';
import { setIsMobile } from './redux/user/userSlice';

let store = configureStore;
let TOKEN = authHandler.get()
let isAuthenticated = localStorage.getItem('isAuthenticated')

/** React Redux setup, handles user Authorization and Signed In Users*/
const Root = () => {
  const { width } = useWindowResize();
  
  useEffect(() => {
    const ac = new AbortController();

    if (width < 1025) {
      store.dispatch(setIsMobile(true));
      localStorage.setItem('userMobile', true);
    } else {
      store.dispatch(setIsMobile(false));
      localStorage.setItem('userMobile', false);
    }

    return () => {
        ac.abort();
    }
}, [width]);
    
  return (
    <Provider store={store}>
      <Router>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Router>
    </Provider>
  )
}

const Render = () => {
  ReactDOM.render(<Root />, document.getElementById('root'));
}

if (TOKEN) {
  store.dispatch(signinUser({
      token: TOKEN,
      isSignedIn: isAuthenticated
  }));
  Render();
} else {
  Render();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
