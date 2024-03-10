/*
CONSTANTES
*/
const LETTRES_MAJUSCULES = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LETTRES_MINUSCULES = LETTRES_MAJUSCULES.toLowerCase();
const CHIFFRES = "0123456789";
const CARACTERES_SPECIAUX = "!@#$%^&*()_+-=[]{}|;':,./<>?";

const NOMBRE_CARACTERES_PAR_DEFAUT = 14;
const NOMBRE_MOTS_DE_PASSE_PAR_DEFAUT = 20;

/* Références aux éléments du DOM (en supposant que ces éléments existent dans votre HTML) */
const caseCocherMajuscule = document.getElementById("uppercase");
const caseCocherMinuscule = document.getElementById("lowercase");
const caseCocherChiffres = document.getElementById("numbers");
const caseCocherSymboles = document.getElementById("symbols");
const champNombreCaracteres = document.getElementById("nbCaracter"); // En supposant que c'est pour la saisie utilisateur
const champNombreMotsDePasse = document.getElementById("nbpassword"); // En supposant que c'est pour la saisie utilisateur
const listeMotsDePasse = document.getElementById("pwd-list");
const boutonGenerer = document.getElementById("btn");

function copierMotDePasse(id) {
    const MotsDePasse = document.getElementById(id).textContent;
    console.log(MotsDePasse);
    const copie = navigator.clipboard.writeText(MotsDePasse).textContent;
    console.log(copie);
}


function genererMotDePasse() {
    /* Récupérer la saisie de l'utilisateur (si disponible), en garantissant des valeurs valides */
    const nombreCaracteres = NOMBRE_CARACTERES_PAR_DEFAUT; //Number(champNombreCaracteres.value);
    const nombreMotsDePasse = NOMBRE_MOTS_DE_PASSE_PAR_DEFAUT; //champNombreMotsDePasse.value;
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
    const motsDePasseGenerees = [];
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

boutonGenerer.addEventListener("click", genererMotDePasse);