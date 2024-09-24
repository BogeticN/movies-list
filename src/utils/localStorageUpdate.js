export const updateLocalStorage = (isFavorite, movie) => {
  const storedFavorites =
    JSON.parse(localStorage.getItem('favoriteMovies')) || [];

  if (isFavorite) {
    if (!storedFavorites.includes(movie.id)) {
      const updatedFavorites = [...storedFavorites, movie.id];
      localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
    }
  } else {
    const updatedFavorites = storedFavorites.filter((id) => id !== movie.id);
    localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
  }
};
