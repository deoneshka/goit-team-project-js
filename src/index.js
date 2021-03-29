import './sass/main.scss';
import movieCardTmp from './templates/movieCard.hbs';
import FilmotekaApiService from './js/api/moviesApi';
import movieAdapter from './js/utils/movieListsAdapter';
import debounce from 'lodash.debounce';

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
  try {
    const moviesList = await filmotekaApiService.fetchResults();
    renderMovieList(moviesList);
  } catch (error) {
    console.log('Ошибка! (PopularMovie)');
  }
}

async function renderMovieList(object) {
  try {
    const { results } = object;
    const movieList = await results.map(item =>
      movieCardTmp(movieAdapter(item)),
    );
    appendMovieListMarkup(movieList);
  } catch (error) {
    console.log('Ошибка! (renderMovieList)');
  }
}

PopularMovie();

async function moviesSearch(event) {
  try {
    event.preventDefault();
    clearMovieListContainer();

    filmotekaApiService.query = event.target.value;

    if (filmotekaApiService.query === '') {
      return;
    }
    if (filmotekaApiService.query === ' ') {
      return alert('Вы ничего не ввели');
    }
    filmotekaApiService.resetPage();
    const moviesList = await filmotekaApiService.fetchSearch();
    return renderMovieList(moviesList);
  } catch (error) {
    console.log('Ошибка! (moviesSearch)');
  }
}

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
