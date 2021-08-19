const display = document.querySelector("#display");
var displayNum = display.innerText;
var firstNumber = "";
var operation = "";
var secondNumber = "";

function press(number) {
    if (displayNum === 0 || displayNum === "0" || secondNumber === 0) {
        displayNum = number.toString();

        if (number == ".") {
            displayNum = "0.";
        }

        if (operation != "") {
            secondNumber = number.toString();
        }

    } else {
        displayNum += number.toString();
    }

    updateDisplay(displayNum);
    return
}

function clr() {
    firstNumber = "";
    operation = "";
    secondNumber = "";
    displayNum = 0;
    updateDisplay(0);
    return
}

function setOP(operator) {
    firstNumber = displayNum;
    secondNumber = 0;
    operation = operator;
    return
}

function calculate() {
    secondnumber = displayNum;
    
    if (operation == "") {
        return
    } else if (operation == "+") {
        displayNum = parseFloat(firstNumber) + parseFloat(secondNumber);
    } else if (operation == "-") {
        displayNum = parseFloat(firstNumber) - parseFloat(secondNumber);
    } else if (operation == "*") {
        displayNum = parseFloat(firstNumber) * parseFloat(secondNumber);
    } else if (operation == "/") {
        displayNum = parseFloat(firstNumber) / parseFloat(secondNumber);
    }

    firstNumber = displayNum;
    operation = "";
    secondNumber = 0;
    updateDisplay(displayNum);
}

function updateDisplay(newNumber) {
    if (operation == "") {
        firstNumber = newNumber;
    } else {
        secondNumber = newNumber;
    }
    display.innerHTML = newNumber;
    return
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

document.addEventListener("keydown", (e) => {
    if (isNumeric(e.key) || e.key == ".") {
        press(e.key)
    } else if (e.key == "+" || e.key == "-" || e.key == "*" || e.key == "/") {
        setOP(e.key)
    } else if (e.key == "Enter") {
        calculate();
    } else if (e.key == "Backspace") {
        clr();
    }
})