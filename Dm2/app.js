import {injectElements, renewTag} from "./functions/dom.js";

const wrapper = document.querySelector('#controle')

function start() {

    const etapes = [
        { title: "Commence à faire le café", duree: 2000 },
        { title: "Mouds les grains de café", duree: 3000 },
        { title: "Fait chauffer l'eau", duree: 2500 }, 
        { title: "Infuse les grains de café moulus", duree: 3500 }, 
        { title: "Verse le café dans une tasse", duree: 1500 },
        { title: "Ajoute un peu de lait dans la tasse", duree: 2000 }, 
        { title: "Le café est terminé.", duree: 1000 } 
    ];
    
    const laListe = renewTag('ul');
    wrapper.append(laListe)

    injectElements(etapes, laListe)

}

document.querySelector('#start').addEventListener('click', start)
// Sélectionnez l'élément avec l'ID "controle"
const controle = document.querySelector('#controle');

const inputQuantiteCafe = document.createElement('input');
inputQuantiteCafe.type = 'number'; 
inputQuantiteCafe.placeholder = 'Quantité de café en tasses'; 

const boutonCalculer = document.createElement('button');
boutonCalculer.innerText = 'Calculer';

boutonCalculer.addEventListener('click', calculerCafe);

controle.insertBefore(inputQuantiteCafe, document.querySelector('#start')); 
controle.insertBefore(boutonCalculer, document.querySelector('#start')); 

// Fonction pour calculer la quantité de café
function calculerCafe() {
    
    const quantiteCafe = parseInt(inputQuantiteCafe.value, 10);

    
    if (isNaN(quantiteCafe) || quantiteCafe <= 0) {
        alert('Veuillez entrer une quantité de café valide en tasses.');
        return;
    }
}


const inputQuantiteCafe = createInputElement('Quantité de café en tasses', 'number');
const inputQuantiteEau = createInputElement('Quantité d\'eau en ml', 'number');
const inputQuantiteLait = createInputElement('Quantité de lait en ml', 'number');
const inputQuantiteGrainsCafe = createInputElement('Quantité de grains de café en g', 'number');

const boutonCalculer = createHTMLElement('button', {
    innerText: 'Calculer'
});

boutonCalculer.addEventListener('click', calculerCafe);

controle.insertBefore(inputQuantiteCafe, document.querySelector('#start'));
controle.insertBefore(inputQuantiteEau, document.querySelector('#start'));
controle.insertBefore(inputQuantiteLait, document.querySelector('#start'));
controle.insertBefore(inputQuantiteGrainsCafe, document.querySelector('#start'));
controle.insertBefore(boutonCalculer, document.querySelector('#start'));

// Fonction pour calculer la quantité de café pouvant être préparée
function calculerCafe() {
    const quantiteCafeDemandee = parseInt(inputQuantiteCafe.value, 10);
    const quantiteEauDisponible = parseInt(inputQuantiteEau.value, 10);
    const quantiteLaitDisponible = parseInt(inputQuantiteLait.value, 10);
    const quantiteGrainsCafeDisponible = parseInt(inputQuantiteGrainsCafe.value, 10);

    const cafePossible = Math.min(
        Math.floor(quantiteEauDisponible / 200), 
        Math.floor(quantiteLaitDisponible / 50), 
        Math.floor(quantiteGrainsCafeDisponible / 15)
    );

    if (cafePossible >= quantiteCafeDemandee) {
        alert(`Oui, je peux faire cette quantité de café`);
    } else if (cafePossible > 0) {
        alert(`Oui, je peux faire cette quantité de café (et même ${cafePossible} plus que cela)`);
    } else {
        alert(`Non, je ne peux faire que ${cafePossible} tasse(s) de café`);
    }
}

// Fonction utilitaire pour créer un champ de saisie
function createInputElement(placeholder, type) {
    const input = createHTMLElement('input', {
        type: type,
        placeholder: placeholder
    });
    return input;

}

const etatMachine = document.querySelector('#etatMachine');

let eau = 0;  // ml
let grainsCafe = 0;  // g
let tassesJetables = 0;
let argent = 0;  // €

document.querySelector('#acheter').addEventListener('click', acheterCafe);

document.querySelector('#remplir').addEventListener('click', remplirFournitures);

document.querySelector('#prendre').addEventListener('click', prendreArgent);

function acheterCafe() {
    const choixCafe = prompt('Choisissez le type de café (expresso, latte, cappuccino):');
    const prixCafe = {
        expresso: 4, 
        latte: 6,     
        cappuccino: 5 
    };

    if (prixCafe[choixCafe]) {
        const coutCafe = prixCafe[choixCafe];
        if (eau >= 250 && grainsCafe >= 16 && tassesJetables >= 1) {
            alert(`Vous avez acheté un ${choixCafe}. Coût : ${coutCafe} €`);
            eau -= 250;
            grainsCafe -= 16;
            tassesJetables -= 1;
            argent += coutCafe;
        } else {
            alert('Fournitures insuffisantes pour préparer ce café.');
        }
    } else {
        alert('Café non reconnu.');
    }

    afficherEtatMachine();
}

function remplirFournitures() {
    eau += 1000;  // Remplir 1000 ml d'eau
    grainsCafe += 100;  // Remplir 100 g de grains de café
    tassesJetables += 10;  // Ajouter 10 tasses jetables
    afficherEtatMachine();
}

function prendreArgent() {
    alert(`Vous avez retiré ${argent} € de la machine.`);
    argent = 0;
    afficherEtatMachine();
}

function afficherEtatMachine() {
    etatMachine.textContent = `État des fournitures : Eau : ${eau} ml, Grains de café : ${grainsCafe} g, Tasses jetables : ${tassesJetables}, Argent : ${argent} €`;
}

afficherEtatMachine();





