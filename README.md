HTML FILE:
  - Ho inserito tutti i vari input/label all'interno di un div in modo che lo stile (CSS) del form vada ad adattare questi contenitori in colonna.
  - L'output del codice fiscale e' stato messo come input readonly (su <div id="risultato></div>) per comodita' e perche' l'ho saputo gestire molto bene, ma si puo' fare in altri modi.
CSS FILE:
  - E' stata creata una variabile con root per pura comodita' e pulizia nel codice.
  - Ogni label e input hanno la larghezza del contenitore di tutto il contenuto / 2.
JAVASCRIPT FILE:
  - La funzione estraiConsonanti ha il parametro isNome perche' nel codice fiscale, quando si voglio mettere le prime consonanti si deve controllare se le consonanti >= 4, proprio perche' la seconda consonante verra' saltata. altrimenti se non ha consonanti >= 4 allora prendera' le consonanti dalla prima fino all'ultima
  - La funzione estraiVocali ritorna una sola vocale.
  - getLetteraMese in base al numero del mese, tipo 7 andra' a ritornare letteraMese[7 - 1] ovvero "L" che sarebbe luglio (Gennaio = "A", Dicembre = "T")
  - getCodiceComune ritorna 4 cifre in base al luogo di nascita oppure se non lo trova dara' "Z999".
