import React from 'react';
import styled, { keyframes } from 'styled-components';
import { LoaderWrapper, Spinner } from './StyledComponents';

const Loader = () => {
  return (
    <LoaderWrapper>
      <Spinner />
    </LoaderWrapper>
  );
};

export default Loader;
