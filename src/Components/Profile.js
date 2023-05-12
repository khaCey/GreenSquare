import React, { useContext } from "react";
import styled from "styled-components";
import { EmployeeDataContext } from '../contexts/EmployeeDataContext'; // import the context

const ProfileBanner = styled.div`
    background-color: #2B2F33;
    width: 17vw;
    height: 93vh;
    color: #BDCDD6;
    box-sizing: border-box;
    padding: 1em;
    margin-right: 1em;employeeNumber
`;

const Profile = () => {
    const [employeeData] = useContext(EmployeeDataContext); // use the context
    return (
        <ProfileBanner>
            NAME: 
            <br/>
            {employeeData[0].firstName}
            <br/>
            <br/>
            EMPLOYEE NUMBER: 
            <br/>
            {employeeData[0].employeeID}
            <br/>
            <br/>
            {employeeData.hoursWorkedThisMonth}:HOURS WORKED THIS MONTH
            <br/>
            <br/>
            {employeeData.daysWorkedThisMonth}:DAYS WORKED THIS MONTH
        </ProfileBanner>
    );
};

export default Profile;