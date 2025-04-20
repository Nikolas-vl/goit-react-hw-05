import { useParams } from 'react-router-dom';

const MovieDetailsPage = () => {
  const { movieId } = useParams;
  return <div>Now showing movie with id - {movieId}</div>;
};

export default MovieDetailsPage;
