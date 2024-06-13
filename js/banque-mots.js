// Banque de mots dans une "structure de données" JavaScript : le tableau contient
// une collection de "mot à deviner", et chaque mot à deviner est un objet JavaScript
// qui contient deux valeurs : la chaîne du mot, et une chaîne indice à donner
// à la demande du joueur.

let mots = [
    {
        mot: "tigre",
        indice: "Peut être du Bengale..."
    },
    {
        mot: "yeti",
        indice: "Animal légendaire du Tibet"
    },
    {
        mot: "mauve",
        indice: "Une plante, mais aussi une couleur"
    },
    {
        mot: "ouragan",
        indice: "Phénomène météorologique"
    },
    {
        mot: "grenade",
        indice: "Fruit explosif"
    },
    {
        mot: "eucalyptus",
        indice: "Les koalas en raffolent"
    },
    {
        mot: "acrophobie",
        indice: "Peur des hauteurs"
    },
    {
        mot: "brume",
        indice: "Brouillard léger"
    },
    {
        mot: "animation",
        indice: "L'illusion de la vie"
    },
    {
        mot: "vanille",
        indice: "Saveur de crème glacée"
    },
    // 11 à 20
    {
        mot: "azerty",
        indice: "Disposition du clavier la plus populaire en France"
    },
    {
        mot: "mythique",
        indice: "Plus rare que légendaire..."
    },
    {
        mot: "orgueil",
        indice: "Péché qui engendre tous les autres..."
    },
    {
        mot: "phosphophyllite",
        indice: "Minéral rare et fragile recherché pour sa couleur vert bleuté"
    },
    {
        mot: "deuil",
        indice: "Expérience que l'on est jamais prêt à vivre..."
    },
    {
        mot: "manigances",
        indice: "Manoeuvres secrètes et supectes (traduction de shenanigans)"
    },
    {
        mot: "ignorance",
        indice: "Bonheur de la naïveté selon Thomas Gray..."
    },
    {
        mot: "socioaffectif",
        indice: "Abilité à interagir avec son environnement social"
    },
    {
        mot: "vitrail",
        indice: "Composition formée de morceaux de verre colorés"
    },
    {
        mot: "irrationnel",
        indice: "Le contraire de la raison"
    },
    // 21 à 30
    {
        mot: "merci",
        indice: "Mot pour exprimer que l'on est reconnaissant"
    },
    {
        mot: "sournois",
        indice: "Qui dissimule ses sentiments réels dans une intention malveillante"
    },
    {
        mot: "mort",
        indice: "Le repos éternel..."
    },
    {
        mot: "apocalypse",
        indice: "La fin des jours..."
    },
    {
        mot: "amour",
        indice: "Le plus beau des sentiments"
    },
    {
        mot: "hantise",
        indice: "Qui provoque une forte inquiétude"
    },
    {
        mot: "indice",
        indice: "Qui peut aider à mieux deviner quelque chose"
    },
    {
        mot: "leitmotiv",
        indice: "Passage musical récurrent qui représente un concept ou un personnage"
    },
    {
        mot: "brise",
        indice: "Vent assez doux"
    },
    {
        mot: "agir",
        indice: "Prendre sa vie en main"
    },
    // 31 à 40
    {
        mot: "souvenir",
        indice: "Ce que l'on se rappelle du passé"
    },
    {
        mot: "optimisme",
        indice: "Voir la lumière au bout du tunnel"
    },
    {
        mot: "proches",
        indice: "Personnes que l'on aime tellemment"
    },
    {
        mot: "anthologie",
        indice: "Recueil de textes ou de morceaux partageant les mêmes caractéristiques"
    },
    {
        mot: "oeuvre",
        indice: "L'aboutissement du travail d'une personne"
    },
    {
        mot: "nourriture",
        indice: "Carburant des êtres humains"
    },
    {
        mot: "enzyme",
        indice: "Substance biologique qui favorisant les réactions chimiques"
    },
    {
        mot: "marguerite",
        indice: "Fleur blanche et jaune"
    },
    {
        mot: "empathe",
        indice: "Personne sensible aux émotions des autres"
    },
    {
        mot: "espadon",
        indice: "Aussi appelé poisson épée"
    },
    // 41 à 50
    {
        mot: "brillant",
        indice: "Qui émet ou réfléchit de la lumière"
    },
    {
        mot: "silhouette",
        indice: "Forme sur fond clair"
    },
    {
        mot: "changement",
        indice: "La seule constante dans notre univers"
    },
    {
        mot: "insulaire",
        indice: "Résident d'une île"
    },
    {
        mot: "erreur",
        indice: "Une autre opportunité pour apprendre"
    },
    {
        mot: "galaxie",
        indice: "Grand ensemble d'étoiles"
    },
    {
        mot: "tunnel",
        indice: "Longue période de difficultés"
    },
    {
        mot: "maintenant",
        indice: "Le meilleur moment pour agir"
    },
    {
        mot: "internet",
        indice: "Réseau informatique mondial"
    },
    {
        mot: "protagoniste",
        indice: "Personnage principal dans une histoire"
    }
]