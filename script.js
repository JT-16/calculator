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
const number0EL = document.querySelector('.number-0');
const number1EL = document.querySelector('.number-1');
const number2EL = document.querySelector('.number-2');
const number3EL = document.querySelector('.number-3');
const number4EL = document.querySelector('.number-4');
const number5EL = document.querySelector('.number-5');
const number6EL = document.querySelector('.number-6');
const number7EL = document.querySelector('.number-7');
const number8EL = document.querySelector('.number-8');
const number9EL = document.querySelector('.number-9');
const numberELArray = [
    number0EL, number1EL, number2EL, number3EL, number4EL, number5EL,
    number6EL, number7EL, number8EL, number9EL
];


// variables
let displyStrInMemory = null;
let operatorInMemory = null;


// functions
const getdisplayAsStr = () => {
    const currentDisplayStr = displayEl.textContent;
    return currentDisplayStr.split(',').join('');
};

const setStrAsdisplay = (displayStr) => {
    if (displayStr[displayStr.length - 1] === '.') {
        displayEl.textContent += '.';
        return;
    }


    const [wholeNumStr, decimalStr] = displayStr.split('.');
    if (decimalStr) {
        displayEl.textContent = 
        parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
    } else {
        displayEl.textContent = parseFloat(wholeNumStr).toLocaleString();
    };
    displayEl.textContent = parseFloat(wholeNumStr).toLocaleString();

};

const getdisplayAsNum = () => {
    return parseFloat(getdisplayAsStr());
}
const handleNumberClick = (numStr) => {
    const currentDisplayStr = getdisplayAsStr();
    if(currentDisplayStr === '0') {
        displayEl.textContent = numStr;
        setStrAsdisplay(numStr);
    } else {
        setStrAsdisplay(currentDisplayStr + numStr);
        displayEl.textContent =
         parseFloat(currentDisplayStr + numStr).toLocaleString();
    }
};

const getResultOfOperationAsStr = () => {
    let newdisplayNum;
    if (operatorInMemory === 'addition') {
        newdisplayNum = displayNumInMemory + currentdisplayNum;
    } else if (operatorInMemory === 'subtraction') {
        newdisplayNum = displayNumInMemory - currentdisplayNum;
    }else if (operatorInMemory === 'multiplication') {
        newdisplayNum = displayNumInMemory * currentdisplayNum;
    } else if (operatorInMemory === 'division') {
        newdisplayNum = displayNumInMemory / currentdisplayNum;
    }
};

const handleOperatorClick = (operation) => {
    const currentDisplayStr = getdisplayAsStr();
    const currentdisplayNum = getdisplayAsNum();
    if (!displyStrInMemory) {
        displyStrInMemory = currentDisplayStr;
        operatorInMemory = operation;
        setStrAsdisplay('0');
        return;
    }

    const displayNumInMemory = parseFloat(displyStrInMemory);
    let newdisplayNum;
    if (operatorInMemory === 'addition') {
        newdisplayNum = displayNumInMemory + currentdisplayNum;
    } else if (operatorInMemory === 'subtraction') {
        newdisplayNum = displayNumInMemory - currentdisplayNum;
    }else if (operatorInMemory === 'multiplication') {
        newdisplayNum = displayNumInMemory * currentdisplayNum;
    } else if (operatorInMemory === 'division') {
        newdisplayNum = displayNumInMemory / currentdisplayNum;
    }

    displyStrInMemory  = newdisplayNum.toString();
    operatorInMemory = operation;
    setStrAsdisplay('0');
};


// Add Event Listeners to functions
acEL.addEventListener('click', () => {
    setStrAsdisplay('0');
    displyStrInMemory = null;
    operatorInMemory = null;
});
pmEL.addEventListener('click', () => {
    const currentdisplayNum = getdisplayAsNum();
    const currentDisplayStr = getdisplayAsStr();
    
    if (currentDisplayStr === '-0') {
        setStrAsdisplay('0');
        return;
    }

    if (currentdisplayNum >= 0) {
        setStrAsdisplay('-' + currentDisplayStr);
    } else {
        setStrAsdisplay(currentDisplayStr.substring(1));
    }
});
percentEL.addEventListener('click', () => {
    const currentdisplayNum = getdisplayAsNum();
    const newdisplayNum = currentdisplayNum / 100;
    setStrAsdisplay(newdisplayNum.toString());
    displyStrInMemory = null;
    operatorInMemory = null;
});

// add event listeners to operators
additionEL.addEventListener('click', () => {
      handleNumberClick('addition');
});
subtractionEL.addEventListener('click', () => {
    handleNumberClick('subtraction');
});
multiplicationEL.addEventListener('click', () => {
    handleNumberClick('multiplication');
});
divisionEL.addEventListener('click', () => {
    handleNumberClick('division');
});
equalEL.addEventListener('click', () => {
    if (displyStrInMemory) {
    }
});



//Add Event Listeners to numbers and decimal
for(let a = 0; a < numberELArray.length; a++) {
    const numberEL = numberELArray[a];
    numberEL.addEventListener('click', () => {
        handleNumberClick(a.toString());
    });
}
decimalEL.addEventListener('click', () => {
    const currentDisplayStr =  getdisplayAsStr();
    if (!currentDisplayStr.includes('.')) {
        setStrAsdisplay(currentDisplayStr + '.');
    }
});




// set up the time
const updateTime = () => {
    const currentTime = new Date();

    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    
    hourEL.textContent = currentHour.toString();
    minuteEL.textContent = currentMinute.toString().padStart(2, '0');
}
setInterval(updateTime, 1000);
updateTime();