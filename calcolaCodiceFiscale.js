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

    return codiceFiscale;

}

