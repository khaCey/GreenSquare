import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import { PencilFill, XCircleFill, CheckCircleFill } from 'react-bootstrap-icons';
import 'react-toastify/dist/ReactToastify.css';

const EmployeePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const EmployeeCard = styled.div`
  position: relative; // New line
  background: #f8f9fa;
  border-radius: 1em;
  padding: 1em;
  margin-bottom: 1em;
  margin-right: 1em;
  margin-left: 1em;
  flex-grow: 1;
  background-color: #2B2F33;
`;

const EmployeeHeader = styled.div`
  position: sticky; // New line
  top: 0; // New line
  background-color: #2B2F33;
  padding: 5px 0; // New line
  z-index: 1; // New line
`;

const EmployeeName = styled.h3`
  color: white;
`;

const DateEntry = styled.p`
`;

const TimeEntry = styled.p`
`;

const List = styled.ul`
  list-style-type: none;
`;

const ListItem = styled.li`
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const UpperContainer = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
  height: 2em;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
`;

const PageName = styled.div`
  margin-left: 1em;
`;

const SideBanner = styled.div`
  background-color: #2B2F33;
  height: 93vh;
  color: #BDCDD6;
  box-sizing: border-box;
  padding: 1em;
  margin-right: 1em;
`;

const BottomContainer = styled.div`
  flex-grow: 1;
  width: 100%;
  margin-bottom: 1em;
  display: flex;
  overflow: hidden;
`;

const EmployeeList = styled.div`
  width: 100%;
  outline: 1px solid white;
  overflow-x: auto;
  
  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const Content = styled.div`
    outline: 1px solid white;
    width: 18vw;
    height: 100%;
`;

const EmployeePage = ({ employeeData }) => {
  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState([]);
  const [editRecord, setEditRecord] = useState(null);

  const isAdmin = employeeData[0].privileges === 'admin';

  useEffect(() => {
    if (isAdmin) {
      let currentDate = new Date();
      let startYear = currentDate.getUTCFullYear();
      let startMonth = currentDate.getUTCMonth();
      let endYear = currentDate.getUTCFullYear();
      let endMonth = currentDate.getUTCMonth() + 1; // JavaScript months are 0-indexed

      if (currentDate.getUTCDate() < 21) {
        if (startMonth === 0) {
          startMonth = 11;
          startYear -= 1;
        } else {
          startMonth -= 1;
        }
        endMonth -= 1;
      }

      let startDate = new Date(Date.UTC(startYear, startMonth, 21));
      let endDate = new Date(Date.UTC(endYear, endMonth, 20, 23, 59, 59, 999));

      axios.get(
        `${process.env.REACT_APP_API_URL}employee/`,
        { headers: { 'x-api-key': '34be70f8-aef9-47bd-8f8a-674503d24e73' }}
      ).then((res) => {
        setEmployees(res.data);
        Promise.all(res.data.map(employee =>
          axios.get(
            `${process.env.REACT_APP_API_URL}records/${employeeData[0].employeeID}/${startDate.toISOString()}/${endDate.toISOString()}`,
            { 
              headers: { 'x-api-key': process.env.REACT_APP_API_KEY }
            }
          ).then(response => {
            let records = response.data;

            // If the first record's time is before the start date, remove it
            if (records.length > 0 && new Date(records[0].time) < startDate) {
              records = records.slice(1);
            }

            // Exclude the last record if its type is 'clockin'
            if (records.length > 0 && records[records.length - 1].type === 'clockin') {
              records.pop();
            }

            return records;
          })
        )).then(recordsResponses => {
          // Map the records with the corresponding employee
          const employeeRecords = res.data.reduce((obj, employee, index) => {
            obj[employee.employeeID] = recordsResponses[index];
            return obj;
          }, {});
          setRecords(employeeRecords);
        });
      });
    }
  }, [isAdmin, employeeData]);

  if (!isAdmin) {
    toast.error('You do not have the necessary permissions to view this page.');
    return <ToastContainer />;
  }
  
  return (

    <EmployeePageContainer>
      <UpperContainer>
        <PageName>
          <h1>Employees</h1>
        </PageName>
      </UpperContainer>
      <BottomContainer>
        <EmployeeList>
          {employees.map((employee, index) => (
            <EmployeeCard key={employee.employeeID}>
              <EmployeeHeader>
                <EmployeeName>{employee.firstName} {employee.lastName}</EmployeeName>
              </EmployeeHeader>
              <List>
              {records[employee.employeeID] && records[employee.employeeID].map((record) => {
                  const date = new Date(record.time);
                  const formattedDate = `${date.getFullYear()}/${("0" + (date.getMonth() + 1)).slice(-2)}/${("0" + date.getDate()).slice(-2)}`;
                  const formattedTime = date.toLocaleTimeString('en-US', { hour12: false });

                  return (
                    <ListItem key={record.id}>
                      {editRecord === record ? (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <input
                            type="datetime-local"
                            defaultValue={new Date(record.time).toISOString().substring(0,16)}
                            onBlur={(event) => {
                              // Here you'd usually call an API to update the record.
                              // For now, just update it locally:
                              record.time = event.target.value;
                            }}
                          />
                          <CheckCircleFill 
                            style={{ cursor: 'pointer', marginLeft: '10px' }}
                            onClick={() => {
                              // Here you'd usually call an API to save the record.
                              // For now, just set the edit mode off:
                              setEditRecord(null);
                            }} 
                          />
                          <XCircleFill 
                            style={{ cursor: 'pointer', marginLeft: '10px' }}
                            onClick={() => setEditRecord(null)} 
                          />
                        </div>
                      ) : (
                        <>
                          <DateEntry>{formattedDate}</DateEntry>
                          <TimeEntry>{formattedTime}</TimeEntry>
                          <PencilFill style={{ cursor: 'pointer' }} onClick={() => setEditRecord(record)} />
                        </>
                      )}

                    </ListItem>

                  )
                })}
              </List>
            </EmployeeCard>
          ))}
        </EmployeeList>
        <SideBanner><Content/></SideBanner>
      </BottomContainer>
      
    </EmployeePageContainer>

  );
};

export default EmployeePage;
