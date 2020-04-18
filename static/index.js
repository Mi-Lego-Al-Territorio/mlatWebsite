window.onscroll = function () {
  scrollFunction();
};

// TODO need to adjust based on SASS variables
function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.querySelector('header').style.height = '60px';
    document.querySelector('label').style.top = '10px';
  } else {
    document.querySelector('header').style.height = '80px';
    document.querySelector('label').style.top = '22px';
  }
}
