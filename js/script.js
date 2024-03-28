/*
CONSTANTES
*/
const LETTRES_MAJUSCULES = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LETTRES_MINUSCULES = LETTRES_MAJUSCULES.toLowerCase();
const CHIFFRES = "0123456789";
const CARACTERES_SPECIAUX = "!@#$%^&*()_+-=[]{}|;':,./<>?";
const motsDePasseGenerees = [];
const NOMBRE_CARACTERES_PAR_DEFAUT = 10;
const NOMBRE_MOTS_DE_PASSE_PAR_DEFAUT = 20;
let countNombreMotsDePasse = 0;
/* Références aux éléments du DOM*/
const caseCocherMajuscule = document.getElementById("uppercase");
const caseCocherMinuscule = document.getElementById("lowercase");
const caseCocherChiffres = document.getElementById("numbers");
const caseCocherSymboles = document.getElementById("symbols");
const champNombreCaracteres = document.getElementById("nbCaracter");  
const champNombreMotsDePasse = document.getElementById("nbpassword");  
const listeMotsDePasse = document.getElementById("pwd-list");
const boutonGenerer = document.getElementById("btn");

function copierMotDePasse(id) {
    const MotsDePasse = document.getElementById(id).textContent;
    console.log(MotsDePasse);
    const copie = navigator.clipboard.writeText(MotsDePasse).textContent;
    console.log(copie);
}


function genererMotDePasse() {
     
    const nombreCaracteres = Number(champNombreCaracteres.value); //NOMBRE_CARACTERES_PAR_DEFAUT; 
    const nombreMotsDePasse = champNombreMotsDePasse.value; //champNombreMotsDePasse.value;//NOMBRE_MOTS_DE_PASSE_PAR_DEFAUT;
    console.log(nombreMotsDePasse);
    /*
        if (nombreCaracteres < 8 || nombreCaracteres > 128) {
            alert("Le nombre de caractères doit être compris entre 8 et 128.");
            return;
        }

        if (nombreMotsDePasse < 1 || nombreMotsDePasse > 100) {
            alert("Le nombre de mots de passe doit être compris entre 1 et 100.");
            return;
        }
    */
    /* Construire le pool de caractères en fonction des sélections de l'utilisateur */
    let poolCaracteres = "";
    if (caseCocherMajuscule.checked) {
        poolCaracteres += LETTRES_MAJUSCULES;
    }
    if (caseCocherMinuscule.checked) {
        poolCaracteres += LETTRES_MINUSCULES;
    }
    if (caseCocherChiffres.checked) {
        poolCaracteres += CHIFFRES;
    }
    if (caseCocherSymboles.checked) {
        poolCaracteres += CARACTERES_SPECIAUX;
    }
    if (poolCaracteres.length === 0) {
        alert("Veuillez sélectionner au moins un type de caractère.");
        return;
    }

    /* Générer des mots de passe */
    
    for (let i = 0; i < nombreMotsDePasse; i++) {
        let motDePasse = "";
        for (let j = 0; j < nombreCaracteres; j++) {
            const indexAleatoire = Math.floor(Math.random() * poolCaracteres.length);
            motDePasse += poolCaracteres.charAt(indexAleatoire);
        }
        motsDePasseGenerees.push(motDePasse);
    }

    /* Vider la liste de mots de passe existante et afficher les mots de passe générés */
    listeMotsDePasse.innerHTML = ""; // Vider le contenu précédent

    for (let i = 0; i < motsDePasseGenerees.length; i++) {
        const elementMotDePasse = document.createElement("li");
        const imageCopyMotDePasse = document.createElement("img");
        imageCopyMotDePasse.src = "assets/copy.svg";
        imageCopyMotDePasse.onclick = function () {
            copierMotDePasse(i);
        };

        const texteMotDePasse = document.createElement("p");
        texteMotDePasse.id = i;
        texteMotDePasse.textContent = motsDePasseGenerees[i];


        // Ajouter la fonctionnalité de copie (l'implémentation dépend de votre méthode préférée)
        // Par exemple, vous pouvez utiliser une API de presse-papiers ou un bouton avec un écouteur d'événement clic

        elementMotDePasse.appendChild(texteMotDePasse);
        elementMotDePasse.appendChild(imageCopyMotDePasse);
        listeMotsDePasse.appendChild(elementMotDePasse);
    }
}


/*Plus*/
btnPlus.addEventListener("click", () =>
    (
        champNombreMotsDePasse.value = Number(champNombreMotsDePasse.value) + 1
    ));
/*Moin*/
btnMin.addEventListener("click", () =>
    (
        champNombreMotsDePasse.value = Number(champNombreMotsDePasse.value) - 1
    ));
/*Export*/
btnexport.addEventListener("click", function () {   
    if (motsDePasseGenerees.length === 0) {
        alert("Veuillez d'abord générer un mot de passe.");
        return;
    }else{
    const blob = new Blob([motsDePasseGenerees.join("\n") ], { type: 'text/plain' });
    const anchor = document.createElement('a');
    anchor.href = window.URL.createObjectURL(blob);
    anchor.download = "motdepasse.txt";
    anchor.click();
    window.URL.revokeObjectURL(anchor.href);
    }
    
});


boutonGenerer.addEventListener("click", genererMotDePasse);
champNombreCaracteres.addEventListener("click", genereroption);

function genereroption() {
    for (let i = 0; i < 100; i++) {
        const op = document.createElement("option")
        op.textContent = i;
        op.value = i;
        champNombreCaracteres.appendChild(op);
    }

}

// Fonction existante pour générer un mot de passe
function generatePassword() {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    const passwordLength = document.getElementById("length").value;
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    document.getElementById("passwordDisplay").value = password;
}

// Nouvelle fonction pour exporter le mot de passe
function exportPassword() {
    
}


