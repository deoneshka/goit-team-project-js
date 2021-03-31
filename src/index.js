import './sass/main.scss';
import movieCardTmp from './templates/movieCard.hbs';
import FilmotekaApiService from './js/api/moviesApi';
import movieAdapter from './js/utils/movieListsAdapter';
import spinner from './js/components/spinner';
import debounce from 'lodash.debounce';

import { genresIdConverter } from './js/utils/genreConverter';

const filmotekaApiService = new FilmotekaApiService();
const filmListRef = document.querySelector('.films-list');
// const loadMoreBtn = document.querySelector('[data-action="load-more"]');
// const loadNextBtn = document.querySelector('[data-action="load-next"]');
// const loadPrevBtn = document.querySelector('[data-action="load-prev"]');
const inputRefValue = document.querySelector('#js-input');

inputRefValue.addEventListener('input', debounce(moviesSearch, 500));

// loadMoreBtn.addEventListener('click', onLoadMore);
// loadNextBtn.addEventListener('click', onLoadNext);
// loadPrevBtn.addEventListener('click', onLoadPrev);

async function PopularMovie() {
  spinner.show();
  try {
    const moviesList = await filmotekaApiService.fetchResults();
    const { results } = moviesList;
    const changeGenre = results.map(el => genresIdConverter(el));
    renderMovieList(moviesList);
  } catch (error) {
    console.log('Ошибка! (PopularMovie)');
  }
  spinner.hide();
}

async function renderMovieList(object) {
  spinner.show();
  try {
    const { results } = object;

    const movieList = await results.map(item =>
      movieCardTmp(movieAdapter(item)),
    );
    appendMovieListMarkup(movieList);
  } catch (error) {
    console.log('Ошибка! (renderMovieList)');
  }
  spinner.hide();
}

PopularMovie();

async function moviesSearch(event) {
  spinner.show();
  try {
    clearMovieListContainer();

    filmotekaApiService.query = event.target.value;

    if (filmotekaApiService.query === '') {
      PopularMovie();
      return;
    }
    if (filmotekaApiService.query === ' ') {
      return alert('Вы ничего не ввели');
    }

    // filmotekaApiService.resetPage();
    const moviesList = await filmotekaApiService.fetchSearch();
    const { results } = moviesList;
    const changeGenre = results.map(el => genresIdConverter(el));
    return renderMovieList(moviesList);
  } catch (error) {
    console.log('Ошибка! (moviesSearch)');
  }
  spinner.hide();
}

// async function getMovie (event) {
//   const movie = await filmotekaApiService.fetchMovies(791373);
//   renderMovieData(object);
// }
// function renderMovieData (object){
//   const movieDataInfo =  movieCardTmp(movieAdapter(object));
// }
// getMovie();

// async function onLoadMore() {
//   try {
//     filmotekaApiService.incrementPage();
//     if (!inputRefValue.value) {
//       return PopularMovie();
//     }
//     const searchList = await filmotekaApiService.fetchSearch();
//     return renderMovieList(searchList);
//   } catch (error) {
//     console.log('Ошибка! (onLoadMore)');
//   }
// }
// function onLoadNext() {
//   filmotekaApiService.incrementPage();
//   clearMovieListContainer();
//   PopularMovie();
// }
// async function onLoadPrev() {
//   filmotekaApiService.decrementPage();
//   clearMovieListContainer();
//   PopularMovie();
// }

function appendMovieListMarkup(results) {
  filmListRef.insertAdjacentHTML('beforeend', results.join(''));
}

function clearMovieListContainer() {
  filmListRef.innerHTML = '';
}

// function genresMovieShort(element) {
//   element.genre_ids = element.genre_ids.map(genreMovie => (genreMovie = genres[genreMovie]))
//     .slice(0, 3)
//     .join(', ');
//   return element;
// }
