const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const resultDisplay = document.getElementById('result');
const fromSearchInput = document.getElementById('fromSearch');
const toSearchInput = document.getElementById('toSearch');
const swapBtn = document.getElementById('swapBtn');
const convertBtn = document.getElementById('convertBtn');
const dateInput = document.getElementById('date');
const loadingSpinner = document.getElementById('loading-spinner');

const apiKey = 'YOUR_API_KEY'; // Add your API key here (for real-time conversion)

// List of world currencies
const currencyList = [
  { code: 'USD', name: 'United States Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'INR', name: 'Indian Rupee' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'CNY', name: 'Chinese Yuan' },
  { code: 'BRL', name: 'Brazilian Real' },
  { code: 'RUB', name: 'Russian Ruble' },
  { code: 'MXN', name: 'Mexican Peso' },
  { code: 'CHF', name: 'Swiss Franc' },
  { code: 'ZAR', name: 'South African Rand' },
  { code: 'SGD', name: 'Singapore Dollar' },
  { code: 'BDT', name: 'Bangladeshi Taka' },
  { code: 'PKR', name: 'Pakistani Rupee' },
  { code: 'NGN', name: 'Nigerian Naira' },
  { code: 'KES', name: 'Kenyan Shilling' },
  { code: 'EGP', name: 'Egyptian Pound' },
  { code: 'SAR', name: 'Saudi Riyal' },
  // Add more currencies...
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
  const fromCurrency = fromCurrencySelect.value;
  fromCurrencySelect.value = toCurrencySelect.value;
  toCurrencySelect.value = fromCurrency;
});

// Convert button logic
convertBtn.addEventListener('click', () => {
  const fromCurrency = fromCurrencySelect.value;
  const toCurrency = toCurrencySelect.value;
  const amount = amountInput.value;
  const date = dateInput.value;

  if (amount && fromCurrency && toCurrency) {
    getConversionRate(fromCurrency, toCurrency, amount, date);
  } else {
    resultDisplay.textContent = 'Please enter all fields correctly.';
  }
});

// Attach filter events
fromSearchInput.addEventListener('input', () => filterCurrencies(fromSearchInput, fromCurrencySelect));
toSearchInput.addEventListener('input', () => filterCurrencies(toSearchInput, toCurrencySelect));

// Populate currency options on page load
populateCurrencyOptions();
