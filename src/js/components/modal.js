import refs from './refs';
import spinner from './spinner';
import { getMovie } from './getGenresId';
import { clearContainer } from './clearContainer';

refs.closeBtn.addEventListener('click', closeModal);
refs.lightBox.addEventListener('click', closeModalOnBackdrop);
refs.onMovieClick.addEventListener('click', showModal);

async function showModal(event) {
  event.preventDefault();
  spinner.show();
  refs.body.classList.add('no-scroll');
  window.addEventListener('keydown', closeModalOnEsc);
  const target = event.target.parentNode;
  if (target.parentNode.nodeName !== 'A') return;
  refs.modal.classList.remove('is-hidden');
  try {
    const idMovie = target.parentNode.dataset.id;
    await getMovie(idMovie);
  } catch (error) {
    console.log(error);
  }
  spinner.hide();
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
