export const getNewMovieIndex = (e, currentIndex, moviesList) => {
  const moviesPerRow = 6;

  const keyActions = {
    ArrowDown: () =>
      currentIndex === -1
        ? 0
        : Math.min(currentIndex + moviesPerRow, moviesList.length - 1),
    ArrowUp: () =>
      currentIndex === -1 ? 0 : Math.max(currentIndex - moviesPerRow, 0),
    ArrowRight: () =>
      currentIndex === -1 ? 0 : (currentIndex + 1) % moviesList.length,
    ArrowLeft: () =>
      currentIndex === -1
        ? 0
        : (currentIndex - 1 + moviesList.length) % moviesList.length
  };

  if (keyActions[e.key]) {
    e.preventDefault();
    return keyActions[e.key]();
  } else return currentIndex;
};
