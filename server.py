"diese datei wurde spezifisch von claude generiert bei bedarf / möglichkeit werde ich diese selber schreiben mein verständniss von datenbanken usw ist momentan nicht tief genug um ein solches script selber zu schreiben"


"""Kleiner Webserver für das Pflanzengiessämtli.

Liefert die statischen Dateien aus und bietet zusätzlich:
    POST /api/water/<id>  ->  setzt "lastwatered_<id>" in data.json auf die aktuelle Zeit (ms)

Starten:  python server.py            (Port 8080)
          python server.py 80         (anderer Port)
"""

import json
import os
import re
import sys
import threading
import time
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "data.json")
WATER_PATH = re.compile(r"^/api/water/(\d+)$")
data_lock = threading.Lock()


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def end_headers(self):
        # data.json soll nie aus dem Browser-Cache kommen
        if self.path.split("?")[0] == "/data.json":
            self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_POST(self):
        match = WATER_PATH.match(self.path)
        if not match:
            self.send_json(404, {"error": "Not found"})
            return

        plant_id = int(match.group(1))
        now_ms = int(time.time() * 1000)

        with data_lock:
            with open(DATA_FILE, encoding="utf-8") as f:
                data = json.load(f)

            if not 1 <= plant_id <= int(data.get("plantsamount", 0)):
                self.send_json(400, {"error": "Unbekannte Pflanze"})
                return

            data[f"lastwatered_{plant_id}"] = now_ms

            # erst in eine Temp-Datei schreiben, dann ersetzen -> data.json nie halb geschrieben
            tmp_file = DATA_FILE + ".tmp"
            with open(tmp_file, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=4, ensure_ascii=False)
            os.replace(tmp_file, DATA_FILE)

        self.send_json(200, {"id": plant_id, "lastwatered": now_ms})

    def send_json(self, status, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
    # 0.0.0.0 = auch von anderen Geräten im Netz erreichbar, nicht nur localhost
    server = ThreadingHTTPServer(("0.0.0.0", port), Handler)
    print(f"Server läuft auf Port {port}")
    server.serve_forever()
