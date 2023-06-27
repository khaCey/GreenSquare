import React from 'react';
import { RecordCard as RecordCardContainer } from './StyledComponents'; // import the relevant styled components

export const RecordCard = ({ record }) => {
  return (
    <RecordCardContainer>
      <p>
        {new Date(record.time).toLocaleString()}: {record.type}
      </p>
    </RecordCardContainer>
  );
};
