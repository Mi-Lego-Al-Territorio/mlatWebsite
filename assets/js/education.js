import * as params from '@params';
// intersection observer setup
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.7
};
const audIds = params.audIds;
const audiences = document.querySelectorAll('.education-audience-selector');

const arrowUp = document.querySelector('#arrow-up');
const arrowDown = document.querySelector('#arrow-down');
const currSelectedId = 'education-current-selected';
const currSelectedAudPill = document.getElementById(currSelectedId);
const curreSelectedCancel = document.querySelector(`#${currSelectedId} i`);

const startMsg = document.querySelector('.education-step.start-msg');
const endMsg = document.querySelector('.education-step.end-msg');
const startMsgLink = document.querySelector("a[href='#start-msg']");
const endMsgLink = document.querySelector("a[href='#end-msg']");
const startMsgAnchor = document.querySelector('a#start-msg.step-anchor');
const endMsgAnchor = document.querySelector('a#end-msg.step-anchor');

curreSelectedCancel.addEventListener('click', () => {
  allAudiencesElements.forEach(audElem => {
    audElem.classList.add('no-display');
  });
  startMsg.scrollIntoView({ behavior: 'smooth' });
  currSelectedAudPill.style.opacity = 0;
});
const currSelectedAudText = document.querySelector(`#${currSelectedId} h3`);

let currSelAudId = undefined;
const allAudiencesElements = [];
audIds.forEach(audId => {
  document.querySelectorAll(`.${audId}`).forEach(elem => {
    allAudiencesElements.push(elem);
  });
});

audIds.forEach((audId, audIdIdx) => {
  const aud = audiences[audIdIdx];
  const selectedAudElems = document.querySelectorAll(`.${audId}`);
  const steps = Array.from(
    document.querySelectorAll(`div.education-step.${audId}`)
  );

  aud.addEventListener('click', () => {
    if (
      currSelectedAudPill.style.opacity === '0' ||
      currSelectedAudPill.style.opacity === ''
    ) {
      currSelAudId = audId;
      // first time clicked
      selectedAudElems.forEach(audElem => {
        audElem.classList.remove('no-display');
      });
      currSelectedAudPill.style.opacity = 1;
      currSelectedAudText.style.opacity = 1;
      currSelectedAudText.innerHTML = aud.id;
      steps[0].scrollIntoView({ behavior: 'smooth' });
    } else {
      currSelAudId = audId;
      currSelectedAudText.style.opacity = 0;
      setTimeout(() => {
        allAudiencesElements.forEach(audElem => {
          audElem.classList.add('no-display');
        });
        selectedAudElems.forEach(audElem => {
          audElem.classList.remove('no-display');
        });
        currSelectedAudText.style.opacity = 1;
        currSelectedAudText.innerHTML = aud.id;
        steps[0].scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  });

  // get all div which display a step
  let stepInView = 0;

  // get all anchors in steps
  const stepAnchors = Array.from(
    document.querySelectorAll(`.step-anchor.${audId}`)
  );

  // get all anchors in sidebar which point to a step
  const stepLinks = Array.from(
    document.querySelectorAll(`.education-navigator a.${audId}`)
  );

  arrowUp.addEventListener('click', () => {
    let activeAnchors;
    if (currSelAudId === undefined) {
      activeAnchors = [startMsgAnchor, endMsgAnchor];
    } else {
      activeAnchors = [startMsgAnchor, ...stepAnchors, endMsgAnchor];
    }
    activeAnchors[stepInView - 1].scrollIntoView({ behavior: 'smooth' });
  });

  arrowDown.addEventListener('click', () => {
    let activeAnchors;
    if (currSelAudId === undefined) {
      activeAnchors = [startMsgAnchor, endMsgAnchor];
    } else {
      activeAnchors = [startMsgAnchor, ...steps, endMsgAnchor];
    }
    activeAnchors[stepInView + 1].scrollIntoView({ behavior: 'smooth' });
  });

  function observerCallback(entries) {
    let activeElements;
    let activeLinks;
    if (currSelAudId === undefined) {
      activeElements = [startMsg, endMsg];
      activeLinks = [startMsgLink, endMsgLink];
    } else {
      activeElements = [startMsg, ...steps, endMsg];
      activeLinks = [startMsgLink, ...stepLinks, endMsgLink];
    }
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        stepInView = activeElements.indexOf(entry.target);
        if (stepInView === 0) {
          changeVisibility(arrowUp, false);
          changeVisibility(arrowDown, true);
        } else if (stepInView === activeElements.length - 1) {
          changeVisibility(arrowUp, true);
          changeVisibility(arrowDown, false);
        } else if (currSelAudId !== undefined) {
          changeVisibility(arrowUp, true);
          changeVisibility(arrowDown, true);
        }
        activeLinks.forEach(step => changeHighlight(step, false));
        changeHighlight(activeLinks[stepInView], true);
      }
    });
  }

  const stepsObserver = new IntersectionObserver(
    observerCallback,
    observerOptions
  );

  steps.forEach(step => stepsObserver.observe(step));
  stepsObserver.observe(startMsg);
  stepsObserver.observe(endMsg);
});

function changeVisibility(elem, shouldBeSeen) {
  if (shouldBeSeen) elem.classList.remove('no-visibility');
  else elem.classList.add('no-visibility');
}

function changeHighlight(elem, shouldBeHighligth) {
  if (shouldBeHighligth) elem.classList.add(`nav-highlighted`);
  else elem.classList.remove(`nav-highlighted`);
}

// function startMsgObCallback(entries) {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       changeVisibility(arrowUp, false);
//       changeVisibility(arrowDown, true);
//     }
//   });
// }

// const startObserver = new IntersectionObserver(
//   startMsgObCallback,
//   observerOptions
// );
// startObserver.observe(startMsg);

// function endMsgObCallback(entries) {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       changeVisibility(arrowUp, true);
//       changeVisibility(arrowDown, false);
//     }
//   });
// }

// const endObserver = new IntersectionObserver(endMsgObCallback, observerOptions);
// endObserver.observe(endMsg);
