import React, { useState } from 'react';
import styled from 'styled-components';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Loader from './Pages/Loader';
import axios from 'axios';
import './style.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (employeeNumber, password, debug) => {
    setLoading(true);

    // Send login request
    axios
      .post(
        '/api/login',
        {
          employeeNumber,
          password,
        },
        {
          headers: { 'X-API-KEY': 'your-api-key' },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          setIsAuthenticated(true);
          setDebugMode(debug);
        }
      })
      .catch((error) => {
        setLoading(false);
        // Handle error
      });
  };

  return (
    <Container>
      {loading && <Loader />}
      {!isAuthenticated && (
        <Login
          isAuthenticated={isAuthenticated}
          loginHandler={handleLogin}
          debugMode={debugMode}
        />
      )}
      {isAuthenticated && (
        <Dashboard isAuthenticated={isAuthenticated} debugMode={debugMode} />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  outline: 1px solid blue;
`;

export default App;
