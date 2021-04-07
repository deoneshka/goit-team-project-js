import refs from './refs';
import { PopularMovie } from './getPopularMovies';
import filmotekaApiService from './getApiClass';
import { clearContainer } from './clearContainer';

refs.homeButton.addEventListener('click', onHomeButton);
refs.libraryButton.addEventListener('click', onLibraryButton);

function onHomeButton() {
  filmotekaApiService.resetPage();
  PopularMovie();
  if (refs.header.id === 'home') return;
  refs.header.id = 'home';
  toggleActiveLink();
  toggleLibraryBg();
  toggleLibraryTab();
  toggleHomeTab();
  refs.paginationRef.classList.remove('hidden');
}

function onLibraryButton() {
  if (refs.header.id === 'library') return;
  refs.header.id = 'library';
  toggleActiveLink();
  toggleLibraryBg();
  toggleHomeTab();
  toggleLibraryTab();
  refs.paginationRef.classList.add('hidden');
  refs.filmList.innerHTML = '';
}
///////////////////////////////////////////////////////////
function toggleHomeTab() {
  refs.searchContainer.classList.toggle('tab-active');
  refs.searchContainer.classList.toggle('tab-inactive');
}
function toggleLibraryTab() {
  refs.libraryContainer.classList.toggle('tab-active');
  refs.libraryContainer.classList.toggle('tab-inactive');
}
function toggleLibraryBg() {
  refs.header.classList.toggle('library');
}
function toggleActiveLink() {
  refs.activeLink.firstElementChild.classList.toggle('active');
  refs.activeLink.lastElementChild.classList.toggle('active');
}
