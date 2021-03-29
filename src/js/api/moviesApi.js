import options from '../setting';
const { API_KEY, BASE_URL } = options;

export default class FilmotekaApiService {
  constructor(_params) {
    this.searchQuery = '';
    this.page = 1;
    this.totalPages = 500;
  }
  async fetchResults() {
    const urlPopular = `${BASE_URL}movie/popular/?api_key=${API_KEY}&page=${this.page}`;
    const response = await fetch(urlPopular);
    const moviesLists = await response.json();
    return moviesLists;
  }
  async fetchSearch() {
    const urlSearch = `${BASE_URL}search/movie/?api_key=${API_KEY}&page=${this.page}&query=${this.searchQuery}`;
    const response = await fetch(urlSearch);
    const moviesLists = await response.json();
    return moviesLists;
  }
  incrementPage() {
    console.log(this.page);
    if (this.currentPage === this.totalPages) {
      return;
    }
    this.page += 1;
  }
  decrementPage() {
    if (this.page === 1) {
      return;
    }
    this.page -= 1;
    console.log(this.page);
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
