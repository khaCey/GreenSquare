import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  Speedometer2,
  CardChecklist,
  Calendar2DayFill,
} from 'react-bootstrap-icons';

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
  justify-content: center;
  background: ${(props) => (props.selected ? 'rgb(253,65,60)' : '')};
  background: ${(props) =>
    props.selected
      ? 'linear-gradient(90deg, rgba(253,65,60,0.25) 0%, rgba(43,47,51,1) 80%, rgba(43,47,51,1) 100%)'
      : ''};
  border-right: ${(props) => (props.selected ? '3px solid #fd413c' : '')};
  :hover{
    background: linear-gradient(90deg, rgba(253,65,60,0.25) 0%, rgba(43,47,51,1) 80%, rgba(43,47,51,1) 100%);
    color: #FD413C;
  }
`;

const Hidebutton = styled.label`
  width: 100%;
  height: 3em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  :hover{
    background-color: #3d434b;
  }
`;

const Label = styled.label`
  width: 50%;
  height: 3em;
  display: ${(props) => (props.hide ? 'none' : 'flex')};
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

  const handleHide = () => {
    setHide(!hide);
  };

  const handleSelect = (name) => {
    setSelected(name);
  };

  return (
    <Container>
      <Nav
        animate={{ width: hide ? '3em' : '15em' }}
        transition={{ duration: 1.2 }}
      >
        <NavList>
          <ListItem>
            <Hidebutton onClick={handleHide}>...</Hidebutton>
          </ListItem>
          <ListItem
            selected={selected === 'dashboard'}
            onClick={() => handleSelect('dashboard')}
          >
            <Speedometer2 size={25} />
            <Label hide={hide}>
              <Name>DASHBOARD</Name>
            </Label>
          </ListItem>
          <ListItem
            selected={selected === 'tasks'}
            onClick={() => handleSelect('tasks')}
          >
            <CardChecklist size={25} />
            <Label hide={hide}>
              <Name>TASKS</Name>
            </Label>
          </ListItem>
          <ListItem
            selected={selected === 'calendar'}
            onClick={() => handleSelect('calendar')}
          >
            <Calendar2DayFill size={25} />
            <Label hide={hide}>
              <Name>CALENDAR</Name>
            </Label>
          </ListItem>

          {/* Similar code for other list items */}
        </NavList>
      </Nav>
    </Container>
  );
};

export default Dashboard;
