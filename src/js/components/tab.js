const menuElements = document.querySelectorAll('[data-tab]');

function Tabs() {
  const bindAll = function() {
    for(let i = 0; i < menuElements.length ; i++) {
      menuElements[i].addEventListener('click', change, false);
    }
  }

  const clear = function() {
    for(let i = 0; i < menuElements.length ; i++) {
      menuElements[i].classList.remove('active');
      const id = menuElements[i].getAttribute('data-tab');
      document.getElementById(id).classList.remove('active');
    }
  }

  const change = function(e) {
    clear();
    e.target.classList.add('active');
    const id = e.currentTarget.getAttribute('data-tab');
    document.getElementById(id).classList.add('active');
  }

  bindAll();
}

const connectTabs = new Tabs();

export default connectTabs;