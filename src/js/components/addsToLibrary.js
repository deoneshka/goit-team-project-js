function addsToLibrary(idMovie) {
  const modalButtonWatched = document.querySelector('.js-modal-btn-watched');
  const modalButtonQueue = document.querySelector('.js-modal-btn-queue');

  modalButtonWatched.addEventListener('click', onWatchedButton);
  modalButtonQueue.addEventListener('click', onQueueButton);

  if (!localStorage.getItem('filmWatched')) {
    localStorage.setItem('filmWatched', JSON.stringify([]));
  }
  if (localStorage.getItem('filmWatched')) {
    const filmsStorage = localStorage.getItem('filmWatched');
    const filmsStorageArray = JSON.parse(filmsStorage);
    if (filmsStorageArray.includes(modalButtonWatched.id)) {
      modalButtonWatched.textContent = 'REMOVE FROM WATCHED';
    }
  }
  ///////////////////////////////////////////////////////////////////////
  if (!localStorage.getItem('filmQueue')) {
    localStorage.setItem('filmQueue', JSON.stringify([]));
  }
  if (localStorage.getItem('filmQueue')) {
    const filmsStorage = localStorage.getItem('filmQueue');
    const filmsStorageArray = JSON.parse(filmsStorage);
    if (filmsStorageArray.includes(modalButtonWatched.id)) {
      modalButtonQueue.textContent = 'REMOVE FROM QUEUE';
    }
  }
}
function onWatchedButton(event) {
  const filmsStorage = localStorage.getItem('filmWatched');
  const filmsStorageArray = JSON.parse(filmsStorage);
  if (!filmsStorageArray.includes(event.target.id)) {
    filmsStorageArray.push(event.target.id);
    event.target.textContent = 'REMOVE FROM WATCHED';
    localStorage.setItem('filmWatched', JSON.stringify(filmsStorageArray));
  } else {
    event.target.textContent = 'ADD TO WATCHED';
    const index = filmsStorageArray.indexOf(event.target.id);
    filmsStorageArray.splice(index, 1);
    localStorage.setItem('filmWatched', JSON.stringify(filmsStorageArray));
  }
}
function onQueueButton(event) {
  const filmsStorage = localStorage.getItem('filmQueue');
  const filmsStorageArray = JSON.parse(filmsStorage);
  if (!filmsStorageArray.includes(event.target.id)) {
    filmsStorageArray.push(event.target.id);
    event.target.textContent = 'REMOVE FROM QUEUE';
    localStorage.setItem('filmQueue', JSON.stringify(filmsStorageArray));
  } else {
    event.target.textContent = 'ADD TO QUEUE';
    const index = filmsStorageArray.indexOf(event.target.id);
    filmsStorageArray.splice(index, 1);
    localStorage.setItem('filmQueue', JSON.stringify(filmsStorageArray));
  }
}
export { addsToLibrary };
