
 function isLetter (str) {
	return str.length === 1 && str.match(/[a-zA-Z]/i)
  }
 
  function isUpperCase (character) {
	if (character === character.toUpperCase()) {
	  return true
	}
	if (character === character.toLowerCase()) {
	  return false
	}
  }

  function encrypt (message, key) {
	let result = ''
   
	for (let i = 0, j = 0; i < message.length; i++) {
	  const c = message.charAt(i)
	  if (isLetter(c)) {
		if (isUpperCase(c)) {
		  result += String.fromCharCode((c.charCodeAt(0) + key.toUpperCase().charCodeAt(j) - 2 * 65) % 26 + 65) // A: 65
		} else {
		  result += String.fromCharCode((c.charCodeAt(0) + key.toLowerCase().charCodeAt(j) - 2 * 97) % 26 + 97) // a: 97
		}
	  } else {
		result += c
	  }
	  j = ++j % key.length
	}
	return result
  }
   
  function decrypt (message, key) {
	let result = ''
   
	for (let i = 0, j = 0; i < message.length; i++) {
	  const c = message.charAt(i)
	  if (isLetter(c)) {
		if (isUpperCase(c)) {
		  result += String.fromCharCode(90 - (25 - (c.charCodeAt(0) - key.toUpperCase().charCodeAt(j))) % 26)
		} else {
		  result += String.fromCharCode(122 - (25 - (c.charCodeAt(0) - key.toLowerCase().charCodeAt(j))) % 26)
		}
	  } else {
		result += c
	  }
	  j = ++j % key.length
	}
	return result
  }

const header = document.getElementById('title');
const input = document.getElementById('key-input');
const choice = document.getElementById('choice-input');
const textGiven = document.getElementById('message-input');
const error = document.getElementById('error');
const textTransformed = document.getElementById('result-message');
let text = '';
textGiven.innerText = '';

let keyCheck = 0;
let choiceCheck = 0;

function isAlphabet (inputText) {
    for(let i = 0 ; i < inputText.length; i++) {
        if ( !inputText[i].match(/[a-zA-Z]/i)  ){
            setTimeout(() => {
                error.classList.toggle('hidden');
                
            }, 1000);
            error.innerText = 'You\'ve made a mistake! Correct the text..';
            error.classList.toggle('hidden');
            keyCheck = 1; // false - 1
            return 0;
        }
    }
    keyCheck = 2; // true - 2
    return 1;

}

input.addEventListener('input', e => {
    if ( isAlphabet(input.value) === 0 ){
        console.log('ero');
    } else {
        key = e.target.value;
    }
})

choice.addEventListener('input', e => {
    console.log(parseInt(e.target.value)); 
    switch (parseInt(e.target.value)) {
        case 1:
            choiceCheck = 1;
            break;
        case 2:
            choiceCheck = 2;
            break;
        default:
            setTimeout(() => {
                error.classList.toggle('hidden');
                
            }, 5000);
            error.innerText = 'Incorrect option! Try again..';
            error.classList.toggle('hidden');
            break;
    }
})

textGiven.addEventListener('input', e => {
    text = e.target.value;
})

document.addEventListener("keyup", function(event) {
if (event.code === 'Enter') {
    if ( keyCheck == 1) {
        alert('You entered unappropriate key!');
    } else if ( keyCheck == 2 ) {
        input.readOnly = true;
        choice.classList.remove('hidden');
        header.innerText = 'Make a choice:\n1. Encrypt\n2. Decrypt'
    } else {
      alert('The field is empty!');
    }
    
    if ( choiceCheck == 1 ) {
        choice.readOnly = true;
        header.innerText = 'Enter a message to encrypt:';
        textGiven.classList.remove('hidden');
    } else if ( choiceCheck == 2 ) {
        choice.readOnly = true;
        header.innerText = 'Enter a message to decrypt:';
        textGiven.classList.remove('hidden');
    } 

    if ( !textGiven.classList.contains('hidden') && choiceCheck == 1 && text != '') {
        console.log(textGiven.innerText);
        const messageEncrypt = encrypt(text, key);     
        textTransformed.innerText = messageEncrypt;
        textTransformed.classList.remove('hidden');
        textGiven.readOnly = true;
    } else if (!textGiven.classList.contains('hidden') && choiceCheck == 2 && text != '') {
        console.log(textGiven.innerText);
        const messageDecrypt = decrypt(text, key);     
        textTransformed.innerText = messageDecrypt;
        textTransformed.classList.remove('hidden');
        textGiven.readOnly = true;
    }
}});