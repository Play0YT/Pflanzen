async function htmlload() {
return fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const numberOfCopies = data.plantsamount;
    const container = document.getElementById('cards-grid');
    let finalHTML = '';

    for (let i = 1; i <= numberOfCopies; i++) {
      
      finalHTML += `
        <div class="card">
              <img id="730" src="images-webp/${i}.webp" width="150">
            <div class="card-text">
              <h3 id="8${i}" class="card-title">Fehler beim laden</h3>
                <p id="9${i}" class="card-desc">Fehler beim laden</p>
              <div class="card-footer">
                <span class="tag" id="${i}">No Data</span>
                <a class="card-link" href="pflanze.html?id=${i}">Anzeigen</a>
              </div>
            </div>
          </div>
      `;
    }

    container.innerHTML = finalHTML;
    return;
})
.catch(error => console.error('Error loading JSON:', error));
}


async function cardtxt() {
    await htmlload();
    let runs = 1
    const response = await fetch('data.json', { cache: 'no-store' });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
        const data = await response.json();
        while (runs < Number(data["plantsamount"]) + 1) {
            if (runs < Number(data["plantsamount"]) + 1) {
                console.log(runs)
                console.log((data["name_" + runs]));
                console.log((data["desc_" + runs]));
                document.getElementById("8" + runs).textContent = (data["name_" + runs]);
                document.getElementById("9" + runs).textContent = (data["desc_" + runs]);
            }
        runs = runs += 1;
        }
}

async function subsite() {
const response = await fetch('data.json', { cache: 'no-store' });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }

    const data = await response.json();

    const urlParams = new URLSearchParams(window.location.search);
    const newId = urlParams.get('id');
    const title = (data["name_" + newId]);
    const desc = (data["desc_" + newId]);

    if (newId) {
    const element_1 = document.querySelector('.tag');
    const element_2 = document.querySelector('.water-btn');
    const element_3 = document.querySelector('.plimg');
    const element_4 = document.querySelector(".card-title");
    const element_5 = document.querySelector(".card-desc");

        element_2.dataset.plant = newId;
        element_3.src = "images-webp/" + newId + ".webp";
        element_4.textContent = title;
        element_5.textContent = desc;
        element_1.id = newId;
    }
}

async function tagcalc() {
    await cardtxt();
    let runs = 0
    const response = await fetch('data.json', { cache: 'no-store' });
    const msSinceEpoch = Date.now();

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }

        const data = await response.json();
        const plantsamount = data.plantsamount;
        const fixedtime = data.fixedtime;

        while(plantsamount > runs) {
            runs = runs += 1;
            if (!document.getElementById(runs)) continue;
            const lastwatered = Number(data["lastwatered_"+runs]);
            const maxtimeunwatered = Number(data["maxtimeunwatered_"+runs]);

            if (lastwatered + maxtimeunwatered < msSinceEpoch) {
                document.getElementById(runs).textContent = data.dry;
                document.getElementById(runs).className = data.dryt;
            } else {

                if (lastwatered + fixedtime > msSinceEpoch) {
                    document.getElementById(runs).textContent = data.wet;
                    document.getElementById(runs).className = data.wett;
                } else {

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

htmlload();
cardtxt();
subsite();
tagcalc();
