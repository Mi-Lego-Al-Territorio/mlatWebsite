const actionBtns = document.querySelectorAll('.action-btn');
const cancelBtns = document.querySelectorAll('.cancel');
const eventsDescription = document.querySelectorAll('.eventCard p');
const eventsImgs = document.querySelectorAll('.eventCard picture');

actionBtns.forEach((btn, idx) => {
  btn.addEventListener('click', e => {
    if (window.getComputedStyle(eventsDescription[idx]).display == 'none') {
      // the event is close
      eventsDescription[idx].style.display = 'block';
      eventsImgs[idx].style.display = 'block';
      actionBtns[idx].classList.remove('flaticon-more');
      actionBtns[idx].classList.add('flaticon-cancel');
    } else {
      // the event is open
      eventsDescription[idx].style.display = 'none';
      eventsImgs[idx].style.display = 'none';
      actionBtns[idx].classList.remove('flaticon-cancel');
      actionBtns[idx].classList.add('flaticon-more');
    }
  });
});
