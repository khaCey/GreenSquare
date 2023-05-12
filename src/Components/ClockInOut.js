import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ClockFill } from 'react-bootstrap-icons';
import Modal from 'react-modal';

Modal.setAppElement('#root');  // This line is necessary for accessibility reasons

const ClockInWrapper = styled.div`
`;

const Clock = styled(ClockFill)`
  margin: 0.5em;
`;

const Button = styled(motion.button)`
  background-color: #4CAF50;
  margin-right: 1em;
  width: 9em;
  height: 2em;
  border: none;
  color: white;
  border-radius: 0.25em;
  text-decoration: none;
  font-size: 1em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: stretch;
`;

const Text = styled.div`
  
`;

const ClockOutButton = styled(Button)`
  background-color: #FF4136;
`;

const ClockIn = ({ employeeID }) => {
  const [clockedIn, setClockedIn] = useState(false);

  const handleClockInOut = () => {
    // Define the endpoint
    console.log(employeeID);
    const endpoint = `http://localhost:8080/api/v1/records`;

    // Define the action type based on the current clockedIn state
    const actionType = clockedIn ? 'clock-out' : 'clock-in';

    // Send POST request with the appropriate data
    axios
      .post(endpoint, 
        {
          employeeID: employeeID,
          time: new Date(), // using the current date for demonstration purposes
          type: actionType,
        },
        {
          headers: { 'x-api-key': '34be70f8-aef9-47bd-8f8a-674503d24e73' }
        }
      )
      .then((response) => {
        console.log(response);
        // Flip the clockedIn state only after successful response
        setClockedIn(!clockedIn);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const buttonVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <ClockInWrapper>
      {clockedIn ? (
        <ClockOutButton onClick={handleClockInOut}>
          <Clock/>
          <Text>CLOCK OUT</Text>
        </ClockOutButton>
      ) : (
        <Button
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          onClick={handleClockInOut}
        >
          <Clock/>
          <Text>CLOCK IN</Text>
        </Button>
      )}
    </ClockInWrapper>
  );
};

export default ClockIn;
