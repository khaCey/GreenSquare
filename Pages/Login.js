import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from './Loader';

const Container = styled.div`
  border-radius: 1em;
  width: 85%;
  height: 100vh;
  background-color: #212529;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  background-color: #2B2F33;
  padding: 3em;
  border-radius: 1em;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  border: none;
  width: 300px;
  background-color: #3d434b;
  color: white;
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
  border-radius: 5px;
`;

const Login = ({ isAuthenticated, loginHandler, debugMode, isLoading }) => {
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleEmployeeNumberChange = (e) => {
    setEmployeeNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginHandler(employeeNumber, password, debugMode);
  };

  return (
    <Container>
      {isLoading && <Loader />}
      <Form
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
      >
        <Input
          type="text"
          placeholder="Employee Number"
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
    </Container>
  );
};

export default Login;
