export const processMoviesData = (movies) => {
  let movieMap = new Map();

  const favoriteMovies =
    JSON.parse(localStorage.getItem('favoriteMovies')) || [];

  for (let i = 0; i < movies.length; i++) {
    movies[i].isFavorite = favoriteMovies.includes(movies[i].id);

    movies[i].release_date = formatReleaseDate(movies[i]);

    movieMap.set(movies[i].id, movies[i]);
  }

  const sortedMovies = sortByRating([...movieMap.values()]);

  return sortedMovies;
};

const formatReleaseDate = (movie) => {
  if (!isNaN(new Date(movie.release_date).getTime())) {
    return new Date(movie.release_date)
      .toLocaleDateString('en-GB')
      .replace(/\//g, '.');
  } else {
    return 'N/A';
  }
};

const sortByRating = (movies) => {
  return movies.sort((a, b) => {
    const imdbRatingA = a.ratings.find((rating) => rating.id === 'imdb');
    const imdbRatingB = b.ratings.find((rating) => rating.id === 'imdb');

    const ratingA = imdbRatingA ? imdbRatingA.rating : 0;
    const ratingB = imdbRatingB ? imdbRatingB.rating : 0;

    return ratingB - ratingA;
  });
};
