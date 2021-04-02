const refs = {
  header: document.querySelector('.header'),
  activeLink: document.querySelector('.navigation__list'),
  homeButton: document.querySelector('[data-tab="home"]'),
  libraryButton: document.querySelector('[data-tab="library"]'),
  searchContainer: document.querySelector('#js-search'),
  libraryContainer: document.querySelector('#js-buttons'),
};

refs.homeButton.addEventListener('click', onHomeButton);
refs.libraryButton.addEventListener('click', onLibraryButton);

function onHomeButton() {
  if (refs.header.id === 'home') return;
  refs.header.id = 'home';
  toggleActiveLink();
  toggleLibraryBg();
  toggleLibraryTab();
  toggleHomeTab();
}
function onLibraryButton() {
  if (refs.header.id === 'library') return;
  refs.header.id = 'library';
  toggleActiveLink();
  toggleLibraryBg();
  toggleHomeTab();
  toggleLibraryTab();
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
