

// Grabbing the content of HTML element and storing them
const resultEl = document.getElementById('result');
const result2El = document.getElementById("result2")

const lengthEl = document.getElementById('length');
const length2El = document.getElementById('length2');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');

const generateEl = document.getElementById('generateBtn');

const clipboard = document.getElementById('clipboard');
const clipboard2 = document.getElementById('clipboard2');

// copy to clipboard function
clipboard.addEventListener('click', () => {
	const textarea = document.createElement('textarea');
	const password = resultEl.innerText;	
	if(!password) { return; }
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
    textarea.remove();
    alert("password copied:  " + password); 
});

clipboard2.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password2 = result2El.innerText;
    if(!password2) { return; }
    textarea.value = password2;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert("password copied:  " + password2);
});

// creating an array for the randon functions

// const lower = getRandomLowerCase;
// const upper = getRandomUpperCase;
// const number = getRandomNumber;
// const symbol = getRandomSymbol;
// const randomFunc = [lower, upper, number, symbol];


const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}

// Creating Randon function
function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}

//creating eventlistener function to check checked element
generate.addEventListener('click', () => {
	const length = +lengthEl.value;
	const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;
	
	resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
	result2El.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);

});

//password generator function
function generatePassword(lower, upper, number, symbol, length) {
	let generatedPassword = '';
	const typesCount = lower + upper + number + symbol;
	const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
	
	// Doesn't have a selected type
	if(typesCount === 0) {
		return '';
	}
	
	// create a loop
	for(let i=0; i<length; i+=typesCount) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}
	
	const finalPassword = generatedPassword.slice(0, length);
	
	return finalPassword;
}



//function to synch slidder1 & slidder2 to worrk as one
// const sliderNumber1 = document.getElementById("slider-number1");
// const sliderNumber2 = document.getElementById("slider-number2");

lengthEl.addEventListener("input", syncCharacterNumber);
length2El.addEventListener("input", syncCharacterNumber);

function syncCharacterNumber(e){
    const value = e.target.value
    lengthEl.value = value
    length2El.value = value
}