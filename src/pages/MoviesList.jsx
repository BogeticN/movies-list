import React, { useEffect, useRef, useState, useCallback } from 'react';
import movies from '../api/movies.json';
import Movie from '../components/Movie/Movie';
import styled from 'styled-components';
import { processMoviesData } from '../utils/moviesDataFormatter';
import { getNewMovieIndex } from '../utils/keyboardNavigation';
import throttle from 'lodash/throttle';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import { COLORS } from '../constants/colors';

const MovieList = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const movieRefs = useRef({});

  useEffect(() => {
    const uniqueMovies = processMoviesData(JSON.parse(JSON.stringify(movies)));
    setMoviesList(uniqueMovies);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (selectedMovieId && movieRefs.current[selectedMovieId]) {
      movieRefs.current[selectedMovieId].scrollIntoView({
        block: 'center',
        inline: 'center'
      });
    }
  }, [selectedMovieId]);

  const handleArrowKeyPress = useCallback(
    throttle((e) => {
      setSelectedMovieId((prevId) => {
        const currentIndex = moviesList.findIndex(
          (movie) => movie.id === prevId
        );
        const newIndex = getNewMovieIndex(e, currentIndex, moviesList);
        return moviesList[newIndex]?.id || null;
      });
    }, 130),
    [moviesList]
  );

  useEffect(() => {
    const handleKeyPressWrapper = (e) => {
      handleArrowKeyPress(e);
    };

    window.addEventListener('keydown', handleKeyPressWrapper);
    return () => {
      window.removeEventListener('keydown', handleKeyPressWrapper);
      handleArrowKeyPress.cancel();
    };
  }, [handleArrowKeyPress]);

  const handleOnClickSelectedMovie = (id) => {
    setSelectedMovieId(id);
  };

  return (
    <>
      {isLoading ? (
        <StyledLoadingSpinnerContainer>
          <LoadingSpinner />
        </StyledLoadingSpinnerContainer>
      ) : (
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
      )}
    </>
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
  background-color: ${COLORS.BACKGROUND_GREY};
`;

const StyledLoadingSpinnerContainer = styled.div`
  background-color: ${COLORS.BACKGROUND_GREY};
  height: 100vh;
`;
