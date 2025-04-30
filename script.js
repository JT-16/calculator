// DOM Elements
const hourEL = document.querySelector('.hour');
const minuteEL = document.querySelector('.minute');
const displayEl = document.querySelector('.display');

const acEL = document.querySelector('.ac');
const pmEL = document.querySelector('.pm');
const percentEL = document.querySelector('.percent');

const additionEL = document.querySelector('.addition');
const subtractionEL = document.querySelector('.subtraction');
const multiplicationEL = document.querySelector('.multiplication');
const divisionEL = document.querySelector('.division');
const equalEL = document.querySelector('.equal');

const decimalEL = document.querySelector('.decimal');
const numberELArray = Array.from({ length: 10 }, (_, i) =>
    document.querySelector(`.number-${i}`)
);

// Variables
let displayStrInMemory = null;
let operatorInMemory = null;

// Functions
const getDisplayAsStr = () => {
    return displayEl.textContent.replace(/,/g, '');
};

const setStrAsDisplay = (displayStr) => {
    if (displayStr.endsWith('.')) {
        displayEl.textContent = displayStr;
        return;
    }

    const [wholeNumStr, decimalStr] = displayStr.split('.');
    if (decimalStr) {
        displayEl.textContent = parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
    } else {
        displayEl.textContent = parseFloat(wholeNumStr).toLocaleString();
    }
};

const getDisplayAsNum = () => {
    return parseFloat(getDisplayAsStr());
};

const handleNumberClick = (numStr) => {
    const currentDisplayStr = getDisplayAsStr();

    if (currentDisplayStr === '0') {
        setStrAsDisplay(numStr);
    } else {
        setStrAsDisplay(currentDisplayStr + numStr);
    }
};

const getResultOfOperationAsStr = () => {
    const currentDisplayNum = getDisplayAsNum();
    const displayNumInMemory = parseFloat(displayStrInMemory);
    let result;

    switch (operatorInMemory) {
        case 'addition':
            result = displayNumInMemory + currentDisplayNum;
            break;
        case 'subtraction':
            result = displayNumInMemory - currentDisplayNum;
            break;
        case 'multiplication':
            result = displayNumInMemory * currentDisplayNum;
            break;
        case 'division':
            result = displayNumInMemory / currentDisplayNum;
            break;
        default:
            return '0';
    }

    return result.toString();
};

const handleOperatorClick = (operation) => {
    const currentDisplayStr = getDisplayAsStr();

    if (!displayStrInMemory) {
        displayStrInMemory = currentDisplayStr;
        operatorInMemory = operation;
        setStrAsDisplay('0');
    } else {
        const resultStr = getResultOfOperationAsStr();
        displayStrInMemory = resultStr;
        operatorInMemory = operation;
        setStrAsDisplay('0');
    }
};

// Event Listeners
acEL.addEventListener('click', () => {
    setStrAsDisplay('0');
    displayStrInMemory = null;
    operatorInMemory = null;
});

pmEL.addEventListener('click', () => {
    const currentDisplayStr = getDisplayAsStr();
    if (currentDisplayStr === '0') return;

    if (currentDisplayStr.startsWith('-')) {
        setStrAsDisplay(currentDisplayStr.slice(1));
    } else {
        setStrAsDisplay('-' + currentDisplayStr);
    }
});

percentEL.addEventListener('click', () => {
    const currentDisplayNum = getDisplayAsNum();
    const newDisplayNum = currentDisplayNum / 100;
    setStrAsDisplay(newDisplayNum.toString());
    displayStrInMemory = null;
    operatorInMemory = null;
});

additionEL.addEventListener('click', () => handleOperatorClick('addition'));
subtractionEL.addEventListener('click', () => handleOperatorClick('subtraction'));
multiplicationEL.addEventListener('click', () => handleOperatorClick('multiplication'));
divisionEL.addEventListener('click', () => handleOperatorClick('division'));

equalEL.addEventListener('click', () => {
    if (displayStrInMemory && operatorInMemory) {
        const resultStr = getResultOfOperationAsStr();
        setStrAsDisplay(resultStr);
        displayStrInMemory = null;
        operatorInMemory = null;
    }
});

numberELArray.forEach((el, i) => {
    el.addEventListener('click', () => {
        handleNumberClick(i.toString());
    });
});

decimalEL.addEventListener('click', () => {
    const currentDisplayStr = getDisplayAsStr();
    if (!currentDisplayStr.includes('.')) {
        setStrAsDisplay(currentDisplayStr + '.');
    }
});

// Time Display
const updateTime = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    hourEL.textContent = currentHour.toString();
    minuteEL.textContent = currentMinute.toString().padStart(2, '0');
};

setInterval(updateTime, 1000);
updateTime();
