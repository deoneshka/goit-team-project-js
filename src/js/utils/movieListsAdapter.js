import { getPosterPath } from './posterPath';


const movieAdapter = ({
  original_title,
  release_date,
  poster_path,
  vote_average,
  genre_ids,
}) => ({
  imgSrc: getPosterPath(poster_path),
  title: original_title,
  rating: vote_average,
  releaseDate: release_date,
  genre: genre_ids,
  // genre: getGenre(genre_ids),
});
export default movieAdapter;
