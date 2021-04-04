import filmotekaApiService from './getApiClass';

import {clearContainer} from './clearContainer'
import {genresIdConverter} from'../utils/genreConverter'
import {renderMovieList} from './renderMoviesList'
import {PopularMovie} from './getPopularMovies'

import errorMessage from './errors'
import spinner from './spinner'
import refs from'./refs'
import debounce from 'lodash.debounce';


let oldInputRef = '';
refs.inputValue.addEventListener('input', debounce(moviesSearch, 500));

async function moviesSearch(event) {
  try {
    if (!refs.inputValue.value) {
      refs.errorText.textContent = '';
      await PopularMovie();
      return;
    }
    if (
      refs.inputValue.value.length > 0 &&
      refs.inputValue.value.trim().length < 3 // добавлено трим чтобы не обрабатывать запросы с одних пробелов
    ) {
      refs.errorText.textContent = errorMessage.manyMatches;
      if (refs.inputValue.value.length > oldInputRef.length) {
        // spinner.hide();
        return;
      }
    }

    filmotekaApiService.query = event.target.value;
    spinner.show();
    const moviesList = await filmotekaApiService.fetchSearch();
    const { results } = moviesList;
    results.map(el => genresIdConverter(el));

    if (results.length === 0) {
      spinner.hide();
      refs.errorText.textContent = errorMessage.notFound;

      return;
    } else {
      spinner.hide();
      clearContainer(refs.filmList);
      refs.errorText.textContent = '';
      renderMovieList(moviesList);
    }
  } catch (error) {
    console.log(error);
  }
}
