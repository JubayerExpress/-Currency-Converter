// API for exchange rates
const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const convertBtn = document.getElementById('convertBtn');
const resultText = document.getElementById('result');

// Fetch exchange rates and populate select options
async function fetchExchangeRates() {
    const response = await fetch(API_URL);
    const data = await response.json();

    const currencies = Object.keys(data.rates);
    populateSelectOptions(currencies);
}

// Populate currency options in the dropdown
function populateSelectOptions(currencies) {
    currencies.forEach(currency => {
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');
        option1.value = option2.value = currency;
        option1.text = option2.text = currency;
        fromCurrency.appendChild(option1);
        toCurrency.appendChild(option2);
    });

    // Set default selections
    fromCurrency.value = 'USD';
    toCurrency.value = 'EUR';
}

// Convert currency
async function convertCurrency() {
    const amount = amountInput.value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (amount === '' || isNaN(amount)) {
        resultText.textContent = 'Please enter a valid amount';
        return;
    }

    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    const rate = data.rates[to] / data.rates[from];
    const convertedAmount = (amount * rate).toFixed(2);

    resultText.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
}

// Event listeners
convertBtn.addEventListener('click', convertCurrency);
window.addEventListener('load', fetchExchangeRates);
