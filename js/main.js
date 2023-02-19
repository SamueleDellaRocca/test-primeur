// ASSOCIO AD UNA VARIABILE IL PATH DEL MIO JSON ESSENDO IN LOCALE
const url = 'js/dati.json';

// PRENDO L'INPUT DALL HTML
let input = document.querySelector('#input');
const list = document.querySelector('.list');

// FUNZIONE XHR
function getData() {

    // CREO LA RICHIESTA
    const request = new XMLHttpRequest();

    // APRO LA RICHIESTA DEFINENDO IL METODO CON CUI LA VOGLIO PRENDERE E SPECIFICANDO L'URL
    request.open('GET', url);

    // SETTO LA RISPOSTA IN JSON
    request.responseType = 'json';


    // EVENTO PER IL CONTROLLO DELLO STATO DELLA RICHIESTA
    request.onload = function() {
        // const data = JSON.parse(request.response);

        // ASSOCIO LA RISPOSTA AD UNA VARIABILE
        const data = request.response;

        // ORA CHE HO PRESO I DATI CI POSSO LAVORARE

        // ALL'INPUT AGGIUNGO UNA FUNZIONE AL KEYUP DALLA TASTIERA
        input.addEventListener('keyup', (event) => {

            // FUNZIONE LANCIATA AL CLICK CHE INSERISCE IL SUGGERIMENTO COME VALORE DELL'INPUT E LANCIA LA FUNZIONE CHE SVUOTA LA LISTA DEI SUGGERIMENTI
            function displayNames(valore) {
                input.value = valore;
                removeElements();
            } 

            // FUNZIONE PER RIMUOVERE GLI <li> E SVUOTARE LA TABELLA DEI SUGGERIMENTI 
            function removeElements() {
                let elementi = document.querySelectorAll(".list-items");
                elementi.forEach((elemento) => {
                elemento.remove();
                });
            }

            
            // PULISCO LA LISTA DEI SUGGERIMENTI 
            removeElements();


            // ITERO SUI DATI OTTENUTI DALLA CHIAMATA AJAX 
            data.forEach(item => {

                // DEFINISCO UNA FUNZIONE DI RICHIAMO DA ASSOCIARE AL CLICK SUL SUGGERIMENTO
                function richiamo() {
                    displayNames(item.mese)
                }        
    
                // CONTROLLO SE I DATI OTTENUTI E L'INPUT INSERITO INIZIANO CON LE STESSE LETTERE E L'INPUT NON è VUOTO
                if(item.mese.toLowerCase().startsWith(input.value.toLowerCase()) && input.value != "") {

                    // CREO UN <li>
                    let elementoLista = document.createElement("li");

                    // AGGIUNGO LA CLASSE DI STILE
                    elementoLista.classList.add("list-items");

                    // AGGIUNGO LA FUNZIONE AL CLICK
                    elementoLista.addEventListener("click", richiamo);
                                            
                    // UTILIZZO IL METODO substr PER EVIDENZIARE IN GRASSETTO LE LETTERE INSERITE NELL'INPUT IN COMUNE A QUELLE DEI DATI
                    let suggerimento = "<b>" + item.mese.substr(0, input.value.length) + "</b>";

                    // CONCATENO LE LETTERE NON IN GRASSETTO
                    suggerimento += item.mese.substr(input.value.length);

                    // INSERISCO COME innerHTML DEL <li> IL SUGGERIMENTO
                    elementoLista.innerHTML = suggerimento;

                    // INSERISCO GLI <li> CREATI ALL'INTERNO DEL DOM, DENTRO LA <ul>
                    list.appendChild(elementoLista);
                }
            });

        });

    };      
        
    // MANDO IL SEND DELLA RICHIESTA
    request.send();
}

// LANCIO LA FUNZIONE 
getData();


// METODO FETCH
// fetch(url)
//     .then(response => response.json())
//     .then(response => {
//         data = response;
//         console.log(data);
//     });





