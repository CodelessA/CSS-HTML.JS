// ========================================
// PROFESSIONAL CALCULATOR SYSTEM
// ========================================

// Navigation system
function navigateToSection(selectElement) {
  const selectedValue = selectElement.value;
  if (selectedValue) {
    document.querySelector(selectedValue).scrollIntoView({ 
      behavior: 'smooth' 
    });
  }
}

// Universal calculator class
class Calculator {
  constructor() {
    this.operations = {
      add: (a, b) => a + b,
      subtract: (a, b) => a - b,
      multiply: (a, b) => a * b,
      divide: (a, b) => b !== 0 ? a / b : null,
      power: (a, b) => Math.pow(a, b),
      sqrt: (a) => a >= 0 ? Math.sqrt(a) : null,
      factorial: (a) => {
        if (a < 0 || !Number.isInteger(a)) return null;
        if (a === 0 || a === 1) return 1;
        let result = 1;
        for (let i = 2; i <= a; i++) {
          result *= i;
        }
        return result;
      },
      percentage: (value, percent) => (value * percent) / 100,
      compoundInterest: (principal, rate, years) => 
        principal * Math.pow(1 + rate / 100, years),
      logarithm: (a, base = 10) => Math.log(a) / Math.log(base),
      naturalLog: (a) => Math.log(a),
      sine: (a) => Math.sin(a * Math.PI / 180),
      cosine: (a) => Math.cos(a * Math.PI / 180),
      tangent: (a) => Math.tan(a * Math.PI / 180),
      average: (...numbers) => numbers.reduce((sum, num) => sum + num, 0) / numbers.length,
      mortgage: (principal, rate, years) => {
        const monthlyRate = rate / 100 / 12;
        const months = years * 12;
        return principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
               (Math.pow(1 + monthlyRate, months) - 1);
      },
      irr: (cashFlows, guess = 0.1) => {
        // Simplified IRR calculation using Newton-Raphson method
        let rate = guess;
        for (let i = 0; i < 100; i++) {
          let npv = 0;
          let npvDerivative = 0;
          
          for (let j = 0; j < cashFlows.length; j++) {
            const discountFactor = Math.pow(1 + rate, j);
            npv += cashFlows[j] / discountFactor;
            npvDerivative -= j * cashFlows[j] / (discountFactor * (1 + rate));
          }
          
          if (Math.abs(npv) < 0.0001) break;
          rate = rate - npv / npvDerivative;
        }
        return rate * 100; // Return as percentage
      },
      // Unit conversions
      metersToFeet: (meters) => meters * 3.28084,
      feetToMeters: (feet) => feet / 3.28084,
      celsiusToFahrenheit: (celsius) => (celsius * 9/5) + 32,
      fahrenheitToCelsius: (fahrenheit) => (fahrenheit - 32) * 5/9,
      celsiusToKelvin: (celsius) => celsius + 273.15,
      kelvinToCelsius: (kelvin) => kelvin - 273.15,
      kilogramsToPounds: (kg) => kg * 2.20462,
      poundsToKilograms: (pounds) => pounds / 2.20462,
      squareMetersToAcres: (sqm) => sqm * 0.000247105,
      acresToSquareMeters: (acres) => acres / 0.000247105
    };
  }

  // Input validation
  validateInput(value, min = -Infinity, max = Infinity) {
    const num = Number(value);
    if (isNaN(num)) {
      throw new Error('Nieprawidłowa wartość liczbowa');
    }
    if (num < min || num > max) {
      throw new Error(`Wartość musi być między ${min} a ${max}`);
    }
    return num;
  }

  // Calculate with error handling
  calculate(operation, inputs) {
    try {
      const validatedInputs = inputs.map(input => 
        this.validateInput(input.value, input.min, input.max)
      );
      
      const result = this.operations[operation](...validatedInputs);
      
      if (result === null) {
        throw new Error('Nieprawidłowa operacja matematyczna');
      }
      
      return {
        success: true,
        result: result,
        formatted: this.formatResult(result)
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Format result for display
  formatResult(result) {
    if (Number.isInteger(result)) {
      return result.toLocaleString('pl-PL');
    }
    return result.toLocaleString('pl-PL', { 
      maximumFractionDigits: 6 
    });
  }
}

// Initialize calculator
const calculator = new Calculator();

// Calculator functions
function calculateAddition() {
  const inputs = [
    { value: document.getElementById("number1").value, min: -Infinity, max: Infinity },
    { value: document.getElementById("number2").value, min: -Infinity, max: Infinity }
  ];
  
  const result = calculator.calculate('add', inputs);
  displayResult('total-sum', result);
}

function calculateSubtraction() {
  const inputs = [
    { value: document.getElementById("number1M").value, min: -Infinity, max: Infinity },
    { value: document.getElementById("number2M").value, min: -Infinity, max: Infinity }
  ];
  
  const result = calculator.calculate('subtract', inputs);
  displayResult('total-min', result);
}

function calculatePower() {
  const inputs = [
    { value: document.getElementById("num-pow").value, min: -Infinity, max: Infinity },
    { value: document.getElementById("pow-num").value, min: -Infinity, max: Infinity }
  ];
  
  const result = calculator.calculate('power', inputs);
  displayResult('total-pow', result);
}

function calculateSquareRoot() {
  const inputs = [
    { value: document.getElementById("sqrt-num").value, min: 0, max: Infinity }
  ];
  
  const result = calculator.calculate('sqrt', inputs);
  if (result.success) {
    document.getElementById("sqrt-n").textContent = calculator.formatResult(inputs[0].value);
  }
  displayResult('sqrt-result', result);
}

function calculateFactorial() {
  const inputs = [
    { value: document.getElementById("strong-num").value, min: 0, max: 170 }
  ];
  
  const result = calculator.calculate('factorial', inputs);
  if (result.success) {
    document.getElementById("n-strong").textContent = calculator.formatResult(inputs[0].value);
  }
  displayResult('n-strongRes', result);
}

function calculateInterest() {
  const inputs = [
    { value: document.getElementById("principal").value, min: 0, max: Infinity },
    { value: document.getElementById("rate").value, min: 0, max: 100 },
    { value: document.getElementById("years").value, min: 0, max: 100 }
  ];
  
  const result = calculator.calculate('compoundInterest', inputs);
  if (result.success) {
    result.formatted = result.result.toLocaleString('pl-PL', {
      style: "currency",
      currency: "PLN"
    });
  }
  displayResult('total-amount', result);
}

// New functions for additional operations
function calculateMultiplication() {
  const inputs = [
    { value: document.getElementById("mult-num1").value, min: -Infinity, max: Infinity },
    { value: document.getElementById("mult-num2").value, min: -Infinity, max: Infinity }
  ];
  
  const result = calculator.calculate('multiply', inputs);
  displayResult('mult-result', result);
}

function calculateDivision() {
  const inputs = [
    { value: document.getElementById("div-num1").value, min: -Infinity, max: Infinity },
    { value: document.getElementById("div-num2").value, min: 0.001, max: Infinity }
  ];
  
  const result = calculator.calculate('divide', inputs);
  displayResult('div-result', result);
}

function calculatePercentage() {
  const inputs = [
    { value: document.getElementById("percent-value").value, min: -Infinity, max: Infinity },
    { value: document.getElementById("percent-rate").value, min: -Infinity, max: Infinity }
  ];
  
  const result = calculator.calculate('percentage', inputs);
  displayResult('percent-result', result);
}

function calculateLogarithm() {
  const inputs = [
    { value: document.getElementById("log-value").value, min: 0.001, max: Infinity },
    { value: document.getElementById("log-base").value, min: 0.001, max: Infinity }
  ];
  
  const result = calculator.calculate('logarithm', inputs);
  displayResult('log-result', result);
}

function calculateSine() {
  const inputs = [
    { value: document.getElementById("sin-angle").value, min: -Infinity, max: Infinity }
  ];
  
  const result = calculator.calculate('sine', inputs);
  if (result.success) {
    document.getElementById("sin-angle-display").textContent = calculator.formatResult(inputs[0].value);
  }
  displayResult('sin-result', result);
}

function calculateCosine() {
  const inputs = [
    { value: document.getElementById("cos-angle").value, min: -Infinity, max: Infinity }
  ];
  
  const result = calculator.calculate('cosine', inputs);
  if (result.success) {
    document.getElementById("cos-angle-display").textContent = calculator.formatResult(inputs[0].value);
  }
  displayResult('cos-result', result);
}

function calculateTangent() {
  const inputs = [
    { value: document.getElementById("tan-angle").value, min: -Infinity, max: Infinity }
  ];
  
  const result = calculator.calculate('tangent', inputs);
  if (result.success) {
    document.getElementById("tan-angle-display").textContent = calculator.formatResult(inputs[0].value);
  }
  displayResult('tan-result', result);
}

// New advanced functions
function calculateNaturalLog() {
  const inputs = [
    { value: document.getElementById("ln-value").value, min: 0.001, max: Infinity }
  ];
  
  const result = calculator.calculate('naturalLog', inputs);
  if (result.success) {
    document.getElementById("ln-value-display").textContent = calculator.formatResult(inputs[0].value);
  }
  displayResult('ln-result', result);
}

function calculateAverage() {
  const inputValues = document.getElementById("avg-values").value.split(',').map(v => v.trim());
  const inputs = inputValues.map(value => ({ value, min: -Infinity, max: Infinity }));
  
  const result = calculator.calculate('average', inputs);
  displayResult('avg-result', result);
}

function calculateMortgage() {
  const inputs = [
    { value: document.getElementById("mortgage-principal").value, min: 0, max: Infinity },
    { value: document.getElementById("mortgage-rate").value, min: 0, max: 50 },
    { value: document.getElementById("mortgage-years").value, min: 1, max: 50 }
  ];
  
  const result = calculator.calculate('mortgage', inputs);
  if (result.success) {
    result.formatted = result.result.toLocaleString('pl-PL', {
    style: "currency",
      currency: "PLN"
    });
  }
  displayResult('mortgage-result', result);
}

function calculateIRR() {
  const inputValues = document.getElementById("irr-flows").value.split(',').map(v => v.trim());
  const inputs = inputValues.map(value => ({ value, min: -Infinity, max: Infinity }));
  
  const result = calculator.calculate('irr', inputs);
  if (result.success) {
    result.formatted = result.result.toFixed(2) + '%';
  }
  displayResult('irr-result', result);
}

// Unit conversion functions
function convertMetersToFeet() {
  const inputs = [
    { value: document.getElementById("meters-input").value, min: 0, max: Infinity }
  ];
  
  const result = calculator.calculate('metersToFeet', inputs);
  displayResult('meters-result', result);
}

function convertFeetToMeters() {
  const inputs = [
    { value: document.getElementById("feet-input").value, min: 0, max: Infinity }
  ];
  
  const result = calculator.calculate('feetToMeters', inputs);
  displayResult('feet-result', result);
}

function convertCelsiusToFahrenheit() {
  const inputs = [
    { value: document.getElementById("celsius-input").value, min: -273.15, max: Infinity }
  ];
  
  const result = calculator.calculate('celsiusToFahrenheit', inputs);
  displayResult('celsius-result', result);
}

function convertFahrenheitToCelsius() {
  const inputs = [
    { value: document.getElementById("fahrenheit-input").value, min: -459.67, max: Infinity }
  ];
  
  const result = calculator.calculate('fahrenheitToCelsius', inputs);
  displayResult('fahrenheit-result', result);
}

function convertKilogramsToPounds() {
  const inputs = [
    { value: document.getElementById("kg-input").value, min: 0, max: Infinity }
  ];
  
  const result = calculator.calculate('kilogramsToPounds', inputs);
  displayResult('kg-result', result);
}

function convertPoundsToKilograms() {
  const inputs = [
    { value: document.getElementById("pounds-input").value, min: 0, max: Infinity }
  ];
  
  const result = calculator.calculate('poundsToKilograms', inputs);
  displayResult('pounds-result', result);
}

// Universal result display function
function displayResult(elementId, result) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  if (result.success) {
    element.textContent = result.formatted;
    element.style.color = '#4ade80'; // Success green
    element.classList.add('result-success');
  } else {
    element.textContent = result.error;
    element.style.color = '#ef4444'; // Error red
    element.classList.add('result-error');
  }
  
  // Remove classes after animation
  setTimeout(() => {
    element.classList.remove('result-success', 'result-error');
  }, 2000);
}

// Input validation on keyup
function validateInput(input) {
  const value = input.value;
  const num = Number(value);
  
  if (value === '') {
    input.style.borderColor = '';
    return;
  }
  
  if (isNaN(num)) {
    input.style.borderColor = '#ef4444';
  } else {
    input.style.borderColor = '#4ade80';
  }
}

// Add input validation to all number inputs
document.addEventListener('DOMContentLoaded', function() {
  const numberInputs = document.querySelectorAll('input[type="number"], input[inputmode="numeric"]');
  numberInputs.forEach(input => {
    input.addEventListener('input', () => validateInput(input));
  });

  // Simple tooltip system - no complex positioning needed
  const helpButtons = document.querySelectorAll('.help-btn');
  
  helpButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      // Tooltip will show automatically via CSS hover
    });
    
    button.addEventListener('mouseleave', function() {
      // Tooltip will hide automatically via CSS
    });
  });
});
