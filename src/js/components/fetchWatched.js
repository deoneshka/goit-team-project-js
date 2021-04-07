import filmotekaApiService from './getApiClass';
import movieAdapter from '../utils/movieListsAdapter';
import watchedFilmsCard from '/templates/watchedFilmsCard.hbs';
import refs from './refs';

const libraryRefWatched = document.querySelector('.js-library-watched');
libraryRefWatched.addEventListener('click', fetchMoviesID);

async function fetchMoviesID() {
  const filmsStorage = localStorage.getItem('filmWatched');
  const filmsStorageID = JSON.parse(filmsStorage);

  let arr = await filmsStorageID.reduce(async (acc, id) => {
    let list = await acc;
    const t = await fetchMovie(id);

    t.genres = await t.genres
      .map(el => {
        return el.name;
      })
      .slice(0, 2)
      .join(', ');
    list.push(t);
    return list;
  }, []);

  const p = arr.map(el => {
    return watchedFilmsCard(movieAdapter(el));
  });
  refs.filmList.innerHTML = '';
  refs.filmList.insertAdjacentHTML('beforeend', p.join(''));
}
async function fetchMovie(id) {
  const b = await filmotekaApiService.fetchMovies(id).then(data => {
    return data;
  });

  return b;
}
