// Geometry triangle toggle
const triangleBox = document.getElementById('triangleBox');
const triangle = document.getElementById('triangle');

const toggleTriangle = () => {
  const isVisible = triangle.classList.toggle('visible');
  triangleBox.setAttribute('aria-pressed', String(isVisible));
};

triangleBox.addEventListener('click', toggleTriangle);
triangleBox.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleTriangle();
  }
});

// Date picker
const dateInput = document.getElementById('dateInput');
const pickedText = document.getElementById('pickedText');
const chosenDate = document.getElementById('chosenDate');

const formatDateUS = (d) => {
  if (!(d instanceof Date) || isNaN(d)) return '';
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
};

const onDateChange = (e) => {
  const val = e.target.value;
  if (!val) {
    pickedText.hidden = true;
    chosenDate.textContent = '';
    return;
  }
  const parts = val.split('-');
  const dt = new Date(parts[0], parts[1] - 1, parts[2]);
  chosenDate.textContent = formatDateUS(dt);
  pickedText.hidden = false;
};

dateInput.addEventListener('change', onDateChange);

// Image toggle
const imageFrame = document.getElementById('imageFrame');
const sceneSvg = document.getElementById('sceneSvg');

// Toggle framed class on the container to reveal/hide the colorful border
const toggleFrame = () => {
  const isFramed = imageFrame.classList.toggle('framed');

  // for accessibility, keep aria-pressed state
  imageFrame.setAttribute('aria-pressed', String(isFramed));

  // small visual 'pop' using transform
  if (isFramed) {
    sceneSvg.style.transform = 'scale(0.98)';
    setTimeout(() => { sceneSvg.style.transform = ''; }, 260);
  } else {
    sceneSvg.style.transform = '';
  }
};

imageFrame.addEventListener('click', toggleFrame);
imageFrame.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleFrame();
  }
});

