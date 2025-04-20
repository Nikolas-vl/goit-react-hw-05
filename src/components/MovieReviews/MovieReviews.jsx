import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../tmbd';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      const data = await getMovieReviews(movieId);
      setReviews(data);
    };
    getReviews();
  }, [movieId]);

  if (!reviews.length) return <p>No reviews found.</p>;

  return (
    <ul>
      {reviews.map(({ id, author, content }) => (
        <li key={id}>
          <p>
            <h4>{author}:</h4>
          </p>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
