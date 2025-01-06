const fromCurrencySelect = document.getElementById('fromCurrencySelect');
const toCurrencySelect = document.getElementById('toCurrencySelect');
const amountInput = document.getElementById('amountInput');
const resultDisplay = document.getElementById('resultDisplay');
const convertBtn = document.getElementById('convertBtn');
const swapBtn = document.getElementById('swapBtn');

// List of all world currencies
const currencies = [
  'USD - US Dollar',
  'EUR - Euro',
  'JPY - Japanese Yen',
  'GBP - British Pound',
  'AUD - Australian Dollar',
  'CAD - Canadian Dollar',
  'CHF - Swiss Franc',
  'CNY - Chinese Yuan',
  'INR - Indian Rupee',
  // Add more currencies here as needed
];

// Populate dropdowns with currency options
function populateCurrencyOptions() {
  currencies.forEach(currency => {
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');
    option1.value = currency.split(' ')[0];
    option1.text = currency;
    option2.value = currency.split(' ')[0];
    option2.text = currency;

    fromCurrencySelect.add(option1);
    toCurrencySelect.add(option2);
  });

  // Set default selection
  fromCurrencySelect.value = 'USD';
  toCurrencySelect.value = 'EUR';
}

// Fetch conversion rate (for simplicity, using mock data here)
function getConversionRate(fromCurrency, toCurrency, amount) {
  // Mock conversion rate
  const rate = 0.85; // Example: 1 USD = 0.85 EUR

  const convertedAmount = (amount * rate).toFixed(2);
  resultDisplay.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
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

  if (amount && fromCurrency && toCurrency) {
    getConversionRate(fromCurrency, toCurrency, amount);
  } else {
    resultDisplay.textContent = 'Please enter all fields correctly.';
  }
});

// Populate currency options on page load
populateCurrencyOptions();
