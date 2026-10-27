/* 
 diese komplette datei wird wie man so schön sagt "held together by hopes dreams and ducttape" 
 ich bin nicht gut genug im js um das schön aussehen zu lassen aber ich kommentirer jetzt alles das amn es wenigstens ein wenig versteht
*/
/* Diese funktion sorgt dafür das in der datei index.html alle karten geladen werden und die richtigen indentifikationen haben */
async function htmlload() {
return fetch('data.json')
    /* was genau dieses code snippet bei welcher linie macht ist mir nicht 100% klar da ich es von stackoverflow habe */
  .then(response => response.json())
  .then(data => {
    const numberOfCopies = data.plantsamount;
    const container = document.getElementById('cards-grid');
    let finalHTML = '';
    try {
    for (let i = 1; i <= numberOfCopies; i++) {
      
      finalHTML += `
        <div class="card">
              <img id="730" src="images-webp/${i}.webp" width="150">
            <div class="card-text">
              <h3 id="8${i}" class="card-title">Lädt</h3>
                <p id="9${i}" class="card-desc">Lädt</p>
              <div class="card-footer">
                <span class="tag" id="${i}">No Data</span>
                <a class="card-link" href="pflanze.html?id=${i}">Anzeigen</a>
              </div>
            </div>
          </div>
      `;
    }

    container.innerHTML = finalHTML;
    }
    /* diese funktion sorgt dafür das die anderen funktionen wissen wan das sie anfangen können die html zu bearbeiten */
    finally{return};

})
.catch(error => console.error('Error loading JSON:', error));
}

/* diese funktion sorgt dafür das in der html alle pflanzennamen und beschreibungen geladen werden */
async function cardtxt() {

    /* das wiederum sorgt dafür das die funktion wartet bis die html geladen wurde weils onnst das ganze programm nicht funktioniert */
    await htmlload();

    /* diese variable sagt dem code snippet wieviele durchläufe die funktion bereits gemacht hat um zur richtigen zeit aufhöhren zu können */
    let runs = 1
    const response = await fetch('data.json', { cache: 'no-store' });

        if (!response.ok) {
            thro
            new Error(`HTTP error! Status: ${response.status}`);
            }
        const data = await response.json();
    try {
        /* dieser loop ist so gemacht das er die variable runs und plantsamount aus der json vergleicht um herauszufinden wie oft es durchlaufen muss
        lustig find ich das es trotzdem ohne try nicht funktioniert hat warscheinlich weil baum */
        while (runs < Number(data["plantsamount"]) + 1) {
            if (runs < Number(data["plantsamount"]) + 1) {
                /* dies funktionen sorgen dafür das der "textcontent" der spezifischen html elementen mit dfen richtigen daten ausgefüllt wird sonst heisst es nur "lädt" XD */
                document.getElementById("8" + runs).textContent = (data["name_" + runs]);
                document.getElementById("9" + runs).textContent = (data["desc_" + runs]);
            }
            /* hier wird der variable "runs" um eins erhöht das wenn die nummer kleiner ist als plantsamount der loop stoppt... */
        runs = runs += 1;
        }
    }
    /* ...und zurückgibt das die nächste funktion starten kann */
    finally{return};
}

/* diese funktion lädt alle informationen auf den subseiten zu den spezifischen pflanzen */
async function subsite() {
const response = await fetch('data.json', { cache: 'no-store' });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }

    const data = await response.json();

    /* variablendefinition :) 
    (den teil mit der url id habe ich von stack overflow abgeeschaut) */
    const urlParams = new URLSearchParams(window.location.search);
    const newId = urlParams.get('id');
    const title = (data["name_" + newId]);
    const desc = (data["desc_" + newId]);
    const location = (data["location_" + newId]);
    
    /* führt das nur aus wenn in der adressleiste eine id steht */
    if (newId) {

    /* wenn die id in der adressleiste kleiner oder gleich wie die menge an pflanzen ist dann führt es den codeblock aus */
    if (newId <= Number(data["plantsamount"])) {

    /* variablendefinitionen :3 */
    const element_1 = document.querySelector('.tag');
    const element_2 = document.querySelector('.water-btn');
    const element_3 = document.querySelector('.plimg');
    const element_4 = document.querySelector(".card-title");
    const element_5 = document.querySelector(".card-desc");
    const element_6 = document.querySelector(".time-watered");
    const time = Number(data["lastwatered_" + newId]);
    const element_7 = document.querySelector(".water-needed-at");
    const time1 = Number(data["lastwatered_" + newId]) + Number(data["maxtimeunwatered_" + newId]);
    const element_8 = document.querySelector(".location");

    /* setzt alle teile der html die angepasst sein müssen auf die richtigen texte */
        element_2.dataset.plant = newId;
        element_3.src = "images-webp/" + newId + ".webp";
        element_4.textContent = title;
        element_5.textContent = desc;
        element_1.id = newId;
        element_6.textContent = new Date(time).toLocaleDateString(time);
        element_7.textContent = new Date(time1).toLocaleDateString(time1);
        element_8.textContent = location;

    /* wenn nicht passiert etwas was genau sag ich nicht es gibt auf der webseite noch weiter eastereggs versuche doch alle zu finden 
    der codeblock wurde absichtlich obfuscated wenn du diese normal lesen möchtest frage mich ich habe den normalen nocht */
    } else {
        var _0x4f12 = [
        "\x34\x30\x34", "\x2e\x74\x61\x67", "\x6e\x79\x61\x6e\x69\x7a\x65\x64", 
        "\x2e\x70\x6c\x69\x6d\x67", "\x69\x6d\x61\x67\x65\x73\x2d\x77\x65\x62\x70\x2f\x6e\x79\x61\x6e\x2e\x67\x69\x66", 
        "\x2e\x6c\x6f\x63\x61\x74\x69\x6f\x6e", "\x53\x6f\x6d\x77\x68\x65\x72\x65\x20\x69\x6e\x20\x74\x68\x69\x73\x20\x75\x6e\x69\x76\x65\x72\x73\x65\x20\x3a\x33", 
        "\x2e\x63\x61\x72\x64\x2d\x74\x69\x74\x6c\x65", "\x4e\x79\x61\x6e\x63\x61\x74", 
        "\x2e\x63\x61\x72\x64\x2d\x64\x65\x73\x63", "\x4e\x79\x61\x6e\x2d\x4e\x79\x61\x6e", 
        "\x70\x66\x6c\x61\x6e\x7a\x65\x2e\x68\x74\x6d\x6c\x3f\x69\x64\x3d\x34\x30\x34"
    ];

    if (newId == parseInt(_0x4f12[0])) {
        document.querySelector(_0x4f12[1]).textContent = _0x4f12[2];
        document.querySelector(_0x4f12[3]).src = _0x4f12[4];
        document.querySelector(_0x4f12[5]).textContent = _0x4f12[6];
        document.querySelector(_0x4f12[7]).textContent = _0x4f12[8];
        document.querySelector(_0x4f12[9]).textContent = _0x4f12[10];
        return;
        } else {
            window.location.href = _0x4f12[11];
        }
    }
    }
}

/* diese funktion ist dafür verantwortlich die zeiten miteinander zu vergleichen und die tags richtig anzuzeigen
das man auf der hauptseite direkt sieht welche pflanze gegossen werden muss */
async function tagcalc() {

    /* ddas hier ist wiedereinmal dafür verantwortlich das die funktion auf die anderen warten bis alles geladen ist */
    await cardtxt();

    /* wieder eine variablendefinition die der funktion sagt wie oft es gelaufen ist */
    let runs = 0
    
    const response = await fetch('data.json', { cache: 'no-store' });

    /* diese variable hohlt sich die millisekunden seit der letzten unix epoche um später damit arbeiten zu können */
    const msSinceEpoch = Date.now();

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }

        /* diese linien warten auf die daten aus der json um diese verarbeiten zu können */
        const data = await response.json();
        const plantsamount = data.plantsamount;
        const fixedtime = data.fixedtime;

        /* dieser loop wird so oft ausgeführt wie runs die anzahl planzen nichtr erreicht hat */
        while(plantsamount > runs) {
            runs = runs += 1;

            /* wenn das html element mit der spezifizierten id nicht gefunden werden kann dann macht das programm einfach weiter ohne den rest des codeblocks auszuführen */
            if (!document.getElementById(runs)) continue;

            /* variablendefinition :D */
            const lastwatered = Number(data["lastwatered_"+runs]);
            const maxtimeunwatered = Number(data["maxtimeunwatered_"+runs]);

            /* wenn lastwatered + maximale zeit ohne wasser kleiner ist als millisekunden seit unix epoche dann setz den tag im html auf trocken sonst... */
            if (lastwatered + maxtimeunwatered < msSinceEpoch) {
                document.getElementById(runs).textContent = data.dry;
                document.getElementById(runs).className = data.dryt;
            } else {

                /* ...sonst überprüft das programm ob lastwatered + eine fixe zeit von zwei stunden grösser ist als die millisekunden seit der unix epoche
                dann setzt es den tag auf nass wenn nicht dann... */
                if (lastwatered + fixedtime > msSinceEpoch) {
                    document.getElementById(runs).textContent = data.wet;
                    document.getElementById(runs).className = data.wett;
                } else {

                    /* ...überprüft die gelieferte nummer überhaupt eine nummer ist wenn ja dann gibt es in der konsole einen error aus und macht weiter
                    wenn nicht dann setzt es den tag auf okay */
                    if (isNaN(lastwatered)) {
                        console.log("No data or NaN")
                        continue
                    } else {
                        document.getElementById(runs).textContent = data.fine;
                        document.getElementById(runs).className = data.finet;
                    }
                }
            }
        }
}


/* ich habe von apis und dem ganzen daten bekommen und speicher NOCH keine ahnung deswegen habe ich dieses code snippet von claude */
// Button "Jetzt gegossen": setzt lastwatered_<id> auf dem Server auf die aktuelle Zeit
async function water(button) {
    const id = button.dataset.plant;
    button.disabled = true;

    try {
        // relativer Pfad -> funktioniert auch, wenn die Seite nicht mehr auf localhost läuft
        const response = await fetch('api/water/' + id, { method: 'POST' });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        await tagcalc();
    } catch (error) {
        console.error("Could not save watering:", error);
        alert("Speichern fehlgeschlagen.");
    } finally {
        button.disabled = false;
    }
}

document.querySelectorAll('.water-btn').forEach(button => {
    button.addEventListener('click', () => water(button));
});

/* hier werden die funktioonen nacheinander aufgerufen trotzdem muss ich diese aufeinander warten lassen weil code so schnell läuft */
htmlload();
cardtxt();
subsite();
tagcalc();
