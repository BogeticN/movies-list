import React, { useEffect, useState } from 'react';
import movies from '../api/movies.json';
import Movie from '../components/Movie/Movie';
import styled from 'styled-components';
import { processMoviesData } from '../utils/moviesDataFormatter';

const MovieList = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    const uniqueMovies = processMoviesData(JSON.parse(JSON.stringify(movies)));
    setMoviesList(uniqueMovies);
  }, []);

  const handleSelectMovie = (id) => {
    setSelectedMovieId(id);
  };

  return (
    <StyledContainer>
      <StyledGridContainer>
        {moviesList.map((movie) => {
          return (
            <Movie
              key={movie.id}
              movie={movie}
              isSelected={selectedMovieId === movie.id}
              onSelectMovie={() => handleSelectMovie(movie.id)}
            ></Movie>
          );
        })}
      </StyledGridContainer>
    </StyledContainer>
  );
};

export default MovieList;

const StyledGridContainer = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(6, 200px);
  justify-items: center;
  padding: 50px;
  gap: 10px 10px;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(6, 185px);
  }
`;

const StyledContainer = styled.div`
  background-color: #e9e9e9;
`;
