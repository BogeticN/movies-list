import React, { useEffect, useRef, useState, useCallback } from 'react';
import movies from '../api/movies.json';
import Movie from '../components/Movie/Movie';
import styled from 'styled-components';
import { processMoviesData } from '../utils/moviesDataFormatter';
import { getNewMovieIndex } from '../utils/keyboardNavigation';

const MovieList = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const movieRefs = useRef({});

  useEffect(() => {
    const uniqueMovies = processMoviesData(JSON.parse(JSON.stringify(movies)));
    setMoviesList(uniqueMovies);
  }, []);

  useEffect(() => {
    if (selectedMovieId && movieRefs.current[selectedMovieId]) {
      movieRefs.current[selectedMovieId].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });
    }
  }, [selectedMovieId]);

  useEffect(() => {
    const handleKeyPressWrapper = (e) => {
      handleArrowKeyPress(e);
    };

    window.addEventListener('keydown', handleKeyPressWrapper);
    return () => {
      window.removeEventListener('keydown', handleKeyPressWrapper);
    };
  }, [moviesList]);

  const handleOnClickSelectedMovie = (id) => {
    setSelectedMovieId(id);
  };

  const handleArrowKeyPress = useCallback(
    (e) => {
      setSelectedMovieId((prevId) => {
        const currentIndex = moviesList.findIndex(
          (movie) => movie.id === prevId
        );
        const newIndex = getNewMovieIndex(e, currentIndex, moviesList);
        return moviesList[newIndex]?.id || null;
      });
    },
    [moviesList]
  );

  return (
    <StyledContainer>
      <StyledGridContainer>
        {moviesList.map((movie) => (
          <MemoizedMovie
            key={movie.id}
            movie={movie}
            isSelected={selectedMovieId === movie.id}
            onSelectMovie={() => handleOnClickSelectedMovie(movie.id)}
            ref={(el) => (movieRefs.current[movie.id] = el)}
          />
        ))}
      </StyledGridContainer>
    </StyledContainer>
  );
};

const MemoizedMovie = React.memo(Movie);

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
