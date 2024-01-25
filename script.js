//Fast navigation////////////////////////////////////////////////////////////////////////
function navigateToSection(selectElement) {
  var selectedValue = selectElement.value;
  if (selectedValue) {
    window.location.href = selectedValue;
  }
}
//Fast navigation////////////////////////////////////////////////////////////////////////

//Addition////////////////////////////////////////////////////////////////////////
function count() {
  const number1 = document.getElementById("number1");
  const number2 = document.getElementById("number2");
  const totalsum = document.getElementById("total-sum");

  let number = Number(number1.value);
  let numberTwo = Number(number2.value);

  const result = number + numberTwo;
  totalsum.textContent = result.toLocaleString();
}
//Addition////////////////////////////////////////////////////////////////////////

//Subtraction//////////////////////////////////////////////////////////////////////
function countM() {
  const number1M = document.getElementById(`number1M`);
  const number2M = document.getElementById(`number2M`);
  const totalmin = document.getElementById(`total-min`);

  let n1M = Number(number1M.value);
  let n2M = Number(number2M.value);

  const result2 = n1M - n2M;
  totalmin.textContent = result2.toLocaleString();
}
//Subtraction//////////////////////////////////////////////////////////////////////

//Exponentiation//////////////////////////////////////////////////////////////////////
function countPow() {
  const numtoPow = document.getElementById("num-pow");
  const powNum = document.getElementById("pow-num");
  const totalPow = document.getElementById("total-pow");
  const a = document.getElementById("a-pow");
  const n = document.getElementById("n-pow");

  const ntpow = Number(numtoPow.value);
  const pnum = Number(powNum.value);

  a.textContent = ntpow.toLocaleString();
  n.textContent = pnum.toLocaleString();

  const result3 = Math.pow(ntpow, pnum);
  totalPow.textContent = result3.toLocaleString();
}
//Exponentiation//////////////////////////////////////////////////////////////////////

//Square root/////////////////////////////////////////////////////////////////
function countSqrt() {
  const sqrtNum = document.getElementById("sqrt-num");
  const sqrtRes = document.getElementById("sqrt-result");
  const x = document.getElementById("sqrt-n");

  const sqrtnumber = Number(sqrtNum.value);
  x.textContent = sqrtnumber.toLocaleString();

  const result4 = Math.sqrt(sqrtnumber);
  sqrtRes.textContent = result4.toLocaleString();
}
//Square root/////////////////////////////////////////////////////////////////

//Interest calculator start//////////////////////////////////////////////
function calculate() {
  const totalAmount = document.getElementById("total-amount");
  const principalInput = document.getElementById("principal");
  const rateInput = document.getElementById("rate");
  const yearsInput = document.getElementById("years");

  let principal = Number(principalInput.value);
  let rate = Number(rateInput.value / 100);
  let years = Number(yearsInput.value);

  if (principal < 0 || isNaN(principal)) {
    principal = 0;
    principalInput.value = 0;
  }
  if (rate < 0 || isNaN(rate)) {
    rate = 0;
    rateInput.value = 0;
  }
  if (years < 0 || isNaN(years)) {
    years = 0;
    yearsInput.value = 0;
  }

  const result = principal * Math.pow(1 + rate / 1, 1 * years);
  totalAmount.textContent = result.toLocaleString(undefined, {
    style: "currency",
    currency: "PLN",
  });
}
//Interest calculator end//////////////////////////////////////////////

//Strong start//////////////////////////////////////////////
function countStrong() {
  const strongNum = document.getElementById("strong-num");
  const strongRes = document.getElementById("n-strongRes");
  const nStrong = document.getElementById("n-strong");

  let strongN = Number(strongNum.value);
  nStrong.textContent = strongN.toLocaleString();

  let factorial = 1;
  for (let i = 1; i <= strongN; i++) {
    factorial *= i;
  }

  strongRes.textContent = factorial.toLocaleString();
}
//Strong end/////////////////////////////////////////////

//Adnotations////////////////////////////////////////
const adButtonClass = document.getElementById("adButtonId");
const adnotationT = document.getElementById("adnotationT");

adButtonClass.addEventListener("click", (event) => {
  if (adnotationT.style.visibility === "hidden") {
    adnotationT.style.visibility = "visible";
    adButtonClass.textContent = "Hide";
  } else {
    adnotationT.style.visibility = "hidden";
    adButtonClass.textContent = "Show";
  }
});

//Adnotations////////////////////////////////////////
