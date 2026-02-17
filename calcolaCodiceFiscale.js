const bottoneCalcola = document.getElementById("calcolaCodiceFiscaleBottone");
const form = document.getElementById("codiceFiscaleForm");
const inputCodiceFiscale = document.getElementById("codiceFiscale");

bottoneCalcola.addEventListener("click", function(event) {
    event.preventDefault();
    const codiceFiscale = calcolaCodiceFiscale();
    inputCodiceFiscale.value = codiceFiscale;
});

function estraiConsonanti(stringa, numeroConsonanti, isNome) {
    let consonanti = "";
    if (!isNome) {
        for (let i = 0; i < stringa.length; i++) {
            if (!"AEIOU".includes(stringa[i]) && consonanti.length < numeroConsonanti) {
                consonanti += stringa[i];
            }
        }
    } else {
        let consonantiTemp = "";
        for (let i = 0; i < stringa.length; i++) {
            if (!"AEIOU".includes(stringa[i])) {
                consonantiTemp += stringa[i];
            }
        }
        if (consonantiTemp.length >= 4) {
            consonanti = consonantiTemp[0] + consonantiTemp[2] + consonantiTemp[3];
        } else {
            consonanti = consonantiTemp.slice(0, numeroConsonanti);
        }
    }
    return consonanti;
}

function estraiVocali(stringa) {
    let vocali = "";
    for (let i = 0; i < stringa.length; i++) {
        if ("AEIOU".includes(stringa[i])) {
            vocali += stringa[i];
            return vocali;
        }
    }
    return "";
}

function getLetteraMese(mese) {
    const lettereMese = ["A", "B", "C", "D", "E", "H", "L", "M", "P", "R", "S", "T"];
    return lettereMese[parseInt(mese) - 1];
}

function getCodiceComune(luogo) {
    const comuni = {
        "ROMA": "H501",
        "MILANO": "F205",
        "NAPOLI": "F839",
        "TORINO": "L219",
        "PALERMO": "G273",
        "GENOVA": "D969",
        "BOLOGNA": "A944",
        "FIRENZE": "D612",
        "BARI": "A662",
        "CATANIA": "C351"
    };
    return comuni[luogo] || "Z999"; // Restituisce "Z999" se il comune non è trovato
}

// Calcola il carattere di controllo del codice fiscale
// cf deve essere una stringa di 15 caratteri (senza l'ultima lettera)
function calcolaCarattereControllo(cf) {
  if (typeof cf !== "string" || cf.length !== 15) {
    throw new Error("Il codice deve avere esattamente 15 caratteri.");
  }

  cf = cf.toUpperCase();

  const valoriPari = {
    "0": 0,  "1": 1,  "2": 2,  "3": 3,  "4": 4,
    "5": 5,  "6": 6,  "7": 7,  "8": 8,  "9": 9,
    "A": 0,  "B": 1,  "C": 2,  "D": 3,  "E": 4,
    "F": 5,  "G": 6,  "H": 7,  "I": 8,  "J": 9,
    "K": 10, "L": 11, "M": 12, "N": 13, "O": 14,
    "P": 15, "Q": 16, "R": 17, "S": 18, "T": 19,
    "U": 20, "V": 21, "W": 22, "X": 23, "Y": 24,
    "Z": 25
  };

  const valoriDispari = {
    "0": 1,  "1": 0,  "2": 5,  "3": 7,  "4": 9,
    "5": 13, "6": 15, "7": 17, "8": 19, "9": 21,
    "A": 1,  "B": 0,  "C": 5,  "D": 7,  "E": 9,
    "F": 13, "G": 15, "H": 17, "I": 19, "J": 21,
    "K": 2,  "L": 4,  "M": 18, "N": 20, "O": 11,
    "P": 3,  "Q": 6,  "R": 8,  "S": 12, "T": 14,
    "U": 16, "V": 10, "W": 22, "X": 25, "Y": 24,
    "Z": 23
  };

  const restoToChar = {
    0: "A",  1: "B",  2: "C",  3: "D",  4: "E",
    5: "F",  6: "G",  7: "H",  8: "I",  9: "J",
    10: "K", 11: "L", 12: "M", 13: "N", 14: "O",
    15: "P", 16: "Q", 17: "R", 18: "S", 19: "T",
    20: "U", 21: "V", 22: "W", 23: "X", 24: "Y",
    25: "Z"
  };

  let somma = 0;

  for (let i = 0; i < 15; i++) {
    const c = cf.charAt(i);
    if (!/[A-Z0-9]/.test(c)) {
      throw new Error("Carattere non valido nel codice fiscale.");
    }

    // Le posizioni del codice fiscale sono numerate da 1 a 16:
    // dispari: 1,3,5,... -> indice i pari (0,2,4,...)
    // pari:   2,4,6,... -> indice i dispari (1,3,5,...)
    if ((i + 1) % 2 === 1) {
      // posizione dispari
      somma += valoriDispari[c];
    } else {
      // posizione pari
      somma += valoriPari[c];
    }
  }

  const resto = somma % 26;
  return restoToChar[resto];
}

// Esempio d'uso:
// dato un CF completo, prendo i primi 15 caratteri e calcolo il controllo
function estraiControlloDaCF(cfCompleto) {
  const base = cfCompleto.slice(0, 15);
  return calcolaCarattereControllo(base);
}

function calcolaCodiceFiscale() {
    const nome = document.getElementById("nome").value.toUpperCase();
    const cognome = document.getElementById("cognome").value.toUpperCase();
    const dataNascita = document.getElementById("dataNascita").value;
    const sesso = document.getElementById("sesso").value;
    const luogoNascita = document.getElementById("luogoNascita").value.toUpperCase();

    let codiceFiscale = "";

    // Calcolo le prime tre lettere del cognome
    codiceFiscale += estraiConsonanti(cognome, 3, false);
    codiceFiscale += estraiVocali(cognome);

    // Calcolo le prime tre lettere del nome
    codiceFiscale += estraiConsonanti(nome, 3, true);

    // Calcolo le ultime due cifre dell'anno di nascita
    const annoNascita = dataNascita.split("-")[0];
    codiceFiscale += annoNascita.slice(-2);

    // Calcolo la lettera per il mese
    const meseNascita = dataNascita.split("-")[1];
    codiceFiscale += getLetteraMese(meseNascita);

    // Calcolo il giorno di nascita
    let giornoNascita = parseInt(dataNascita.split("-")[2]);
    if (sesso === "F") {
        giornoNascita += 40;
    }
    codiceFiscale += giornoNascita.toString().padStart(2, "0");

    // Calcolo il luogo di nascita
    codiceFiscale += getCodiceComune(luogoNascita);

    codiceFiscale += estraiControlloDaCF(codiceFiscale);

    return codiceFiscale;

}


