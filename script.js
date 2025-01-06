const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const resultDisplay = document.getElementById('result');
const fromSearchInput = document.getElementById('fromSearch');
const toSearchInput = document.getElementById('toSearch');
const swapBtn = document.getElementById('swapBtn');
const dateInput = document.getElementById('date');
const loadingSpinner = document.getElementById('loading-spinner');

const apiKey = 'YOUR_API_KEY'; // Add your API key here (for real-time conversion)

// List of available currencies (for demonstration)
const currencyList = [
  { code: 'USD', name: 'United States Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'INR', name: 'Indian Rupee' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'AUD', name: 'Australian Dollar' },
  // Add more currencies as needed...
];

// Populate the select elements with currency options
function populateCurrencyOptions() {
  currencyList.forEach(currency => {
    const optionFrom = document.createElement('option');
    optionFrom.value = currency.code;
    optionFrom.textContent = `${currency.name} (${currency.code})`;

    const optionTo = document.createElement('option');
    optionTo.value = currency.code;
    optionTo.textContent = `${currency.name} (${currency.code})`;

    fromCurrencySelect.appendChild(optionFrom);
    toCurrencySelect.appendChild(optionTo);
  });
}

// Filter currencies by search input
function filterCurrencies(input, selectElement) {
  const filter = input.value.toLowerCase();
  const options = selectElement.querySelectorAll('option');
  
  options.forEach(option => {
    const text = option.textContent.toLowerCase();
    option.style.display = text.includes(filter) ? '' : 'none';
  });
}

// Fetch conversion rates
async function getConversionRate(fromCurrency, toCurrency, amount, date) {
  loadingSpinner.classList.remove('hidden');
  resultDisplay.textContent = '';

  let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
  if (date) {
    url = `https://api.exchangerate-api.com/v4/${date}/${fromCurrency}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  loadingSpinner.classList.add('hidden');

  if (data && data.rates[toCurrency]) {
    const rate = data.rates[toCurrency];
    const result = (rate * amount).toFixed(2);
    resultDisplay.textContent = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
  } else {
    resultDisplay.textContent = 'Error retrieving rates.';
  }
}

// Swap currencies
swapBtn.addEventListener('click', () => {
  const temp = fromCurrencySelect.value;
  fromCurrencySelect.value = toCurrencySelect.value;
  toCurrencySelect.value = temp;
});

// Listen for amount or date changes to trigger conversion
amountInput.addEventListener('input', () => {
  getConversionRate(fromCurrencySelect.value, toCurrencySelect.value, amountInput.value, dateInput.value);
});

dateInput.addEventListener('change', () => {
  getConversionRate(fromCurrencySelect.value, toCurrencySelect.value, amountInput.value, dateInput.value);
});

// Add search functionality for currencies
fromSearchInput.addEventListener('input', () => filterCurrencies(fromSearchInput, fromCurrencySelect));
toSearchInput.addEventListener('input', () => filterCurrencies(toSearchInput, toCurrencySelect));

// Initialize the currency options on page load
populateCurrencyOptions();
