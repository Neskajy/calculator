let inputElement = document.getElementById("input");
let solveElement = document.getElementById('solve')
let isSolved = false;
const find_pos_before = (stroke) => {
    for (let i = 0; i < stroke.length; i++) {
        if (!isNaN(stroke[i])) {
            return i;
        }
    }
}
const find_separator_between_numbers = (stroke) => {
    let first_is_negative = false;
    if (stroke[0] === '-') {
        first_is_negative = true;
        stroke = stroke.slice(1, stroke.length)
    }
    let separator = stroke.match(/[^0-9.]/)[0];
    return [separator, first_is_negative];
}
const add_symbol = (symbol, func=false) => {
    let s = inputElement.innerText;
    if (isSolved === true) {
        if (['/', '*', '-', '+', '%'].some(char => symbol.includes(char))) {
            isSolved = false;
        } else if (!isNaN(symbol) && !/[+\-*/]/.test(solveElement.innerText)) {
            inputElement.innerText = symbol;
            solveElement.innerText = '';
            isSolved = false;
        } else if (!isNaN(symbol)) {
            solveElement.innerText += symbol;
            isSolved = false;
        } else if (symbol === 'C' || symbol === 'CE') {
            inputElement.innerText = '0';
            solveElement.innerText = '';
        } else {
            isSolved = false;
        }
    } else {
        if (symbol === 'Backspace') {
            if (s.length > 1) {
                inputElement.innerText = s.slice(0, -1);
            }
            else {
                inputElement.innerText = '0';
            }
        } else if (symbol === 'C' || symbol === 'CE') {
            inputElement.innerText = '0';
            solveElement.innerText = '';
        } else if (symbol === '+/-') {
            if (inputElement.innerText !== '0' && find_pos_before(inputElement.innerText) < 1) {
                inputElement.innerText = '-' + s;
            }
        } else if (func !== 'func') {
            if (s.length === 1 && s[0] == 0 && symbol !== '.') {
                inputElement.innerText = symbol;
            } else {
                if (['/', '*', '-', '+', '%'].some(char => solveElement.innerText.includes(char))) {
                    if (symbol ==='.' && 0 <= solveElement.innerText.split('.').length - 1 && 2 > solveElement.innerText.split('.').length - 1 && !isNaN(solveElement.innerText.slice(-1))) {
                        solveElement.innerText += symbol;
                    } else if (symbol !== '.') {
                        solveElement.innerText += symbol;
                    }
                } else {
                    if (symbol === '.' && s.slice(-1) !== '.' && s.match(/\./g) === null) {                    
                        inputElement.innerText += symbol;
                    } else if (symbol === '.' && s.match(/\./g) !== null) {

                    } else {
                        inputElement.innerText += symbol;
                    }
                }
            }
        }
    }
}
const add_func = (action) => {
    let s = solveElement.innerText;
    if (['%', '/', '*', '-', '+'].includes(action)) {
        solveElement.innerText = inputElement.innerText + action;
    } else if (action === 'sqr') {
        solveElement.innerText = inputElement.innerText + '^2';
        inputElement.innerText = Number(inputElement.innerText) ** 2;
    } else if (action === 'sqrt') {
        solveElement.innerText = '√' + inputElement.innerText;
        inputElement.innerText = Math.sqrt(Number(inputElement.innerText));
    } else if (action === '1/x') {
        solveElement.innerText = `1/(${inputElement.innerText})`;
        inputElement.innerText = 1 / Number(inputElement.innerText);
    } else if (action === '=') {
        if (solveElement.innerText.length >= 1) {
            let separator = find_separator_between_numbers(solveElement.innerText)[0]; // Находим первый нецифровой символ в строке
            let dig1, dig2;
            if (separator === '-' && find_separator_between_numbers(solveElement.innerText)[1]) {
                dig1 = solveElement.innerText.split('-')[1] * -1;
                dig2 = solveElement.innerText.split('-')[2];
            } else {
                [dig1, dig2] = solveElement.innerText.split(separator);
            }
            if (solveElement.innerText[0] === '-') {
                if (s.match(/\./g) === null) {
                    [dig1, dig2] = [Number(dig1), Number(dig2)];
                } else {
                    [dig1, dig2] = [parseFloat(dig1), parseFloat(dig2)];
                }
            } else {
                if (s.match(/\./g) === null) {
                    [dig1, dig2] = [Number(dig1), Number(dig2)];
                } else {
                    [dig1, dig2] = [parseFloat(dig1), parseFloat(dig2)];
                }
            }
            if (separator === '+') {
                inputElement.innerText = String(dig1 + dig2);
                solveElement.innerText = '';
                isSolved = true;
            }
            if (separator === '-') {
                inputElement.innerText = String(dig1 - dig2);
                solveElement.innerText = '';
                isSolved = true;
            }
            if (separator === '*') {
                inputElement.innerText = String(dig1 * dig2);
                solveElement.innerText = '';
                isSolved = true;
            }
            if (separator === '/') {
                inputElement.innerText = String(dig1 / dig2);
                solveElement.innerText = '';
                isSolved = true;
            }
            // inputElement.innerText = split_unknown_sep(solveElement.innerText)[0] ;
        }
    }
}