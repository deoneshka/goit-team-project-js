import refs from './refs';
const openTeamRef = document.querySelector('[data-open-team]');
const backdropRef = document.querySelector('[data-backdrop]');
const closeTeamRef = document.querySelector('[data-close-team]');

openTeamRef.addEventListener('click', openTeamModal);
closeTeamRef.addEventListener('click', closeTeamModal);
backdropRef.addEventListener('click', closeByClickOnBackdrop);

function openTeamModal(event) {
  event.preventDefault();
  backdropRef.classList.remove('is-hidden');
  refs.body.classList.add('no-scroll');
  window.addEventListener('keydown', closeTeamModalOnEsc);
}

function closeTeamModal() {
  backdropRef.classList.add('is-hidden');
  refs.body.classList.remove('no-scroll');
  window.removeEventListener('keydown', closeTeamModalOnEsc);
}

function closeByClickOnBackdrop(event) {
  if (event.target === event.currentTarget) {
    closeTeamModal();
  }
}

function closeTeamModalOnEsc(event) {
  if (event.key !== 'Escape') return;
  closeTeamModal();
}
