import refs from './refs';
const openTeamRef = document.querySelector('[data-open-team]');
const backdropRef = document.querySelector('[data-backdrop]');
const closeTeamRef = document.querySelector('[data-close-team]');

openTeamRef.addEventListener('click', openTeamModal);
closeTeamRef.addEventListener('click', closeTeamModal);
backdropRef.addEventListener('click', closeByClickOnBackdrop);

function openTeamModal(event) {
  event.preventDefault();
  refs.body.style.paddingRight =
    window.innerWidth - refs.body.clientWidth + 'px';
  if (backdropRef.firstElementChild.clientHeight + 40 > window.innerHeight) {
    backdropRef.firstElementChild.style.left = '0px';
  } else {
    backdropRef.firstElementChild.style.left =
      (refs.body.clientWidth - window.innerWidth) / 2 + 'px';
  }

  refs.body.lastElementChild.style.visibility = 'hidden';
  refs.body.classList.add('no-scroll');
  backdropRef.classList.remove('is-hidden');
  window.addEventListener('keydown', closeTeamModalOnEsc);
}

function closeTeamModal() {
  backdropRef.classList.add('is-hidden');
  refs.body.classList.remove('no-scroll');
  refs.body.style.paddingRight = '0px';
  backdropRef.firstElementChild.style.left = '0px';
  refs.body.lastElementChild.style.visibility = 'visible';
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
