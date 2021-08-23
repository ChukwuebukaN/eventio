import React, { useEffect } from 'react';
import './styles/onboarding.css';
import './styles/dashboard.css';
import Routes from './routes';
import { useHistory } from 'react-router-dom';
// import { useSelector } from "react-redux";
// import { accessUser } from './redux/auth/authSlice';
import { NonAuthRoutes } from './constants';
import authHandler from './authHandler';

function App() {
  const authenticated = authHandler.get();
  const history = useHistory();

  useEffect(() => {
    const ac = new AbortController();

    if (authenticated === '') return;
    history.push(NonAuthRoutes.signin);

    return function cleanup() {
        ac.abort();
    }
  }, [history, authenticated])

  return (
    <div>
      <Routes />
    </div>
  )
}

export default App;
