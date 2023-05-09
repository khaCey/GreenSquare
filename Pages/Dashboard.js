import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BiSpeedometer2 } from 'react-icons/bi';

const Container = styled.div`
  border-radius: 1em;
  width: 85%;
  background-color: #212529;
`;

const Nav = styled(motion.nav)`
  max-width: 15em;
  height: 35em;
  user-select: none;
  font-size: 1em;
  font-weight: bold;
  background-color: #2B2F33;
  border-top-left-radius: 1em;
  border-bottom-left-radius: 1em;
  color: #8B8E90;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const NavList = styled.ul`
  width: 100%;
  height: 25em;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListItem = styled.li`
  height: 3em;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const Label = styled.label`
  width: 100%;
  height: 3em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Name = styled.span`
  width: 7em;
  margin-left: 1em;
  font-size: 0.8em;
  display: ${(props) => (props.hide ? 'none' : 'inline')};
`;

const Dashboard = () => {
  const [selected, setSelected] = useState(null);
  const [hide, setHide] = useState(false);

  const handleSelect = (id) => {
    setSelected(id);
  };

  const handleHide = () => {
    setHide(!hide);
  };

  return (
    <Container>
      <Nav
        animate={{ width: hide ? '3em' : '15em' }}
        transition={{ duration: 1.2 }}
      >
        <NavList>
          <ListItem>
            <Label onClick={handleHide}>...</Label>
          </ListItem>
          <ListItem onClick={() => handleSelect('dashboard')}>
            <Label>
              <Name hide={hide}>DASHBOARD</Name>
            </Label>
          </ListItem>
          {/* Similar code for other list items */}
        </NavList>
      </Nav>
    </Container>
  );
};

export default Dashboard;
