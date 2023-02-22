const leadOverlay = document.querySelector('.lead__overlay');

function showLeadElements(element, delay) {
  setTimeout(() => {
    element.classList.add('animated')
  }, delay);
}

function runLeadAnimation() {
  let delay = 1000;
  Array.from(leadOverlay.children).forEach(element => {
    showLeadElements(element, delay);
    delay = delay + 500;
  })
}


runLeadAnimation();



