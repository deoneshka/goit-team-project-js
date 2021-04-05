import refs from './refs';
import spinner from './spinner';
import { getMovie } from './getGenresId';
import { clearContainer } from './clearContainer';
import {addsToLibrary} from './addsToLibrary'

refs.closeBtn.addEventListener('click', closeModal);
refs.lightBox.addEventListener('click', closeModalOnBackdrop);
refs.onMovieClick.addEventListener('click', showModal);

async function showModal(event) {
  event.preventDefault();

  const target = event.target.parentNode;
  if (target.parentNode.nodeName !== 'A') return;

  refs.body.classList.add('no-scroll');
  refs.modal.classList.remove('is-hidden');

  window.addEventListener('keydown', closeModalOnEsc);

  try {
    const idMovie = target.parentNode.dataset.id;
    spinner.show();
    await getMovie(idMovie);
    spinner.hide();

   addsToLibrary(idMovie);

  } catch (error) {
    console.log(error);
  }
}

function closeModal() {
  refs.modal.classList.add('is-hidden');
  clearContainer(refs.modalContaier);
  clearContainer(refs.modalPoster);
  window.removeEventListener('keydown', closeModalOnEsc);
  refs.body.classList.remove('no-scroll');
}

function closeModalOnBackdrop(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}
function closeModalOnEsc(event) {
  if (event.key !== 'Escape') return;
  closeModal();
}
