/*******************************************************************************
    Scène du jeu
*******************************************************************************/

////////// AUDIO ///////////////////////////////////////////////////////////////
const audio = {
    succes: new Audio('media/succes.wav'),
    echec: new Audio('media/echec.wav')
}

////////// ÉLÉMENTS DU DOM /////////////////////////////////////////////////////
// L'indice
const h2Indice = document.querySelector('h2.indice');
// Le mot caché à deviner
const sectionLettresDuMot = document.querySelector('.lettres-du-mot');
// Le clavier avec les lettres de l'alphabet
const sectionLettresDisponibles = document.querySelector('.lettres-disponibles');
// Le bouton pour démarrer une partie
const btnNouvellePartie = document.querySelector(".btn-nouvelle-partie");

// Sous-titre animé dans l'intro
const sousTitreIntro = document.querySelector(".anim-sous-titre-intro");

// Interface d'une partie du jeu
const zoneJeu = document.querySelector(".jeu");

// Saisir l'image du "pendu"
const imgPendu = document.querySelector("#img-pendu");

// Interface de fin du jeu
const zoneFin = document.querySelector(".fin");

// Le tableau des parties précédentes
const tableauParties = document.querySelector(".tableau-parties");

// Bouton servant à recommencer le jeu
const btnRecommencer = document.querySelector('main.fin .btn-recommencer');

////////////////////// VARIABLES DU JEU /////////////////////////////////
// Boulier pour assurer un tirage sans remise
const boulier = [...Array(50).keys()];

// Variable conservant le nombre de lettres total d'un mot
let nbTotalLettres;

// Variable comptant le nombre de lettres dévoilées
let nbLettresDevoilees;

// Variable comptant le nombre de lettres erronées
let nbMauvaiseLettre;

// Variable servant à savoir sur quel mot le joueur est rendu
let numeroMotActuel = 0;

// Variable comptant le nombre de mots que le joueur devine
let nbMotsDevines = 0;

// Objet désignant les valeurs du pointage
let pointage = {

    // La valeur de la variation du pointage
    fluctuationTxt: document.querySelector(".pointage-fluctuation"),

    // Le pointage accumulé pour le mot
    mot: 0,
    motTxt: document.querySelector(".pointage-mot"),

    // Texte du nombre de points additionné au total
    bilanTxt: document.querySelector(".pointage-bilan"),

    // Le pointage total de la partie
    total: 0,
    totalTxt: document.querySelector(".pointage-total"),

    // Tableau qui stockera les pointages des parties
    tableau: [],
    tableauChaine: "",

    // Le numéro de chaque partie (dans l'interface de fin)
    numeroPartie: 0,

    // La valeur du record
    record: 0,
    introRecord: document.querySelector(".intro-record"),
}

////////// ÉCOUTEURS D'ÉVÉNEMENTS STATIQUES ////////////////////////////////////
// Gérer le bouton "Nouvelle partie"
btnNouvellePartie.addEventListener('click', demarrerPartie);
// Gérer le double-clic de l'indice
h2Indice.addEventListener('dblclick', devoilerIndice);

// Gérer la fin de l'animation d'intro
sousTitreIntro.addEventListener("animationend", afficherBoutonDemarrage);

// Gérer l'animation de l'animation du prochain mot
imgPendu.addEventListener("animationend", animationProchainMot);

// Gérer le bouton "Rejouer?"
btnRecommencer.addEventListener('click', rechargerSite);

///////////////// FONCTIONS GESTION ANIMATIONS /////////////////////////////

/* Lorsque l'animation de l'intro se termine, afficher le bouton de démarrage */
function afficherBoutonDemarrage(evt) {
    if(evt.animationName == "affiche-sous-titre") {
        // Ajouter la classe "actif" au bouton
        btnNouvellePartie.classList.add("actif");


    }

}

/* Fonction pour écouter la fin de l'animation du pendu complet */
function animationProchainMot() {
    // Lorsque le joueur n'est pas encore au troisième mot...
    if(numeroMotActuel < 3) {

        // Le joueur passe au mot suivant
        demarrerPartie();
    
    // Sinon, initialiser la fin de partie
    } else {
        finPartie();
    }
}

////////// FONCTIONS (INTERACTIVITÉ DU JEU) ////////////////////////////////////

/**
 * ///////////////////////////////////////////////////////
 * Récupérer l'ancien record au commencement de la page
 * ///////////////////////////////////////////////////////
 */
// Si aucun record n'a été sauvegardé
if(localStorage.getItem("localRecord") == null) {
    // On sauvegarde un record de 0 dans le LocalStorage
    localStorage.setItem("localRecord", pointage.record);
} else {
    // Sinon, on récupère le record actuel du LocalStorage
    pointage.record = Number(localStorage.getItem("localRecord"));
}

// Insérer la valeur du record dans le texte désigné
pointage.introRecord.innerText = "Votre record : " + pointage.record;

/**
 * ///////////////////////////////////////////////////////
 * Fonction gérant l'initialisation de la scène de jeu
 * ///////////////////////////////////////////////////////
 */
function demarrerPartie() {

    // Retirer du curseur la classe .c-bouton
    curseur.classList.remove("c-bouton");

    // Si l'écran d'accueil n'a pas encore été retiré...
    if(document.querySelector("main.intro") != null) {
        // On enlève le conteneur de l'intro
	    document.querySelector("main.intro").remove();
    }

    // Cacher l'écran de fin s'il était visible
    if(zoneFin.style.display != "none") {
        zoneFin.style.display = "none";
    }

	// On met le conteneur du jeu visible
	zoneJeu.style.display = "flex";

    // On réactive les pointer events pour la zone de jeu
    zoneJeu.style.pointerEvents = "all";

    // Lorsque le joueur n'est pas au troisième mot...
    if(numeroMotActuel < 3) {
        // On incrémente la variable numeroMotActuel...
        numeroMotActuel++;
    
    // Sinon, cela signifie que la partie a été recommencée
    } else {
        // On indique que le joueur est au premier mot
        numeroMotActuel = 1;
    }

    // Réinitialiser la scène de jeu...
    reinitialiser();

    // Obtenir un mot aléatoire...
    ObtenirMotAlea();

}

/**
 * ///////////////////////////////////////////////////////
 * Fonction sélectionnant un mot aléatoire sans remise
 * ///////////////////////////////////////////////////////
 */
function ObtenirMotAlea() {

    // Generer un npmbre parmi ceux restants
    let posAlea = Math.floor(Math.random()*boulier.length);
    
    // Saisir le nom de ce mot
    let mot = mots[boulier[posAlea]].mot;
    
    /* Conserver le nombre total de lettres du mot en question */
    nbTotalLettres = mot.length;
    
    // Saisir l'indice de ce mot
    let indice = mots[boulier[posAlea]].indice;
        
    // Insérer l'indice dans le UI du jeu
    h2Indice.innerText = indice;

    // Retirer le mot du boulier
    boulier.splice(posAlea, 1);
    
     // Composer l'aire du jeu
     let divLettre;
     for (let lettre of mot) {
        divLettre = document.createElement('div');
        // Remarquer qu'on veut s'assurer que les lettres sont affichées en majuscule
        divLettre.innerText = lettre.toUpperCase();
        // Associer une classe ayant comme nom la lettre courante (sera utile
        // uniquement pour vérifier le résultat plus loin dans le code)
        divLettre.classList.add(lettre.toUpperCase());
        sectionLettresDuMot.append(divLettre);
    }
}

/**
 * ///////////////////////////////////////////////////////
 * Afficher le clavier des lettres
 * ///////////////////////////////////////////////////////
 */
function afficherClavier() {
    // On vide la section des lettres disponibles
    sectionLettresDisponibles.innerHTML = ""; // Laisser cette ligne telle-quelle

    let spanLettre;
    for(let lettre of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {

        // Créer l'élément span et l'affecter à la variable spanLettre
        spanLettre = document.createElement("span");
        
        // Lui ajouter dans son contenu texte la lettre
        spanLettre.innerText = lettre;
        
        // Détecter un clic avcec un écouteur d'événement
        spanLettre.addEventListener("click", validerLettre);

        // Changer la curseur de la souris avec "mouseover" et "mouseout"
        spanLettre.addEventListener("mouseover", changerCurseurBouton);
        spanLettre.addEventListener("mouseout", changerCurseurBouton);
        
        // L'insérer dans la section des lettres disponibles
        sectionLettresDisponibles.append(spanLettre);
    }
}


/**
 * ///////////////////////////////////////////////////////
 * Fonction pour afficher l'indice
 * ///////////////////////////////////////////////////////
 */
function devoilerIndice() {
    // Dévoiler l'indice pénalise le pointage du joueur
    pointage.fluctuationTxt.innerText = "-2";
    pointage.fluctuationTxt.style.opacity = "1";
    pointage.fluctuationTxt.style.color = "#f00";
    pointage.mot-=2;
    pointage.motTxt.innerText = "Pointage pour le mot : " + pointage.mot;

    // On veut dévoiler la zone d'indice du mot.
    h2Indice.classList.add('devoiler');
    // On ajuste les classes du curseur personnalisé une fois que l'indice est dévoilée
    // Voir aussi la fonction 'devoilerIndice' pour une meilleure compréhension
    curseur.classList.remove('c-indice');
    curseur.innerText = "";
}


/**
 * ////////////////////////////////////////////////////////////////////
 * Fonction gérant la validation d'une lettre, et le changement de mot
 * ////////////////////////////////////////////////////////////////////
 */
function validerLettre(event) {
    
    let toucheChoisie = event.target;
    let lettreChoisie = toucheChoisie.innerText;


    // Vérifier s'il y a cette lettre dans le mot à deviner (on se rappelle 
    // que nous avions ajouté une classe nommée suivant la lettre à chaque élément 
    // contenant une lettre du mot à deviner)
    // On suppose pour commencer que la lettre n'est pas bonne ...
    let etatVerif = 'echec';

    // ... puis on cherche le tableau des éléments du DOM qui ont cette lettre 
    // parmi leurs classes CSS ...
    let lettresDevinees = sectionLettresDuMot.querySelectorAll('.' + lettreChoisie);
    // Si le tableau retourné contient des éléments ...
    if(lettresDevinees.length > 0) {
        // ... alors la lettre est bonne (elle est dans le mot à deviner !)
        etatVerif = 'succes';

        // Le joueur gagne 2 points par lettre devinée!
        pointage.fluctuationTxt.innerText = "+2";
        pointage.fluctuationTxt.style.opacity = "1";
        pointage.fluctuationTxt.style.color = "#7ac5d8";
        pointage.mot+=2;
        pointage.motTxt.innerText = "Pointage pour le mot : " + pointage.mot;

    /* Sinon, le joueur a choisi une mauvaise lettre! */
    } else {
        // Incrémenter le compteur d'erreurs
        nbMauvaiseLettre++;

        // Passer à la prochaine image du pendu
        imgPendu.src = "images/erreur" + nbMauvaiseLettre + ".png";

        // Le joueur perd 1 point
        pointage.fluctuationTxt.innerText = "-1";
        pointage.fluctuationTxt.style.opacity = "1";
        pointage.fluctuationTxt.style.color = "#f00";
        pointage.mot--;
        pointage.motTxt.innerText = "Pointage pour le mot : " + pointage.mot;
    }


    // En fin de compte, on peut jouer le son correspondant à l'état de la 
    // vérification ('echec' ou 'succes') ...
    audio[etatVerif].play();
    // ... on rembobine vite le son pour qu'il puisse être 're-joué' même en rafale :
    audio[etatVerif].currentTime = 0;
    /* ... et on désactive cette touche:
     * en enlevant le gestionnaire d'événement
     * et, en associant la classe CSS qui va illustrer si la lettre choisie était bonne ou non
     */
    toucheChoisie.removeEventListener('click', validerLettre);
    toucheChoisie.classList.add('choisie-' + etatVerif);
    

    // On parcourt toutes les cases du mot à deviner qui contiennent la lettre choisie
    for(let chaqueLettreDevinee of lettresDevinees) {
        // On affiche la lettre en lui associant la classe CSS appropriée
        chaqueLettreDevinee.classList.add('devoiler');

        // La varialbe nbLettresDevoilees est incrémentée pour chaque lettre devinée
        nbLettresDevoilees++;
    }


    /* Lors d'une condition de changement de mot... */
    if((nbLettresDevoilees == nbTotalLettres) || (nbMauvaiseLettre == 6)) {

        // Si le joueur réussit à deviner le mot...
        if(nbLettresDevoilees == nbTotalLettres) {
            // On incrémente le nombre de mots devinés
            nbMotsDevines++;

            // L'animation du mot deviné joue
            imgPendu.classList.add("mot-devine");

        // Sinon, si le joueur commet 6 erreurs...
        } else if(nbMauvaiseLettre == 6) {

            // L'animation du pendu complet joue
            imgPendu.classList.add("pendu-complet");

            // Si le pointage pour le mot était positif...
            if(pointage.mot > 0) {
                // On indique que l'on soustrait ce pointage
                pointage.fluctuationTxt.innerText = toString(-pointage.mot);
                pointage.fluctuationTxt.style.color = "#f00";
            } else {
                // Sinon, on indique pas qu'on rajoute des points
                pointage.fluctuationTxt.style.opacity = "0";
            }

            // Le joueur ne gagne ni perd aucun point pour ce mot :/
            pointage.mot = 0;
            pointage.motTxt.innerText = "Pointage pour le mot : " + pointage.mot;
        }

        // Ajouter la somme à ajouter au texte du "bilan"
        pointage.bilanTxt.innerText = "+" + pointage.mot;
        pointage.bilanTxt.style.opacity = "1";

        // Le pointage du mot est additionné au pointage total
        pointage.total+=pointage.mot;
        pointage.totalTxt.innerText = "Pointage total : " + pointage.total;

        // On empephe le joueur d'interragir avec le document
        zoneJeu.style.pointerEvents = "none";
    }

}

/**
 * ///////////////////////////////////////////////////////
 * Fonction gérant la rénitialisation de la scène du jeu
 * ///////////////////////////////////////////////////////
 */
function reinitialiser() {
    // Remettre à 0 le nombre de lettres dévoilées, le nombre de lettres erronées et le pointage du mot
    nbLettresDevoilees = 0;
    nbMauvaiseLettre = 0;
    pointage.mot = 0;

    // Réinitialiser l'image du pendu
    imgPendu.src = "images/erreur" + nbMauvaiseLettre + ".png";

    // Retirer les classes des animations de fin
    imgPendu.classList.remove("mot-devine");
    imgPendu.classList.remove("pendu-complet");

    // Remettre à jour les textes du pointage
    pointage.fluctuationTxt.style.opacity = 0;
    document.querySelector(".pointage-bilan").style.opacity = 0;
    pointage.motTxt.innerText = "Pointage pour le mot : " + pointage.mot;
    pointage.totalTxt.innerText = "Pointage total : " + pointage.total;

    // Remettre le voile sur l'indice
    h2Indice.classList.remove('devoiler');

    // Vider la section du mot à deviner
    while(sectionLettresDuMot.children.length>0) {
        sectionLettresDuMot.firstElementChild.remove();
    }

    // Reconstruire le clavier des lettres
    afficherClavier();
}


/**
 * ///////////////////////////////////////////////////////
 * Fonction pour gérer l'écran de fin de partie
 * ///////////////////////////////////////////////////////
 */
function finPartie() {
    // On cache l'écran de jeu
	zoneJeu.style.display = "none";

    // Afficher l'écran de fin de partie
	zoneFin.style.display = "flex";

    // Afficher les résultats finaux de la partie
    // Le nombre de mots deviné:
    if(nbMotsDevines == 0) {
        document.querySelector(".nb-mots-devines").innerText = "Vous avez deviné aucun des 3 mots :(";
    } else if(nbMotsDevines == 1 || nbMotsDevines == 2) {
        document.querySelector(".nb-mots-devines").innerText = "Vous avez deviné " + nbMotsDevines + " des 3 mots!";
    } else {
        document.querySelector(".nb-mots-devines").innerText = "Vous avez réussi à deviner les 3 mots!";
    }

    // Le pointage final:
    if(pointage.total != 1) {
        document.querySelector(".pointage-final").innerText = "Votre score final : " + pointage.total + " points";
    } else {
        document.querySelector(".pointage-final").innerText = "Votre score final : 1 point?";
    }

    /* S'il n'y a pas d'autres parties enregistrées */
    if(localStorage.getItem("localPointage") == null) {

        // On sauvegarde le nouveau record
        nouveauRecord();

        // On pousse le premier pointage final dans le tableau
        pointage.tableau.push(pointage.total);

        // On convertit ce tableau en chaîne
        pointage.tableauChaine = JSON.stringify(pointage.tableau);

        // On sauvegarde le tableau en chaîne dans le LocalStorage
        localStorage.setItem("localPointage", pointage.tableauChaine);


    } else {
        // On récupère le tableau en chaîne du LocalStorage
        pointage.tableauChaine = localStorage.getItem("localPointage");

        // On le convertit de nouveau en tableau
        pointage.tableau = JSON.parse(pointage.tableauChaine);

        // On pousse le pointage final de notre partie dans ce tableau
        pointage.tableau.push(pointage.total);

        // On convertit le nouveau tableau en chaîne
        pointage.tableauChaine = JSON.stringify(pointage.tableau);

        // Et on sauvegarde le nouveau tableau en chaîne dans le LocalStorage
        localStorage.setItem("localPointage", pointage.tableauChaine);

        // Si le pointage final de cette partie bat l'ancien record...
        if(pointage.total > pointage.record) {
            // On sauvegarde le nouveau record
            nouveauRecord();
        }

    }

    // Générer le tableau des parties précédentes
    let numeroPartie = 0;
    for (let pointagePartie of pointage.tableau) {

        numeroPartie++;

        // Créer une rangée du tableau, et lui attribuer une classe
        let divPartie = document.createElement("div");
        divPartie.classList.add("rangee-partie");

        divPartie.innerHTML = "<div>"+ numeroPartie +"</div><div>" + pointagePartie + "</div>";

        // L'insérer dans le tableau des parties
        tableauParties.append(divPartie);

    }

}

/**
 * ///////////////////////////////////////////////////////
 * Fonction pour gérer un nouveau record
 * ///////////////////////////////////////////////////////
 */
function nouveauRecord() {

    // On affiche le message "Nouveau record!"
    document.querySelector(".message-record").innerText = "Nouveau record!";

    // Le pointage final de cette partie devient le nouveau record
    pointage.record = pointage.total;

    // Et on sauvegarde le nouveau record dans le LocalStorage
    localStorage.setItem("localRecord", pointage.record);

}

/**
 * ///////////////////////////////////////////////////////
 * Fonction pour recharger le site web
 * ///////////////////////////////////////////////////////
 */
function rechargerSite() {
    document.location.reload();
}



/*******************************************************************************
    Curseur personnalisé
*******************************************************************************/

/* [À compléter : étape 4a] */
// Saisir l'élément HTML de la page qui représente le curseur personnalisé
// Utiliser la variable nommée 'curseur' ci-dessous...

const curseur = document.querySelector("div.curseur");

/* [À compléter : étape 4b] */
// Saisir l'élément HTML de la page qui représente la racine du document
// sur lequel sont définies les propriétées personnalisées de position du 
// curseur.
// Utiliser la variable nommée 'racine' ci-dessous...

const racine = document.querySelector(":root");

/* [À compléter : étape 4c] */
// Ajouter à l'objet window l'écouteur de *mouvement* de la souris qui appellera 
// la fonction qui gère le déplacement du curseur personnalisé (bougerCurseur)
window.addEventListener("mousemove", bougerCurseur);


/* [À compléter : étape 4d] */
/**
 * Déplacer le curseur personnalisé pour suivre la position du pointeur de souris
 * @param {Event} evt : objet Event de l'événement en cours 
 */
function bougerCurseur(evt) {
    // Modifiez les valeurs des propriétés personnalisées définis sur la racine 
    // du document HTML
    racine.style.setProperty("--mouse-x", evt.clientX + "px");
    racine.style.setProperty("--mouse-y", evt.clientY + "px");
}

/* [À compléter : étape 4e] */
// Ajouter les écouteurs d'événements 'mouseover' et 'mouseout' au bouton 
// "Nouvelle partie" et qui appellent tous deux la même fonction qui gère le 
// changement d'aspect du curseur personnalisé (changerCurseurBouton)
btnNouvellePartie.addEventListener("mouseover", changerCurseurBouton);
btnNouvellePartie.addEventListener("mouseout", changerCurseurBouton);

// Faire la même chose avec le bouton "Rejouer?"
btnRecommencer.addEventListener("mouseover", changerCurseurBouton);
btnRecommencer.addEventListener("mouseout", changerCurseurBouton);



/* [À compléter : étape 4f] */
/**
 * Modifier la forme du curseur personnalisé lorsqu'on survole un "bouton"
 * @param {Event} evt : objet Event de l'événement en cours 
 */
 function changerCurseurBouton(evt) {
    // Selon le type d'événement, on veut ajouter ou enlever la classe 'c-bouton'
    // du curseur, et modifier son contenu textuel en conséquence (voir la démo)
    if(evt.type == "mouseover") {
        // Ajouter la classe .c-bouton
        curseur.classList.add("c-bouton");
    }
    else {
        // Retirer la classe .c-bouton
        curseur.classList.remove("c-bouton");
    }
}
// Gérer les événements de survol de l'indice du mot à deviner
h2Indice.addEventListener('mouseover', changerCurseurIndice);
h2Indice.addEventListener('mouseout', changerCurseurIndice);

/**
 * Modifier la forme et le contenu du curseur personnalisé lorsqu'on survole
 * l'élément qui contient l'indice du mot à deviner.
 * @param {Event} event : objet Event de l'événement en cours 
 */
function changerCurseurIndice(event) {
    // Cette première ligne juste pour éviter conflit avec code des étudiant.e.s
    let curseur = document.querySelector('.curseur');

    // S'il s'agit d'un survol et l'indice est encore caché...
    if(event.type == 'mouseover' && !event.target.classList.contains('devoiler')) {
        curseur.classList.add('c-indice');
        curseur.innerText = "Double-clic pour dévoiler l'indice";
    }
    else {
        curseur.classList.remove('c-indice');
        curseur.innerText = "";
    }
}

/* Fin du script */