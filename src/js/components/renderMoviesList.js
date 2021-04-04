import refs from'./refs'
import spinner from './spinner'
import movieAdapter from '../utils/movieListsAdapter'
import movieCardTmp from '/templates/movieCard.hbs'

async function renderMovieList(object) {
  spinner.show();
  try {
    const { results } = object;

    const movieList = await results.map(item =>
      movieCardTmp(movieAdapter(item)),
    );
    appendMovieListMarkup(movieList);
  } catch (error) {
    console.log(error);
  }
  spinner.hide();
}

function appendMovieListMarkup(results) {
  refs.filmList.insertAdjacentHTML('beforeend', results.join(''));
}
export {renderMovieList, appendMovieListMarkup}
