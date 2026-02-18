window.addEventListener('DOMContentLoaded', () => {
  const water = document.querySelector('.water');
  if (!water) return;

  const BUBBLE_COUNT = 8;       // simple fixed number
  const RISE_TIME_MS = 6000;    // must match CSS animation-duration (6s)

  // helper: pick random number between min and max
  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  // create one bubble and schedule its removal
  function createBubble(sizeIndex = 0, leftPercent = 50) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
  
    // size from index 0,1,2 => small, medium, large
    if (sizeIndex === 0) bubble.classList.add('small');
    else if (sizeIndex === 1) bubble.classList.add('medium');
    else bubble.classList.add('large');
  
    // position horizontally inside water
    bubble.style.left = `${leftPercent}%`;
  
    // append
    water.appendChild(bubble);
  
    // remove after the animation finishes
    setTimeout(() => {
      if (bubble.parentElement) bubble.parentElement.removeChild(bubble);
    }, RISE_TIME_MS + 100); // small buffer
  }
  
  // create a few initial bubbles using a simple for loop
  for (let i = 0; i < BUBBLE_COUNT; i++) {
    // choose size cyclically and choose a left position randomly
    const sizeIndex = i % 3;
    const left = Math.floor(rand(8, 92));
  
    // small stagger so they don't all start exactly together
    const delay = Math.floor(rand(0, 1200));
    setTimeout(() => createBubble(sizeIndex, left), delay);
  }
  
  // keep adding a simple bubble every few seconds
  setInterval(() => {
    const sizeIndex = Math.floor(rand(0, 3));
    const left = Math.floor(rand(8, 92));
    createBubble(sizeIndex, left);
  }, 700); // one every 0.7 second
});
  
  