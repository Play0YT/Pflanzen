
# Webseite zur vereinfachung des pflanzengiessämtlis

diese app soll das Pflanzengiessämtli vereinfachen indem es eine übersicht aller pflanzen im büro bietet und auf einen blick einsehbar ist ob diese pflanze gegossen werden muss

in dem javascript habe ich kommentare für besseres verständniss hinzugefügt alle anderen dateien ausser des server.py sind so kurz das man diese nicht wirklich kommentieren muss

---

### Nutzung

__Erstellen neuer Pflanzen:__
1. webseite starten
    1. als erstes muss das github repo mit `git clone https://github.com/Play0YT/Pflanzen` geklont werden sofern git installiert ist wenn nicht muss git zuerst mit 
    `winget install --id Git.Git -e --source winget` auf windows oder
    `sudo apt-get install git` auf linux
    installiert werden

    2. sobald das repo geklont wurde muss man mit `cd Pflanzen` in den ordner navigieren danach kann der server mit `python server.py [PORT]` gestartet werden 

    3. der webserver läuft jetzt auf dem computer und kann mit der adresse des computers und des ports aufgerufen werden

2. Daten anpassen
    1. als erstes muss die menge an pflanzen in der datei `data.json` angepasst werden
    heisst wenn eine neue pflanze angeschafft wurde muss `"plantsamount": 1,` zu der entsprechenden menge an pflanzen geändert werden

    2. als nächstes müssen auch in `data.json` die daten
    `"name_ID":	"Name", "desc_ID": "Beschreibung",` die ID zu einer neuen nummer ändern also wenn in der datei `data.json` `name_30` und `desc_30` steht dann erstellt man zwei neue elemente mit der id 31 
    das gleiche muss auch noch mit dem element `location_ID` gemacht werden welches eine kurze beschreibung des ortes der pflanze beinhaltet
    danach kann noch ein foto der pflanze gemacht und zu einem webp konvertiert werden welches dann auch mit der zugehörigen id als name zb `1.webp` in den ordner `images-webp` abgelegt werden kann

    3. wenn eine pflanze gestorben ist oder sonst etwas muss die beschreibung dieser aus den daten entfernt werden die restlichen elemente angepasst das keine lücken entstehen und die gesamtmenge der pflanzen muss verringert werden 
    zusätzlich sollte das entsprechende bild gelöscht und die namen der anderen bilder angepasst werden

eine einfachere möglichkeit gibt es leider noch nicht könnte aber hinzugefügt werden

dieses dokument ist noch nicht komplett aber fürs erste reicht das mal (: