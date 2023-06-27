import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { toast } from 'react-toastify';

import styled from 'styled-components';
import axios from 'axios';

import { useSession } from './hooks/useSession'; // import the hook
import { EmployeeDataContext } from './contexts/EmployeeDataContext'; // import the context

import Login from './Pages/Login';
import LandingPage from './Pages/LandingPage';
import Loader from './Components/Loader';

import './style.css';


const loadingTime = 1500;

const App = () => {
  const [employeeData, setEmployeeData] = useContext(EmployeeDataContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const { startSession, endSession } = useSession(30 * 60 * 1000, setIsAuthenticated, setEmployeeData, employeeData, isAuthenticated);

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

  const handleLogin = (employeeID, password) => {
    setLoading(true);
    console.log(process.env.REACT_APP_API_URL);
    console.log(process.env.REACT_APP_API_KEY);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}employee/login`,
        {
          id: employeeID,
          password: password,
        },
        {
          headers: { 'x-api-key': process.env.REACT_APP_API_KEY },
        }
      )
      .then((response) => {
    
        if (response.data.success) {  // check if the login was successful
          // Fetch employee data after successful login
          axios
            .get(`${process.env.REACT_APP_API_URL}employee/${employeeID}`, {
              headers: { 'x-api-key': process.env.REACT_APP_API_KEY },
            })
            .then((response) => {
              const employeeData = response.data;
              setEmployeeData(employeeData); // Save the employee data
              localStorage.setItem('employeeData', JSON.stringify(employeeData)); // Store employee data in localStorage
              setTimeout(() => {
                setIsAuthenticated(true);
                setLoading(false);
                startSession(); // start the session when logging in
              }, loadingTime);
            })
            .catch((error) => {
              console.error('Error fetching employee data: ', error);
              setLoading(false);
              toast.error('Error fetching employee data. Please try again later.');
            });
        } else {
          throw new Error('Login unsuccessful. Please check your credentials and try again.'); 
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error('Login unsuccessful. Please check your credentials and try again.');
      });
  };
  

  return (
    <Router>
      <Container>
        {loading && <Loader />}
        {!isAuthenticated && (
          <Login
            isAuthenticated={isAuthenticated}
            loginHandler={handleLogin}
          />
        )}
        {isAuthenticated && (
          <LandingPage 
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
