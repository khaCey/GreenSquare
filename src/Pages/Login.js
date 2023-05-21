import React, { useEffect } from 'react';
import styled from 'styled-components';
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const Login = ({ loginHandler, isLoading }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const employeeID = e.target.elements.employeeID.value;
    const password = e.target.elements.password.value;
    
    console.log(employeeID);
    if (!employeeID || !password) {
      toast.error('Employee number and password are required.');
      return;
    }
  
    try {
      await loginHandler(employeeID, password);
    } catch (error) {
      console.log(error);
      toast.error('Login unsuccessful. Please check your credentials and try again.');
    }
  };
  
  useEffect(() => {
    document.title = 'Green Square - Login';
  }, []);

  return (
    <LoginWrapper>
      <ToastContainer />
      {isLoading && <Loader />}
      <Form onSubmit={handleSubmit}>
        <Input
          name="employeeID"
          type="text"
          placeholder="Employee Name / Number"
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
        />
        <Button type="submit">Login</Button>
      </Form>
    </LoginWrapper>
  );
  
};

export default Login;