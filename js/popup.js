// ======================================
// Teneriffa Golf
// popup.js
// Version 1.0.0
// ======================================


function showPlayer(playerCode) {

    const modal = document.getElementById("playerModal");
    const title = document.getElementById("modalTitle");
    const body = document.getElementById("modalBody");

    // Alle Flights des Spielers suchen
    const flights = allFlights.filter(flight =>
        flight.players.some(player => player.code === playerCode)
    );

    if (flights.length === 0) {
        return;
    }

    // Sicherheitshalber chronologisch sortieren
    flights.sort((a, b) => {

        const keyA =
            a.date.split(".").reverse().join("-") + " " + a.time;

        const keyB =
            b.date.split(".").reverse().join("-") + " " + b.time;

        return keyA.localeCompare(keyB);

    });

    // Spielerinformationen
    const player = flights
        .flatMap(f => f.players)
        .find(p => p.code === playerCode);

    title.textContent =
        `${player.firstName} ${player.lastName} (${player.code})`;

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Datum</th>
                    <th>Zeit</th>
                    <th>Ort</th>
                </tr>
            </thead>
            <tbody>
    `;

    flights.forEach(flight => {

        html += `
            <tr>
                <td>${flight.date}</td>
                <td>${flight.time}</td>
                <td>${flight.course}</td>
            </tr>
        `;

    });

    html += `
            </tbody>
        </table>

        <br>

        <strong>${flights.length}</strong> Tee Time${flights.length === 1 ? "" : "s"}
    `;

    body.innerHTML = html;

    modal.style.display = "block";

}

function closePlayerModal() {

    document.getElementById("playerModal").style.display = "none";

}

// Klick auf Hintergrund
window.addEventListener("click", function (event) {

    const modal = document.getElementById("playerModal");

    if (event.target === modal) {
        closePlayerModal();
    }

});

// ESC-Taste
document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closePlayerModal();
    }

});