const display = document.querySelector("#display");
const operatorBtns = document.querySelectorAll('.operator')
const whitePaper = document.querySelector("#white-paper")

var displayNum = display.innerText;
var firstNumber = "";
var operation = "";
var secondNumber = "";

function press(number) {
    if (number == "." && secondNumber === 0) {
        clr();
    }

    if (displayNum === 0 || displayNum === "0" || secondNumber === 0) {
        displayNum = number.toString();

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
    if (displayNum == 0) {
        whitePaper.innerHTML = "";
    }

    firstNumber = "";
    operation = "";
    secondNumber = "";
    displayNum = 0;
    updateDisplay(displayNum);
    return
}

function setOP(operator) {
    if (firstNumber !== 0 && secondNumber !== 0) {
        calculate();
    }

    firstNumber = displayNum.toString();
    console.log(typeof firstNumber);
    secondNumber = 0;
    operation = operator;

    operatorBtns.forEach(button => {
        button.classList.remove('active');

        if (button.value == operator) {
            button.classList.add('active')
        }
    })
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

    addToWhitePaper(firstNumber, secondNumber, operation, displayNum)
    firstNumber = displayNum;
    operation = "";
    secondNumber = 0;
    updateDisplay(displayNum.toString())
}

function updateDisplay(newNumber) {
    if (operation == "") {
        firstNumber = newNumber;

        operatorBtns.forEach(button => {
            button.classList.remove('active');
        })
    } else {
        secondNumber = newNumber;
    }
    display.innerHTML = newNumber;
    return
}

function addToWhitePaper(firstNumber, secondNumber, operation, displayNum) {
    if (whitePaper.innerHTML.includes('message')) {
        whitePaper.innerHTML = "";
    }
    
    whitePaper.innerHTML += `
    <p>
        ${firstNumber} ${operation} ${secondNumber} =
        <br>
        <strong>${displayNum}</strong>
    </p>
    `
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

    console.log(firstNumber, operation, secondNumber);
})