import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast } from '../../tmbd';
import s from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getCast = async () => {
      const data = await getMovieCast(movieId);
      setCast(data);
    };
    getCast();
  }, [movieId]);

  if (!cast.length) return <p>No cast info available.</p>;

  return (
    <ul className={s.castList}>
      {cast.map(({ id, name, character, profile_path }) => (
        <li key={id} className={s.castItem}>
          {profile_path ? (
            <img className={s.castImage} src={`https://image.tmdb.org/t/p/w200${profile_path}`} alt={name} />
          ) : (
            <div className={s.noImage}>No photo</div>
          )}
          <p>
            <p>{name}</p>
          </p>
          <p>as {character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
