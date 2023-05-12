import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import Login from './Pages/Login';
import DisplayPage from './Pages/DisplayPage';
import Loader from './Pages/Loader';
import axios from 'axios';
import './style.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSession } from './hooks/useSession'; // import the hook
import { EmployeeDataContext } from './contexts/EmployeeDataContext'; // import the context

const loadingTime = 1500;

const App = () => {
  const [employeeData, setEmployeeData] = useContext(EmployeeDataContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const { startSession, endSession } = useSession(30 * 60 * 1000, setIsAuthenticated); // use the hook

  useEffect(() => {
    const storedEmployeeData = localStorage.getItem('employeeData');
    if (storedEmployeeData) {
      setEmployeeData(JSON.parse(storedEmployeeData));
    }
  }, [setEmployeeData]);

  const handleLogout = () => {
    setLoading(true);
    endSession(); // call endSession when logging out
    setTimeout(() => {
      setIsAuthenticated(false);
      setLoading(false);
    }, loadingTime);
  };

  const handleLogin = (employeeID, password, debug) => {
    setLoading(true);
    if (debug) {
      setTimeout(() => {
        setIsAuthenticated(true);
        setDebugMode(debug);
        setLoading(false);
        startSession(); // start the session when logging in
      }, loadingTime);
    } else {
      axios
        .post(
          `http://localhost:8080/api/v1/employee/login`,
          {
            id: employeeID,
            password: password,
          },
          {
            headers: { 'x-api-key': '34be70f8-aef9-47bd-8f8a-674503d24e73' },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            // Fetch employee data after successful login
            axios
              .get(`http://localhost:8080/api/v1/employee/${employeeID}`, {
                headers: { 'x-api-key': '34be70f8-aef9-47bd-8f8a-674503d24e73' },
              })
              .then((response) => {
                const employeeData = response.data;
                setEmployeeData(employeeData); // Save the employee data
                localStorage.setItem('employeeData', JSON.stringify(employeeData)); // Store employee data in localStorage
                setTimeout(() => {
                  setIsAuthenticated(true);
                  setDebugMode(debug);
                  setLoading(false);
                  startSession(); // start the session when logging in
                }, loadingTime);
              })
              .catch((error) => {
                console.error('Error fetching employee data: ', error);
                setLoading(false);
              });
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  };

  return (
    <Router>
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
          <DisplayPage 
            logoutHandler={handleLogout} 
            employeeData={employeeData}  // Pass the employee data as a prop
          />
        )} 
      </Container>
    </Router>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export default App;