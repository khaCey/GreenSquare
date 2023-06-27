import styled, { keyframes } from 'styled-components';

export const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const LoaderWrapper = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    z-index: 2;
`;

export const Spinner = styled.div`
    border: 6px solid #f3f3f3;
    border-top: 6px solid #3498db;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: ${spin} 2s linear infinite;
    margin-top: -15vh;
`;

export const EmployeePageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

export const EmployeeCard = styled.div`
    &:not(.label){
        border-top: 1px solid #3d3f51;
        position: relative;
        cursor: pointer;
    }
    &:not(.label):hover {
        background-color: #3d434b;
    }
`;

export const EmployeeHeader = styled.div`
    position: sticky; 
    top: 0;
    padding: 5px 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const EmployeeName = styled.h3`
    color: white;
    font-size: 1em;
    font-weight: 300;
    width: 25%;
    margin-left: 0.5em;
`;

export const EmployeeNumber = styled.div`
    color: white;
    font-size: 1em;
    font-weight: 300;
    width: 25%;
`;

export const EmployeeDays = styled.h3`
    color: white;
    font-size: 1em;
    font-weight: 300;
    width: 25%;
`;

export const EmployeeHours = styled.h3`
    color: white;
    font-size: 1em;
    font-weight: 300;
    width: 25%;
    margin-right: 0.5em;
`;

export const UpperContainer = styled.div`
    margin-top: 1em;
    margin-bottom: 1em;
    height: 2em;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
`;

export const PageName = styled.div`
    margin-left: 1em; 
`;

export const BottomContainer = styled.div`
    flex-grow: 1;
    height: 93vh;
    width: 100%;
    margin-bottom: 1em;
    display: flex;
`;

export const AddContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

export const AddEmployee = styled.div`
    background-color: rgba(60, 253, 79, 0.5);
    border-radius: 10px;
    padding: 0.25em;
    display: flex;
    align-items: center;
    color: white;
    justify-content: space-between;
    &:hover{
        background-color: rgba(60, 253, 79, 0.25);
    }
`;

export const AddButton = styled.div`
    cursor: pointer;
    width: 10em;
    margin-right: 1em;
    margin-top: 1em;
`;

export const InnerBottomContainer = styled.div`
    margin-right: 1em;
    margin-left: 1em;
    border-radius: 5px;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #2B2F33;
    position: relative;
`;

export const EmployeeList = styled.div`
    border-radius: 5px;
    padding: 1em;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
`;

export const Modal = styled.div`
    position: fixed;
    width: 75%;
    height: 65%;
    background-color: #212529;
    z-index: 10;
    border: 1px solid #3d3f51;
    border-radius: 10px;
    padding-top: 1em;
`;

export const Overlay = styled.div`
    background-color: rgba(0, 0, 0, 0.4); // Change this as needed
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9; // Make sure this is below modal but above everything else
    backdrop-filter: blur(2px); // This will blur the background
`;

export const RecordCard = styled.div`
    width: 100%;
    padding: 1em;
    border-top: 1px solid #3d3f51;
    position: relative;
    cursor: pointer;
`;

export const ShiftCardContainer = styled.div`
`;

export const ShiftCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1em;
    margin-left: 1em;
    margin-right: 1em;
    color: white;
    &:not(.label){
        border-top: 1px solid #3d3f51;
        cursor: pointer;
    }
        &:not(.label):hover {
        background-color: #3d434b;
    }
`;

export const ShiftDate = styled.div`
    width: 20em;
`;

export const ShiftClock = styled.div`
    width: 20em;
`;

export const ShiftBreak = styled.div`
    width: 20em;
`;