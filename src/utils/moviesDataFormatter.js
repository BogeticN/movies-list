export const processMoviesData = (movies) => {
  let movieMap = new Map();

  for (let i = 0; i < movies.length; i++) {
    movies[i].isFavorite = false;

    if (!isNaN(new Date(movies[i].release_date).getTime())) {
      movies[i].release_date = new Date(movies[i].release_date)
        .toLocaleDateString('en-GB')
        .replace(/\//g, '.');
    } else {
      movies[i].release_date = 'N/A';
    }

    movieMap.set(movies[i].id, movies[i]);
  }
  return [...movieMap.values()].sort(
    (a, b) => b.ratings[0].rating - a.ratings[0].rating
  );
};
