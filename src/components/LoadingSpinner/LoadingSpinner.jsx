import React from 'react';
import styled from 'styled-components';

const LoadingSpinner = () => {
  return (
    <StyledPlaceholder>
      <Spinner />
    </StyledPlaceholder>
  );
};

export default LoadingSpinner;

const StyledPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
