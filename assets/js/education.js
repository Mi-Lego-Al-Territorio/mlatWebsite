// get all div which display a step
const steps = Array.from(document.querySelectorAll('div.education-step'));
let stepInView = 0;

// get all anchors in steps
const stepAnchors = Array.from(document.querySelectorAll('.step-anchor'));

// get all anchors in sidebar which point to a step
const stepLinks = Array.from(
  document.querySelectorAll('.education-navigator a')
);

const arrowUp = document.querySelector('#arrow-up');
const arrowDown = document.querySelector('#arrow-down');

function changeVisibility(elm, shouldBeSeen) {
  if (shouldBeSeen) elm.classList.remove('no-visibility');
  else elm.classList.add('no-visibility');
}

function changeHighlight(elm, shouldBeHighligth) {
  if (shouldBeHighligth) elm.classList.add('nav-highlighted');
  else elm.classList.remove('nav-highlighted');
}

arrowUp.addEventListener('click', () => {
  stepAnchors[stepInView - 1].scrollIntoView();
});

arrowDown.addEventListener('click', () => {
  stepAnchors[stepInView + 1].scrollIntoView();
});

// intersection observer setup
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.7
};

function observerCallback(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      stepInView = steps.indexOf(entry.target);
      if (stepInView === 0) {
        changeVisibility(arrowUp, false);
        changeVisibility(arrowDown, true);
      } else if (stepInView === steps.length - 1) {
        changeVisibility(arrowUp, true);
        changeVisibility(arrowDown, false);
      } else {
        changeVisibility(arrowUp, true);
        changeVisibility(arrowDown, true);
      }
      // remove highlight from all links
      stepLinks.forEach(step => changeHighlight(step, false));
      // highlight corerct one
      changeHighlight(stepLinks[stepInView], true);
    }
  });
}

const observer = new IntersectionObserver(observerCallback, observerOptions);

steps.forEach(step => observer.observe(step));
