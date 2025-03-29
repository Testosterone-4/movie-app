import React from 'react';
import styled from 'styled-components';
import Loader from '../components/Loader'; // Import your existing loader

// Styled container to center the loader
 const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const EnahancedLoader = () => (
  <LoaderContainer>
    <Loader /> {/* Replace with your actual loader component */}
  </LoaderContainer>
);
export default EnahancedLoader;

