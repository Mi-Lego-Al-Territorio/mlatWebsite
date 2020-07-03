const moreBtns = document.querySelectorAll('.flaticon-more');
const eventsDescription = document.querySelectorAll('.eventCard p');
const eventsImgs = document.querySelectorAll('.eventCard picture');
console.log(moreBtns);
console.log(eventsDescription);
console.log(eventsImgs);

moreBtns.forEach((btn, idx) => {
  btn.addEventListener('click', e => {
    if (window.getComputedStyle(eventsDescription[idx]).display == 'none') {
      eventsDescription[idx].style.display = 'block';
      eventsImgs[idx].style.display = 'block';
    } else {
      eventsDescription[idx].style.display = 'none';
      eventsImgs[idx].style.display = 'none';
    }
  });
});
