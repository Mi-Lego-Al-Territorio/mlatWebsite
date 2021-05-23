const actionBtns = document.querySelectorAll('.more-btn');
const cancelBtns = document.querySelectorAll('.cancel');
const truncatedEventsDescriptions = document.querySelectorAll(
  '.eventCard .truncated-text p'
);
const fullEventsDescriptions = document.querySelectorAll(
  '.eventCard .full-text p'
);
console.log(fullEventsDescriptions);
const eventsImgs = document.querySelectorAll('.eventCard picture');

const truncatedTexts = {};
actionBtns.forEach((btn, idx) => {
  btn.addEventListener('click', e => {
    console.log(truncatedEventsDescriptions[idx].innerText.slice(-1));
    const text = truncatedEventsDescriptions[idx].innerText;
    const showingUncompleteText = text.slice(-1) === '…';
    if (showingUncompleteText) {
      // store HUGO-trucated text to reuse later
      truncatedTexts[idx] = text;
      truncatedEventsDescriptions[idx].innerText =
        fullEventsDescriptions[idx].innerText;
      // the event is close
      eventsImgs[idx].style.display = 'block';
      actionBtns[idx].classList.remove('flaticon-null');
      actionBtns[idx].classList.add('flaticon-null-1');
    } else {
      truncatedEventsDescriptions[idx].innerText = truncatedTexts[idx];
      // the event is open
      eventsImgs[idx].style.display = 'none';
      actionBtns[idx].classList.remove('flaticon-null-1');
      actionBtns[idx].classList.add('flaticon-null');
    }
  });
});
