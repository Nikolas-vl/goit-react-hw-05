import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import { searchMovies } from '../../tmbd';
import s from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    if (!query) return;

    const getMovies = async () => {
      const results = await searchMovies(query);
      setMovies(results);
    };

    getMovies();
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    setSearchParams(inputValue ? { query: inputValue } : {});
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={s.searchForm}>
        <input type='text' value={inputValue} placeholder='Search movies' onChange={e => setInputValue(e.target.value)} className={s.searchInput} />
        <button type='submit' className={s.searchButton}>
          Search
        </button>
      </form>

      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
