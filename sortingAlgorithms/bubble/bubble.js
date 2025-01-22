import { sleep } from "../util.js";
import { SortingAlgorithms } from "../sortingAlgorithms.js";

const sortingAlgorithms = new SortingAlgorithms();
const generateBtn = document.getElementById('generate');
const startBtn = document.getElementById('start');
const restartBtn = document.getElementById('restart');
const addValueBtn = document.getElementById('addValueBtn');
const inputMethodSelect = document.getElementById('inputMethod');
const arraySizeInput = document.getElementById('arraySize');
const commaValuesInput = document.getElementById('commaValues');
const addValueInput = document.getElementById('addValue');
const visualization = document.getElementById('visualization');
const speedSlider = document.getElementById('speed');
const speedValueDisplay = document.getElementById('speedValue');

let bars = [];
let sortingSpeed = 300; // Default sorting speed in milliseconds
let isSorting = false;

// Initialize input visibility
const updateInputVisibility = () => {
  const method = inputMethodSelect.value;
  document.getElementById('arraySizeInputGroup').style.display = method === 'arraySize' ? 'block' : 'none';
  document.getElementById('commaValuesInputGroup').style.display = method === 'commaValues' ? 'block' : 'none';
  document.getElementById('addValueInputGroup').style.display = method === 'addValues' ? 'block' : 'none';
  generateBtn.style.display = method === 'addValues' ? 'none' : 'inline-block';
};

inputMethodSelect.addEventListener('change', updateInputVisibility);

// Update sorting speed based on slider input
speedSlider.addEventListener('input', () => {
  if (!isSorting) {
    sortingSpeed = parseInt(speedSlider.value, 10);
    speedValueDisplay.textContent = `${sortingSpeed}ms`;
  }
});

const generateArray = () => {
  const method = inputMethodSelect.value;
  const size = parseInt(arraySizeInput.value, 10);
  const commaValues = commaValuesInput.value.split(',').map(v => parseInt(v.trim(), 10)).filter(v => !isNaN(v));

  visualization.innerHTML = '';
  bars = [];

  if (method === 'arraySize') {
    if (size >= 1 && size <= 65) {
      bars = Array.from({ length: size }, () => Math.floor(Math.random() * 1000) + 1);
    } else {
      alert("Please enter a valid array size between 1 and 65.");
      return;
    }
  } else if (method === 'commaValues') {
    if (commaValues.length >= 1 && commaValues.length <= 65) {
      bars = commaValues;
    } else {
      alert("Please enter between 1 and 65 values.");
      return;
    }
  } else if (method === 'addValues') {
    // No action for addValues; it should be handled by real-time adding.
    return;
  }

  renderBars();
};

const renderBars = () => {
  visualization.innerHTML = '';

  const minBarHeight = 20; // Minimum height in percentage
  const barWidth = 20; // Width of each bar in pixels
  const barGap = 5; // Gap between bars in pixels
  const visualizationWidth = visualization.clientWidth;

  // Determine the maximum value for scaling
  const maxValue = Math.max(...bars, 1); // Ensure at least 1 to avoid division by zero

  bars.forEach(value => {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    
    // Calculate height proportionally with a minimum height
    const barHeightPercentage = Math.max((value / maxValue) * 100, minBarHeight);
    bar.style.height = `${barHeightPercentage}%`;

    // Calculate width to fit within the container
    bar.style.width = `${Math.min(barWidth, (visualizationWidth / bars.length) - barGap)}px`;
    
    // Create and append the value display
    const barValue = document.createElement('div');
    barValue.classList.add('bar-value');
    barValue.textContent = value;
    bar.appendChild(barValue);

    visualization.appendChild(bar);
  });
};



const addValue = () => {
  const value = parseInt(addValueInput.value, 10);
  if (value >= 1 && value <= 1000 && bars.length < 65) {
    bars.push(value);
    renderBars();
    addValueInput.value = ''; // Clear the input field after adding the value
  } else {
    alert("Enter a valid value between 1 and 1000 and ensure array size does not exceed 65.");
  }
};

const swapBars = async (i, j) => {
  const barsDivs = document.querySelectorAll('.bar');
  barsDivs[i].classList.add('active');
  barsDivs[j].classList.add('active');

  await sleep(sortingSpeed);

  [barsDivs[i].style.height, barsDivs[j].style.height] = [barsDivs[j].style.height, barsDivs[i].style.height];
  [bars[i], bars[j]] = [bars[j], bars[i]];

  barsDivs[i].classList.remove('active');
  barsDivs[j].classList.remove('active');
};

const visualizeSorting = async () => {
  if (isSorting) return; // Prevent multiple sortings at the same time
  isSorting = true;
  speedSlider.disabled = true; // Disable slider while sorting

  const swaps = sortingAlgorithms.bubbleSort(bars.slice());

  for (const { firstPostion, lastPosition } of swaps) {
    await swapBars(firstPostion, lastPosition);
  }

  isSorting = false;
  speedSlider.disabled = false; // Re-enable slider after sorting
};

const restartSorting = () => {
  visualization.innerHTML = '';
  bars = [];
  inputMethodSelect.value = '';
  arraySizeInput.value = '';
  commaValuesInput.value = '';
  addValueInput.value = '';
  updateInputVisibility();
  speedSlider.disabled = false; // Ensure slider is enabled on restart
};

generateBtn.addEventListener('click', generateArray);
addValueBtn.addEventListener('click', addValue);
startBtn.addEventListener('click', visualizeSorting);
restartBtn.addEventListener('click', restartSorting);

// Initialize input visibility on page load
updateInputVisibility();
