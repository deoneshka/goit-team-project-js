import './sass/main.scss';
import movieCardTmp from './templates/movieCard.hbs';
import movieInfoCardTmp from './templates/movieCardInfo.hbs';
import FilmotekaApiService from './js/api/moviesApi';
import movieAdapter from './js/utils/movieListsAdapter';
import spinner from './js/components/spinner';
import debounce from 'lodash.debounce';
import { genresIdConverter } from './js/utils/genreConverter';
import './js/components/tabs';

const filmotekaApiService = new FilmotekaApiService();
const filmListRef = document.querySelector('.films-list');
const onMovieClick = document.querySelector('.js-film-list');
const modalRef = document.querySelector('.js-open-modal');

const modalContaierRef = document.querySelector('.js-modal');
const closeBtnRef = document.querySelector('.js-close-btn');

const inputRefValue = document.querySelector('#js-input');

// const loadMoreBtn = document.querySelector('[data-action="load-more"]');
// const loadNextBtn = document.querySelector('[data-action="load-next"]');
// const loadPrevBtn = document.querySelector('[data-action="load-prev"]');

closeBtnRef.addEventListener('click', closeModal);
inputRefValue.addEventListener('input', debounce(moviesSearch, 500));
onMovieClick.addEventListener('click', showModal);

async function showModal(event) {
  try {
    window.addEventListener('keydown', closeModal);

    const target = event.target.parentNode;
    if (target.parentNode.nodeName !== 'A') return;
    const idMovie = target.parentNode.dataset.id;
    await getMovie(idMovie);
    modalRef.classList.remove('is-hidden');
  } catch (error) {
    console.log('Ошибка В showModal');
  }
}
async function getMovie(id) {
  const movieInfo = await filmotekaApiService.fetchMovies(id);
  //Жанр конвертер для карточки
  movieInfo.genres = await movieInfo.genres
    .map(el => {
      return el.name;
    })
    .slice(0, 2)
    .join(', ');

  renderMovieData(movieInfo);
}
async function renderMovieData(object) {
  try {
    const movieDataInfo = await movieInfoCardTmp(movieAdapter(object));
    appendMovieCardInfo(movieDataInfo);
  } catch (error) {
    console.log(error + ' Ошибка в renderMovieData');
  }
}

function closeModal(event) {
  clearContainer(modalContaierRef);
  modalRef.classList.add('is-hidden');
  if (event.code === 'Escape') {
    window.removeEventListener('keydown', closeModal);
  }
}
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
    clearContainer(filmListRef);

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
    console.log(error);
  }
  spinner.hide();
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
function appendMovieCardInfo(results) {
  modalContaierRef.insertAdjacentHTML('beforeend', results);
}
function clearContainer(ref) {
  ref.innerHTML = '';
}

// function genresMovieShort(element) {
//   element.genre_ids = element.genre_ids.map(genreMovie => (genreMovie = genres[genreMovie]))
//     .slice(0, 3)
//     .join(', ');
//   return element;
// }
