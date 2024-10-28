function convertTemperature() {
    const temp = parseFloat(document.getElementById('temperature').value);
    const conversionType = document.querySelector('input[name="conversion"]:checked').value;
    let result = '';

    if (isNaN(temp)) {
        alert('Please enter a valid number.');
        return;
    }

    if (conversionType === 'c-to-f') {
        // Celsius to Fahrenheit
        result = (temp * 9/5) + 32;
        document.getElementById('result').textContent = `${result.toFixed(2)} °F`;
    } else if (conversionType === 'f-to-c') {
        // Fahrenheit to Celsius
        result = (temp - 32) * 5/9;
        document.getElementById('result').textContent = `${result.toFixed(2)} °C`;
    }
}

function clearFields() {
    document.getElementById('temperature').value = '';
    document.getElementById('result').textContent = '';
}
