import { Link, useLocation } from 'react-router-dom';
import s from './MovieList.module.css';
const MovieList = ({ movies }) => {
  const location = useLocation();
  if (!movies || movies.length === 0) {
    return;
  }

  return (
    <ul>
      {movies.map(({ id, title }) => (
        <li className={s.link} key={id}>
          <Link to={`/movies/${id}`} state={{ from: location }}>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
