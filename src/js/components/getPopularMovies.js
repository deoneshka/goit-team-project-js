import refs from './refs';
import { clearContainer } from './clearContainer';
import { genresIdConverter } from '../utils/genreConverter';
import { renderMovieList } from './renderMoviesList';
import filmotekaApiService from './getApiClass';

async function PopularMovie() {
  try {
    clearContainer(refs.filmList);
    const moviesList = await filmotekaApiService.fetchResults();
    const { results } = moviesList;

    results.map(el => genresIdConverter(el));
    renderMovieList(moviesList);
  } catch (error) {
    console.log(error);
  }
}
PopularMovie();
export { PopularMovie };
