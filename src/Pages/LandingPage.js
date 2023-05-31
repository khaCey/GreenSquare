import React, { useState } from 'react';
import styled from 'styled-components';
import DashboardPage from '../Components/DashboardPage';
import EmployeePage from '../Components/EmployeePage';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Speedometer2,
  CardChecklist,
  Calendar2DayFill,
  BoxArrowLeft,
  ListUl,
  ThreeDotsVertical,
  PeopleFill,
  PersonBadgeFill
} from 'react-bootstrap-icons';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const PageContainer = styled.div`
  height: 100vh;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #212529;
  z-index: 0;
`;

const Nav = styled(motion.nav)`
  max-width: 15em;
  height: 100vh;
  user-select: none;
  font-size: 1em;
  font-weight: bold;
  background-color: #2B2F33;
  color: #8B8E90;
  display: flex;
  justify-content: center;
  z-index: 1;
`;

const NavContainer = styled.div`
  width: 100%;
`;

const NavList = styled.ul`
  width: 100%;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ListItem = styled.li`
  height: 3em;
  box-sizing: border-box;
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
  &.default:hover{
    background: linear-gradient(90deg, rgba(253,65,60,0.25) 0%, rgba(43,47,51,1) 80%, rgba(43,47,51,1) 100%);
    color: #FD413C;
  }
  &.logout:hover{
    background-color: #3d434b;
    color: white;
  }
  cursor: pointer;
`;

const Hidebutton = styled.label`
  width: 100%;
  height: 1em;
  display: flex;
  padding: 1em;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  cursor: pointer;
  :hover{
    background-color: #3d434b;
  }
`;

const Label = styled(motion.label)`
  width: 50%;
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

const LandingPage = ({ logoutHandler, employeeData }) => {
  const [selected, setSelected] = useState('dashboard');
  const [hide, setHide] = useState(false);
  const handleHide = () => {
    setHide(!hide);
  };

  const handleSelect = (name) => {
    setSelected(name);
  };

  const handleLogout = () => {
    logoutHandler(false);
  };
  
  return (
    <Container>
      <Nav
        animate={{ width: hide ? '3em' : '15em' }}
        transition={{ duration: 1.2 }}
      >
        <NavList>
          <NavContainer>
            <ListItem>
              <Hidebutton onClick={handleHide}>
              {hide ? <ListUl size={20} /> : <ThreeDotsVertical size={20} />}
              </Hidebutton>
            </ListItem>
            <ListItem
              className="default"
              selected={selected === 'dashboard'}
              onClick={() => handleSelect('dashboard')}
            >
              <Speedometer2 size={25} />
              <AnimatePresence>
                {!hide && (
                  <Label
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Name>DASHBOARD</Name>
                  </Label>
                )}
              </AnimatePresence>
            </ListItem>
            <ListItem
              className="default"
              selected={selected === 'tasks'}
              onClick={() => handleSelect('tasks')}
            >
              <CardChecklist size={25} />
              <AnimatePresence>
                {!hide && (
                  <Label
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Name>TASKS</Name>
                  </Label>
                )}
              </AnimatePresence>
            </ListItem>
            <ListItem
              className="default"
              selected={selected === 'calendar'}
              onClick={() => handleSelect('calendar')}
            >
              <Calendar2DayFill size={25} />
              <AnimatePresence>
                {!hide && (
                  <Label
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Name>CALENDAR</Name>
                  </Label>
                )}
              </AnimatePresence>
            </ListItem>
            <ListItem
              className="default"
              selected={selected === 'students'}
              onClick={() => handleSelect('students')}
            >
              <PersonBadgeFill size={25} />
              <AnimatePresence>
                {!hide && (
                  <Label
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Name>STUDENTS</Name>
                  </Label>
                )}
              </AnimatePresence>
            </ListItem>
            {employeeData[0].privileges === 'admin' && (
              <>
                <ListItem
                  className="default"
                  selected={selected === 'employees'}
                  onClick={() => handleSelect('employees')}
                >
                  <PeopleFill size={25} />
                  <AnimatePresence>
                    {!hide && (
                      <Label
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Name>EMPLOYEES</Name>
                      </Label>
                    )}
                  </AnimatePresence>
                </ListItem>
              </>
              
            )}
          </NavContainer>
          <ListItem className="logout" onClick={handleLogout}>
            <BoxArrowLeft size={25} />
            <AnimatePresence>
              {!hide && (
                <Label
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <Name>LOGOUT</Name>
                </Label>
              )}
            </AnimatePresence>
          </ListItem>
          {/* Similar code for other list items */}
        </NavList>
      </Nav>
      <PageContainer>
        {selected === 'dashboard' && <DashboardPage employeeData={employeeData} />}
        {selected === 'employees' && <EmployeePage employeeData={employeeData} />}
        {selected === 'students' && <StudentPage />}
      </PageContainer>
    </Container>
  );
};

export default LandingPage;
