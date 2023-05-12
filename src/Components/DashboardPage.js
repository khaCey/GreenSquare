import React, { useEffect } from 'react';
import ClockInOut from "./ClockInOut";
import ProfileBanner from "./Profile";
import Alerts from "./Alerts";
import Revenue from "./Revenue";
import ToDoListComponent from "./ToDoListComponent";
import styled from "styled-components";

const DashboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

const UpperContainer = styled.div`
    height: 5em;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
`;

const BottomContainer = styled.div`
    flex-grow: 1;
    width: 100%;
    display: flex;
    margin-bottom: 1em;
`;
const PageName = styled.div`
    margin-left: 1em;
`;

const Container = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 93vh;
    margin-right: 1em;
    margin-left: 1em;
`;

const Clock = styled(ClockInOut)`
`;

const DashboardPage = ({ employeeID, employeeData }) => {
    
    useEffect(() => {
        document.title = "Green Square - Dashboard";
    }, []);
    
    return (
        <DashboardContainer>
            <UpperContainer>
                <PageName>
                    <h1>Dashboard</h1>
                </PageName>
                <Clock employeeID={employeeID}/>
            </UpperContainer>
            <BottomContainer>
                <Container>    
                    <Alerts/>
                    <Revenue/>
                    <ToDoListComponent/>
                </Container>
                <ProfileBanner employeeID={employeeID} employeeData={employeeData}/>
            </BottomContainer>
        </DashboardContainer>
    );
};

export default DashboardPage;
