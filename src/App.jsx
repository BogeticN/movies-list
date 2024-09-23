import React from 'react';
import MovieList from './pages/MoviesList';
import { GlobalStyle } from './style/GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <MovieList></MovieList>;
    </>
  );
}

export default App;
