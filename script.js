
const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "0";
let previousInput = "";
let operator = "";
let newNumber = false;


function updateDisplay() {
    display.textContent = currentInput;
}


function addNumber(number) {
    if (currentInput === "Error" || newNumber) {
        currentInput = number;
        newNumber = false;
    } else if (currentInput === "0") {
        currentInput = number;
    } else {
        currentInput += number;
    }

    updateDisplay();
}


function addDecimal() {
    if (currentInput === "Error" || newNumber) {
        currentInput = "0";
        newNumber = false;
    }

    if (!currentInput.includes(".")) {
        currentInput += ".";
    }

    updateDisplay();
}


function selectOperator(op) {
    if (currentInput === "Error") return;

    if (operator !== "" && !newNumber) {
        calculate();
    }

    previousInput = currentInput;
    operator = op;
    newNumber = true;
}


function calculate() {
    if (operator === "" || newNumber) return;

    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    let result;

    if (operator === "add") {
        result = num1 + num2;
    } else if (operator === "subtract") {
        result = num1 - num2;
    } else if (operator === "multiply") {
        result = num1 * num2;
    } else if (operator === "divide") {
        if (num2 === 0) {
            currentInput = "Error";
            operator = "";
            previousInput = "";
            updateDisplay();
            return;
        }
        result = num1 / num2;
    }

    currentInput = String(parseFloat(result.toPrecision(12)));
    previousInput = "";
    operator = "";
    newNumber = true;

    updateDisplay();
}


function clearCalculator() {
    currentInput = "0";
    previousInput = "";
    operator = "";
    newNumber = false;
    updateDisplay();
}


function changeSign() {
    if (currentInput === "Error") return;

    currentInput = String(-parseFloat(currentInput));
    updateDisplay();
}


function percentage() {
    if (currentInput === "Error") return;

    currentInput = String(parseFloat(currentInput) / 100);
    updateDisplay();
}


buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        const number = button.dataset.number;
        const action = button.dataset.action;

        if (number !== undefined) {
            addNumber(number);
        } else if (action === "decimal") {
            addDecimal();
        } else if (action === "clear") {
            clearCalculator();
        } else if (action === "sign") {
            changeSign();
        } else if (action === "percent") {
            percentage();
        } else if (action === "equals") {
            calculate();
        } else {
            selectOperator(action);
        }
    });
});
