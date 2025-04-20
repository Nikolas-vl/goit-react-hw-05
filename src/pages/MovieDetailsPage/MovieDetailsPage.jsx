import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getMovieDetails } from '../../tmbd';
import s from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const backLinkRef = useRef(location.state?.from || '/movies');

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getDetails = async () => {
      const data = await getMovieDetails(movieId);
      setMovie(data);
    };
    getDetails();
  }, [movieId]);

  if (!movie) return <p>Loading movie details...</p>;

  const { title, overview, poster_path, genres, vote_average } = movie;
  const imageUrl = poster_path ? `https://image.tmdb.org/t/p/w300${poster_path}` : 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <div className={s.wrapper}>
      <button className={s.backButton} onClick={() => navigate(backLinkRef.current)}>
        Go back
      </button>
      <div className={s.movieContainer}>
        <img className={s.poster} src={imageUrl} alt={title} />
        <div className={s.movieDetails}>
          <h2>{title}</h2>
          <p>
            <strong>User score:</strong> {Math.round(vote_average * 10)}%
          </p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{genres.map(g => g.name).join(', ')}</p>
        </div>
      </div>

      <hr />

      <div className={s.additionalInfo}>
        <h4>Additional information</h4>
        <ul>
          <li>
            <Link to='cast' state={{ from: backLinkRef.current }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to='reviews' state={{ from: backLinkRef.current }}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>

      <hr />
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
