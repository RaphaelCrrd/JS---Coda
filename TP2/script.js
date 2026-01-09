//////////////////////// Code fourni (ne pas moidifier) ////////////////////////

// Définir la taille du tableau de notes au hasard entre 15 et 30 éléments
let taille_minimum = 7;
let taille_maximum = 10;
let taille = Math.floor(Math.random() * (taille_maximum - taille_minimum + 1)) + taille_minimum;

// Déclarer le tableau pour stocker les notes
let notes = [];
// Définir la note maximale (pas besoin de définir la note minimale car elle est 0 par défaut)
let note_maximum = 20;

// Itérer autant de fois qu'on a de notes aléatoires à générer
for (let i = 0; i < taille; i++) {
    // Générer une note aléatoire entre 0 et note_maximum (inclus)
    let note = Math.floor(Math.random() * (note_maximum + 1));
    // Ajouter la note générée au tableau
    notes.push(note);
}

///////////////////////////////////////////////////////////////////////////////

// Partie 1
console.log(notes);  // Affiche le tableau

console.log("La taille du tablrau est : ", notes.length); // Affiche la taille du tableau

let minimum = notes[0];
let maximum = notes[0];

for (let i = 0; i < notes.length; i++) {
    if (notes[i] < minimum) {
        minimum = notes[i];
    }
    if (notes[i] > maximum) {
        maximum = notes[i];
    }
}
console.log("La plus patite valeur est ", minimum, ", et la plus petite valeur est ", maximum);

// Partie 2
console.log("La taille du tablrau est : ", notes.length); // Affiche la taille du tableau

let minimum2 = notes[0];
let indiceMin = 0;


for (let i = 0; i < notes.length; i++) {
    if (notes[i] < minimum2) {
        minimum2 = notes[i];
        indiceMin = i;
    }
}

console.log("La plus petite veleur est ", minimum2,  " et son indice est ", indiceMin)

// Partie 3
let minimum3 = notes[0];
let indiceMin2 = 0;
let tableau = notes.slice(); // Slice permet de copier les elements de notes pour les mettre dans tableau

for (let i = 0; i < notes.length; i++) {
    if (notes[i] < minimum3) {
        minimum3 = notes[i];
        indiceMin2 = i;
    }
}

tableau[0] = notes[indiceMin2];
tableau[indiceMin2] = notes[0];

console.log(tableau);

// Partie 4

let tableau3 = notes.slice();

for(let i = 0; i < notes.length - 1; i++) {
    let indiceMin3 = i;
    for (let j = i+1; j < notes.length; j++) {
        if (notes[j] < notes[indiceMin3]) {
            indiceMin3 = j;
        }
    }
    let echange = notes[i];
    notes[i] = notes[indiceMin3];
    notes[indiceMin3] = echange;
}

console.log(notes);

// Partie 5 
console.log("Tableau avant tri ", tableau3);
console.log("Tableau apres tri ", notes);