import genreList from './genreList'


 export const genresIdConverter =(el) => {
    el.genre_ids = el.genre_ids
      .map(genreID => (genreID = genreList[genreID]))
      .slice(0, 2)
      .join(', ');
    return el;
  }
