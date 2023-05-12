import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Loader from './Loader';

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #212529;
  color: #8B8E90;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid #BDCDD6;
  width: 300px;
  background-color: #2B2F33;
  color: white;
  &:focus {
    outline: 2px solid #BDCDD6;
  }
`;

const Button = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px;
  cursor: pointer;
`;

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
`;

const ToggleLabel = styled.span`
  margin-right: 10px;
`;

const ToggleInput = styled.input`
  margin-right: 10px;
`;

const API_KEY = '34be70f8-aef9-47bd-8f8a-674503d24e73'; // Replace with your actual API key

const Login = ({loginHandler, debugMode, isLoading }) => {
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmployeeNumberChange = (e) => {
    console.log(e.target.value);
    setEmployeeNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      loginHandler(employeeNumber, password, debugMode);
    } catch (error) {
      // handle error
      console.log(error);
    }
  };

  const handleToggleDebugMode = () => {
    loginHandler(employeeNumber, password, !debugMode);
  };
  
  useEffect(() => {
    document.title = "Green Square - Login";
  }, []);

  return (
    <LoginWrapper>
      {isLoading && <Loader />}
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Employee Name / Number"
          value={employeeNumber}
          onChange={handleEmployeeNumberChange}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button type="submit">Login</Button>
      </Form>
      <ToggleWrapper>
        <ToggleLabel>Debug Mode:</ToggleLabel>
        <ToggleInput
          type="checkbox"
          checked={debugMode}
          onChange={handleToggleDebugMode}
        />
      </ToggleWrapper>
    </LoginWrapper>
  );
};
export default Login;
