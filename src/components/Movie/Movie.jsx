/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as StarIcon } from '../../assets/icons/staricon.svg';
import { ReactComponent as OutlinedStarIcon } from '../../assets/icons/outlinedstaricon.svg';

const BASE_URL = 'https://image.tmdb.org/t/p/w500';

const Movie = ({ movie, onSelectMovie, isSelected }) => {
  const [isFavorite, setIsFavorite] = useState(movie.isFavorite);

  const toggleIsFavorite = (e) => {
    e.stopPropagation();
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    movie.isFavorite = newFavoriteState;
  };

  return (
    <StyledGridItem
      data-isselected={isSelected}
      onClick={() => onSelectMovie(movie.id)}
    >
      <StyledMoviePosterContainer>
        <StyledMoviePosterImg
          src={BASE_URL + movie.poster_path}
          alt="Movie poster"
        />
      </StyledMoviePosterContainer>

      <StyledMovieInfoContainer data-isselected={isSelected}>
        <StyledMovieTitle data-isselected={isSelected}>
          {movie.title}
        </StyledMovieTitle>
        <StyledIconContainer>
          <span>{movie.release_date}</span>
          {isFavorite ? (
            <StarIcon onClick={(e) => toggleIsFavorite(e)}></StarIcon>
          ) : (
            <OutlinedStarIcon
              onClick={(e) => toggleIsFavorite(e)}
            ></OutlinedStarIcon>
          )}
        </StyledIconContainer>
      </StyledMovieInfoContainer>
    </StyledGridItem>
  );
};

export default Movie;

const StyledGridItem = styled.div`
  background-color: #f9f9f9;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;

  transform: ${(props) =>
    props['data-isselected'] ? 'scale(1.2)' : 'scale(1)'};
  z-index: ${(props) => (props['data-isselected'] ? 2 : 1)};

  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const StyledMoviePosterContainer = styled.div`
  min-height: 300px;
`;

const StyledMoviePosterImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledMovieInfoContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: 15px;

  background-color: ${(props) => (props['data-isselected'] ? '#5992d2' : '')};
  color: ${(props) => (props['data-isselected'] ? '#ffffff' : '#000000')};
`;

const StyledMovieTitle = styled.strong`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: ${(props) =>
    props['data-isselected'] ? 'uppercase' : 'none'};
`;

const StyledIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    cursor: pointer;
  }
`;
