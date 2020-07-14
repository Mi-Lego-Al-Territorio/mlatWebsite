let stepInView = 0;
let scrollPos;

// get all div which display a step
const steps = Array.from(document.querySelectorAll('a.step-anchor'));

// get all anchors in sidebar which point to a step
const stepLinks = Array.from(
  document.querySelectorAll('.education-navigator a')
);

const arrowUp = document.querySelector('#arrow-up');
const arrowDown = document.querySelector('#arrow-down');

// function to update the step in view according to the type of user interaction
function updateStepInView(value, direction, type) {
  stepLinks[stepInView].classList.remove('nav-highlighted');
  if (direction === 'up') {
    if (stepInView > 0) stepInView -= 1;
    if (stepInView == 0) arrowUp.classList.add('no-visibility');
    arrowDown.classList.remove('no-visibility');
  } else if (direction === 'down') {
    arrowDown.classList.remove('no-visibility');
    if (stepInView < steps.length - 1) stepInView += 1;
    if (stepInView == steps.length - 1)
      arrowDown.classList.add('no-visibility');
    arrowUp.classList.remove('no-visibility');
  }
  if (type === 'jump' || type === 'scroll') {
    stepInView = value;
  }
  if (type !== 'scroll') {
    steps[stepInView].scrollIntoView();
  }
  stepLinks[stepInView].classList.add('nav-highlighted');
}

// function convert scroll position to step in view idx
function scrollPosToStepId() {
  const stepHeight = document.querySelector('.education-step').clientHeight;
  let value = document.documentElement.scrollTop / stepHeight;
  return value - (value % 1);
}

stepLinks.forEach(elm => {
  elm.addEventListener('click', e => {
    updateStepInView(stepLinks.indexOf(elm), undefined, 'jump');
  });
});

arrowUp.addEventListener('click', () => {
  updateStepInView(undefined, 'up');
});

arrowDown.addEventListener('click', () => {
  updateStepInView(undefined, 'down');
});

window.addEventListener('scroll', () => {
  updateStepInView(
    scrollPosToStepId(),
    document.body.getBoundingClientRect().top > scrollPos ? 'up' : 'down',
    'scroll'
  );
  scrollPos = document.body.getBoundingClientRect().top;
});

updateStepInView(scrollPosToStepId(), undefined, 'jump');
