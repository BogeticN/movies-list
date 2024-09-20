/* eslint-disable react/prop-types */

import React from 'react';
import styled from 'styled-components';

const BASE_URL = 'https://image.tmdb.org/t/p/w500';

const Movie = ({ movie }) => {
  return (
    <StyledGridItem>
      <div>
        <StyledMoviePosterImg
          src={BASE_URL + movie.poster_path}
          alt="Movie poster"
        />
      </div>

      <StyledInfoContainer>
        <strong>{movie.title}</strong>
        <div>{movie.release_date}</div>
      </StyledInfoContainer>
    </StyledGridItem>
  );
};

export default Movie;

const StyledGridItem = styled.div`
  width: 200px;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;
const StyledMoviePosterImg = styled.img`
  width: 200px;
  height: 100%;
  min-height: 304px;
  object-fit: cover;
`;

const StyledInfoContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
