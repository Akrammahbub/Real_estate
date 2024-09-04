document
  .querySelectorAll(".dropdown-menu .form-check-input")
  .forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const selected = [];
      document
        .querySelectorAll(".dropdown-menu .form-check-input:checked")
        .forEach((checkedBox) => {
          selected.push(checkedBox.nextElementSibling.innerText);
        });
      document.getElementById("propertyDropdown").innerText =
        selected.length > 0
          ? selected.join(", ")
          : "Select Property Type";
    });
  });



// JavaScript to handle button click and toggle 'active' class
const categoryButtons = document.querySelectorAll('.category-btn');

categoryButtons.forEach(button => {
button.addEventListener('click', function() {
  // Remove 'active' class from all buttons
  categoryButtons.forEach(btn => btn.classList.remove('active'));

  // Add 'active' class to the clicked button
  this.classList.add('active');
});
});



document.querySelectorAll('.multi-select-btn').forEach(button => {
    button.addEventListener('click', function() {
        this.classList.toggle('focused');
    });
});



const sqmToggle = document.getElementById('sqm-toggle');
const sqftToggle = document.getElementById('sqft-toggle');
const rangeSliderMin = document.getElementById('range-slider-min');
const rangeSliderMax = document.getElementById('range-slider-max');
const minInput = document.getElementById('min-input');
const maxInput = document.getElementById('max-input');
const rangeTrack = document.querySelector('.range-slider-track');

let currentUnit = 'sqm';
const unitConversions = {
    toSqft: (value) => value * 10.7639,
    toSqm: (value) => value / 10.7639
};

function updateValues() {
    let minVal = parseInt(rangeSliderMin.value);
    let maxVal = parseInt(rangeSliderMax.value);

    if (currentUnit === 'sqft') {
        minVal = unitConversions.toSqft(minVal);
        maxVal = unitConversions.toSqft(maxVal);
    }

    minInput.value = Math.round(minVal);
    maxInput.value = Math.round(maxVal);

    const minPercent = ((rangeSliderMin.value - rangeSliderMin.min) / (rangeSliderMin.max - rangeSliderMin.min)) * 100;
    const maxPercent = ((rangeSliderMax.value - rangeSliderMin.min) / (rangeSliderMin.max - rangeSliderMin.min)) * 100;

    rangeTrack.style.background = `linear-gradient(to right, #d89582 ${minPercent}%, #d89582 ${minPercent}%, #d89582 ${maxPercent}%, #d89582 ${maxPercent}%)`;
}

function syncSliders() {
    if (parseInt(rangeSliderMin.value) > parseInt(rangeSliderMax.value)) {
        rangeSliderMin.value = rangeSliderMax.value;
    }
    if (parseInt(rangeSliderMax.value) < parseInt(rangeSliderMin.value)) {
        rangeSliderMax.value = rangeSliderMin.value;
    }
    updateValues();
}

rangeSliderMin.addEventListener('input', () => {
    syncSliders();
});

rangeSliderMax.addEventListener('input', () => {
    syncSliders();
});

minInput.addEventListener('input', () => {
    let inputVal = parseInt(minInput.value);
    if (currentUnit === 'sqft') {
        inputVal = unitConversions.toSqm(inputVal);
    }
    rangeSliderMin.value = Math.round(inputVal);
    syncSliders();
});

maxInput.addEventListener('input', () => {
    let inputVal = parseInt(maxInput.value);
    if (currentUnit === 'sqft') {
        inputVal = unitConversions.toSqm(inputVal);
    }
    rangeSliderMax.value = Math.round(inputVal);
    syncSliders();
});

sqmToggle.addEventListener('click', () => {
    if (currentUnit !== 'sqm') {
        currentUnit = 'sqm';
        sqmToggle.classList.add('active');
        sqftToggle.classList.remove('active');
        syncSliders();
    }
});

sqftToggle.addEventListener('click', () => {
    if (currentUnit !== 'sqft') {
        currentUnit = 'sqft';
        sqftToggle.classList.add('active');
        sqmToggle.classList.remove('active');

        rangeSliderMin.value = unitConversions.toSqm(rangeSliderMin.value);
        rangeSliderMax.value = unitConversions.toSqm(rangeSliderMax.value);

        syncSliders();
    }
});

syncSliders();




const aedToggle = document.getElementById('aed-toggle');
const usdToggle = document.getElementById('usd-toggle');
const cnyToggle = document.getElementById('cny-toggle');
const gbpToggle = document.getElementById('gbp-toggle');
const currencyRangeSliderMin = document.getElementById('currency-range-slider-min');
const currencyRangeSliderMax = document.getElementById('currency-range-slider-max');
const currencyMinInput = document.getElementById('currency-min-input');
const currencyMaxInput = document.getElementById('currency-max-input');
const currencyRangeTrack = document.querySelector('.currency-range-slider-track');

let currentCurrency = 'AED';
const currencyConversions = {
    AED: (value) => value,
    USD: (value) => value * 0.27, // Conversion factor for AED to USD
    CNY: (value) => value * 1.79, // Conversion factor for AED to CNY
    GBP: (value) => value * 0.21  // Conversion factor for AED to GBP
};

// Function to update slider values
function updateCurrencyValues() {
    let minVal = parseInt(currencyRangeSliderMin.value);
    let maxVal = parseInt(currencyRangeSliderMax.value);

    if (currentCurrency !== 'AED') {
        minVal = currencyConversions[currentCurrency](minVal);
        maxVal = currencyConversions[currentCurrency](maxVal);
    }

    currencyMinInput.value = Math.round(minVal);
    currencyMaxInput.value = Math.round(maxVal);

    const minPercent = ((currencyRangeSliderMin.value - currencyRangeSliderMin.min) / (currencyRangeSliderMin.max - currencyRangeSliderMin.min)) * 100;
    const maxPercent = ((currencyRangeSliderMax.value - currencyRangeSliderMin.min) / (currencyRangeSliderMin.max - currencyRangeSliderMin.min)) * 100;

    currencyRangeTrack.style.background = `linear-gradient(to right, #d89582 ${minPercent}%, #d89582 ${minPercent}%, #d89582 ${maxPercent}%, #d89582 ${maxPercent}%)`;

    
}

// Function to sync slider values
function syncCurrencySliders() {
    const minVal = parseInt(currencyRangeSliderMin.value);
    const maxVal = parseInt(currencyRangeSliderMax.value);

    if (minVal > maxVal) {
        currencyRangeSliderMin.value = maxVal;
    }
    if (maxVal < minVal) {
        currencyRangeSliderMax.value = minVal;
    }
    
    updateCurrencyValues();
}

// Event listeners for sliders
currencyRangeSliderMin.addEventListener('input', syncCurrencySliders);
currencyRangeSliderMax.addEventListener('input', syncCurrencySliders);

// Event listeners for input fields
currencyMinInput.addEventListener('input', () => {
    let inputVal = parseInt(currencyMinInput.value);
    if (currentCurrency !== 'AED') {
        inputVal = inputVal / currencyConversions ;
    }
    currencyRangeSliderMin.value = Math.round(inputVal);
    syncCurrencySliders();
});

currencyMaxInput.addEventListener('input', () => {
    let inputVal = parseInt(currencyMaxInput.value);
    if (currentCurrency !== 'AED') {
        inputVal = inputVal / currencyConversions ;
    }
    currencyRangeSliderMax.value = Math.round(inputVal);
    syncCurrencySliders();
});

// Event listeners for currency toggles
[aedToggle, usdToggle, cnyToggle, gbpToggle].forEach(toggle => {
    toggle.addEventListener('click', (event) => {
        const selectedCurrency = event.target.id.split('-')[0].toUpperCase();
        if (currentCurrency !== selectedCurrency) {
            currentCurrency = selectedCurrency;
            document.querySelectorAll('.currency-unit').forEach(el => el.classList.remove('active'));
            event.target.classList.add('active');
            updateCurrencyValues();
        }
    });
});

// Initialize values
updateCurrencyValues();

