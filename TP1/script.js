// Partie 1
const nomClasse = "B1-A";
let nombreEleves = 28;
let estOuverte = true;
console.log("Le nom de la classe est : ", nomClasse);
console.log("Le nombre d'eleves dans la classe est : ", nombreEleves);
console.log("La classe est ouverte : ", estOuverte);

// Partie 2
const eleve = { name : "Raphael", noteMaths : 16, noteFrancais : 12};
console.log("Le prénom de l'éleve est ", eleve.name);

// Partie 3
const eleves = [{ name : "Maxime"}, {name : "Melvin"}, {name : "Lise"}];
for (let i = 0; i < eleves.length; i++){
    console.log(eleves[i].name);
}

// Partie 4
const eleves2 = [{ name : "Maxime", noteMaths : 13, noteFrançais : 16}, {name : "Melvin", noteMaths : 10, noteFrançais : 16}, {name : "Lise", noteMaths : 11, noteFrançais : 15}];
for (let i = 0; i < eleves.length; i++){
    let moyenne = (eleves2[i].noteMaths + eleves2[i].noteFrançais) / 2;
    console.log(eleves2[i].name, "a une moyenne de ", moyenne);
}