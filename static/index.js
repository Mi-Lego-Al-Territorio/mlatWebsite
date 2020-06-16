function expandHeader() {
  document.querySelector('header').style.height = '80px';
  document.querySelector('label').style.top = '22px';
}

function shrinkHeader() {
  document.querySelector('header').style.height = '60px';
  document.querySelector('label').style.top = '10px';
}

if (isMobile) {
  window.addEventListener('scroll', () => {
    // TODO need to adjust based on SASS variables
    if (!isMenuOpen) {
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      ) {
        shrinkHeader();
      } else {
        expandHeader();
      }
    }
  });
}

document.querySelector('label').addEventListener('click', () => {
  expandHeader();
});

function updatedMenuState() {
  isMenuOpen = checkBox.checked;
  localStorage.setItem('mlatMenu', isMenuOpen ? 'open' : 'closed');
}

document.querySelector('#overlay').addEventListener('click', () => {
  checkBox.checked = false;
  updatedMenuState();
});

checkBox.addEventListener('change', () => {
  updatedMenuState();
});
