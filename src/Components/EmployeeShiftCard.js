import React from 'react';
import { ShiftCard as ShiftCardStyled, ShiftClock, ShiftDate, ShiftCardContainer, ShiftBreak } from './StyledComponents';

export const ShiftCard = ({ shifts }) => (
    <ShiftCardContainer>
        <ShiftCardStyled className='label'>
            <ShiftDate>Date</ShiftDate>
            <ShiftClock>Clock In</ShiftClock>
            <ShiftClock>Clock Out</ShiftClock>
            <ShiftBreak>Break</ShiftBreak>
        </ShiftCardStyled>
        {shifts.map((shift, index) => {
            // Calculate total break time for this shift
            let totalBreakTime = 0;
            for (let i = 2; i < shift.length; i += 2) {
                const breakStart = new Date(shift[i - 1].time);
                const breakEnd = new Date(shift[i].time);
                totalBreakTime += breakEnd - breakStart;
            }
            totalBreakTime = (totalBreakTime / (1000 * 60 * 60)).toFixed(2); // Convert to hours

            return (
                <ShiftCardStyled key={index}>
                    <ShiftDate>{(new Date(shift[0].time)).toDateString()}</ShiftDate>
                    {shift.map((record, idx) => (
                        <ShiftClock key={idx}>
                            <span>{(new Date(record.time)).toLocaleTimeString()}</span>
                        </ShiftClock>
                    ))}
                    <ShiftBreak>
                        {totalBreakTime} hrs
                    </ShiftBreak>
                </ShiftCardStyled>
            );
        })}
    </ShiftCardContainer>
);
