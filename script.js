async function loadJsonVariables() {
    try {
        const response = await fetch('data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                return { 
                maxtimeunwatered: Number(data.maxtimeunwatered), 
                lastwatered: Number(data.lastwatered) 
                };

            } catch (error) {
                console.error("Could not fetch the JSON variables:", error);
                document.getElementById('title').textContent = "Failed to load data.";
            }
        }

async function tagcalc() {
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

tagcalc();