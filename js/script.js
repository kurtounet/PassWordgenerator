/*
CONSTANTES
*/
const ALPHA_M = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //alpha
const ALPHA_m = ALPHA_M.toLowerCase(); //alpha_m
const num = "0123456789";
const special = "!@#$%^&*()_+-=[]{}|;':,./<>?";

const nbCaracter = 10; //document.getElementById("nbCaracter");
const nbpassword = 10; //document.getElementById("nbpassword");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const pwdList = document.getElementById("pwd-list");
const btn = document.getElementById("btn");

function generatePassword() {
    /* VARIABLES */
    let ALPHA = "";
    let password = [];
    let pass = "";

    if (uppercase.checked) {
        ALPHA = ALPHA.concat(ALPHA_M);
    }
    if (lowercase.checked) {
        ALPHA = ALPHA.concat(ALPHA_m);
    }
    if (numbers.checked) {
        ALPHA = ALPHA.concat(num);
    }
    if (symbols.checked) {
        ALPHA = ALPHA.concat(special);
    }
    console.log(ALPHA);

    for (let i = 0; i < nbpassword; i++) {
        pass = "";
        for (let j = 0; j < nbCaracter; j++) {
            pass += ALPHA.charAt(Math.floor(Math.random() * ALPHA.length));
        }
        const liPwd = document.createElement("li");
        liPwd.className = "password";
        liPwd.innerText = pass;
        const copyImg = document.createElement("img");
        copyImg.className = "copy-svg";
        copyImg.src = "assets/copy.svg";
        liPwd.appendChild(copyImg);
        pwdList.appendChild(liPwd);
    }
    console.log(password);

}
btn.addEventListener("click", generatePassword());