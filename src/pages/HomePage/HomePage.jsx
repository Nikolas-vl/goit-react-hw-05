import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../tmbd';
import MovieList from '../../components/MovieList/MovieList';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      const data = await getTrendingMovies();
      setTrendingMovies(data);
      setLoading(false);
    };

    getMovies();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      {loading ? <p>Loading...</p> : <MovieList movies={trendingMovies} />}
    </div>
  );
};

export default HomePage;
