import React, { useEffect, useState } from 'react';
import movies from '../api/movies.json';
import Movie from '../components/Movie/Movie';
import styled from 'styled-components';
import { formatMovieDates } from '../utils/dateFormatter';

const filterDuplicateMovies = (movies) => {
  return movies
    .filter(
      (movie, index, arr) => index === arr.findIndex((m) => m.id === movie.id)
    )
    .sort((a, b) => b.ratings[0].rating - a.ratings[0].rating);
};

const MovieList = () => {
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    const uniqueMovies = filterDuplicateMovies(movies);
    formatMovieDates(uniqueMovies);
    setMoviesList(uniqueMovies);
  }, []);

  return (
    <StyledGridContainer>
      {moviesList.map((movie) => {
        return <Movie key={movie.id} movie={movie}></Movie>;
      })}
    </StyledGridContainer>
  );
};

export default MovieList;

const StyledGridContainer = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  padding: 15px 50px;
  gap: 80px 10px;
`;
