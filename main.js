const bill = document.getElementById("bill");
const people = document.getElementById("people");
const tipAmount = document.getElementById("tip-amount");
const totalAmount = document.getElementById("total");
const buttons = document.querySelectorAll(".tip button");
const customInput = document.querySelector(".customInput");
const custom = document.getElementById("custom");
const reset = document.getElementById("reset");
const error = document.getElementById("error");
const symbol = document.querySelector(".currency-symbol");
const symbol2 = document.querySelector(".currency-symbol2");
reset.addEventListener("click", () => {
  tipAmount.innerHTML = `$0.00`;
  totalAmount.innerHTML = `$0.00`;
  bill.value = "";
  people.value = "";
  custom.value = "";
  customInput.style.display = "none";
  custom.style.display = "block";
  error.style.display = "none";
  customInput.value = "";
  bill.style.border = "none";
  people.style.border = "none";
  symbol.style.border = "none";
  symbol2.style.border = "none";
  buttons.forEach((button) => button.classList.remove("active"));
});

const validateInputs = () => {
  const billValue = parseFloat(bill.value);
  const peopleValue = parseInt(people.value);

  let isValid = true;

  if (isNaN(billValue) || billValue <= 0) {
    bill.style.border = "2px solid red";
    bill.style.borderLeft = "none";
    symbol.style.border = "2px solid red";
    symbol.style.borderRight = "none";
    isValid = false;
  } else {
    bill.style.border = "2px solid #9fe8df";
    bill.style.borderLeft = "none";
    symbol.style.border = "2px solid #9fe8df";
    symbol.style.borderRight = "none";
  }

  if (isNaN(peopleValue) || peopleValue <= 0) {
    people.style.border = "2px solid red";
    people.style.borderLeft = "none";
    symbol2.style.border = "2px solid red";
    symbol2.style.borderRight = "none";
    isValid = false;
  } else {
    people.style.border = "2px solid #9fe8df";
    people.style.borderLeft = "none";
    symbol2.style.border = "2px solid #9fe8df";
    symbol2.style.borderRight = "none";
  }

  if (isValid) {
    error.style.display = "none";
    calculateTip();
  } else {
    error.style.display = "block";
    tipAmount.innerHTML = `$0.00`;
    totalAmount.innerHTML = `$0.00`;
  }
};

bill.addEventListener("input", validateInputs);
people.addEventListener("input", validateInputs);

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    selectTip(event);
  });
});

custom.addEventListener("click", () => {
  custom.style.display = "none";
  customInput.style.display = "block";
  customInput.classList.add("activeCustom");
});

customInput.addEventListener("input", () => {
  buttons.forEach((button) => button.classList.remove("active"));
  calculateTip();
});

const selectTip = (event) => {
  const button = event.currentTarget;
  buttons.forEach((button) => button.classList.remove("active"));
  button.classList.add("active");
  customInput.value = "";
  calculateTip();
};

const calculateTip = () => {
  const billValue = parseFloat(bill.value);
  const peopleValue = parseInt(people.value);
  if (!billValue || !peopleValue || peopleValue <= 0) {
    tipAmount.innerHTML = `$0.00`;
    totalAmount.innerHTML = `$0.00`;
    return;
  }

  let tipPercentage = 0;
  const activeButton = document.querySelector(".tip button.active");
  if (activeButton) {
    tipPercentage = parseFloat(activeButton.dataset.tip);
  } else if (customInput.value) {
    tipPercentage = parseFloat(customInput.value) / 100;
  }

  if (tipPercentage) {
    const tip = billValue * tipPercentage;
    const total = (billValue + tip) / peopleValue;
    tipAmount.innerHTML = `$${(tip / peopleValue).toFixed(2)}`;
    totalAmount.innerHTML = `$${total.toFixed(2)}`;
  }
};
document.getElementById("five").dataset.tip = 0.05;
document.getElementById("ten").dataset.tip = 0.1;
document.getElementById("fifteen").dataset.tip = 0.15;
document.getElementById("twentyFive").dataset.tip = 0.25;
document.getElementById("fifty").dataset.tip = 0.5;
