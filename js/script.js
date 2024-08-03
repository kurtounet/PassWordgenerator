/*
CONSTANTS
*/
const UPPERCASE_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE_LETTERS = UPPERCASE_LETTERS.toLowerCase();
const NUMBERS = "0123456789";
const SPECIAL_CHARACTERS = "!@#$%^&*()_+-=[]{}|;':,./<>?";
const generatedPasswords = [];
const DEFAULT_CHARACTER_COUNT = 10;
const DEFAULT_PASSWORD_COUNT = 20;
let countPasswordCount = 0;

/* Ref  DOM elements */
const checkboxUppercase = document.getElementById("uppercase");
const checkboxLowercase = document.getElementById("lowercase");
const checkboxNumbers = document.getElementById("numbers");
const checkboxSymbols = document.getElementById("symbols");
const inputCharacterCount = document.getElementById("nbCaracter");
const inputPasswordCount = document.getElementById("nbpassword");
const passwordList = document.getElementById("pwd-list");
const generateButton = document.getElementById("btn");

function copyPassword(id) {
  const password = document.getElementById(id).textContent;
  console.log(password);
  const copy = navigator.clipboard.writeText(password).textContent;
  console.log(copy);
}

function generatePassword() {
  const characterCount = Number(inputCharacterCount.value);
  const passwordCount = inputPasswordCount.value;
  console.log(passwordCount);

  let characterList = "";
  if (checkboxUppercase.checked) {
    characterList += UPPERCASE_LETTERS;
  }
  if (checkboxLowercase.checked) {
    characterList += LOWERCASE_LETTERS;
  }
  if (checkboxNumbers.checked) {
    characterList += NUMBERS;
  }
  if (checkboxSymbols.checked) {
    characterList += SPECIAL_CHARACTERS;
  }
  if (characterList.length === 0) {
    alert("Selectez un type de caractère.");
    return;
  }

  /* Generate passwords */
  for (let i = 0; i < passwordCount; i++) {
    let password = "";
    for (let j = 0; j < characterCount; j++) {
      const randomIndex = Math.floor(Math.random() * characterList.length);
      password += characterList.charAt(randomIndex);
    }
    generatedPasswords.push(password);
  }

  passwordList.innerHTML = "";

  for (let i = 0; i < generatedPasswords.length; i++) {
    const passwordItem = document.createElement("li");
    const copyPasswordImage = document.createElement("img");
    copyPasswordImage.src = "assets/copy.svg";
    copyPasswordImage.onclick = function () {
      copyPassword(i);
    };

    const passwordText = document.createElement("p");
    passwordText.id = i;
    passwordText.textContent = generatedPasswords[i];

    passwordItem.appendChild(passwordText);
    passwordItem.appendChild(copyPasswordImage);
    passwordList.appendChild(passwordItem);
  }
}

/* Increase password count */
btnPlus.addEventListener(
  "click",
  () => (inputPasswordCount.value = Number(inputPasswordCount.value) + 1)
);
/* Decrease password count */
btnMin.addEventListener(
  "click",
  () => (inputPasswordCount.value = Number(inputPasswordCount.value) - 1)
);
/* Export */
btnexport.addEventListener("click", function () {
  if (generatedPasswords.length === 0) {
    alert("Please generate a password first.");
    return;
  } else {
    const blob = new Blob([generatedPasswords.join("\n")], {
      type: "text/plain",
    });
    const anchor = document.createElement("a");
    anchor.href = window.URL.createObjectURL(blob);
    anchor.download = "passwords.txt";
    anchor.click();
    window.URL.revokeObjectURL(anchor.href);
  }
});

generateButton.addEventListener("click", generatePassword);
inputCharacterCount.addEventListener("click", generateOptions);

function generateOptions() {
  for (let i = 0; i < 100; i++) {
    const option = document.createElement("option");
    option.textContent = i;
    option.value = i;
    inputCharacterCount.appendChild(option);
  }
}
