// ======================================
// Teneriffa Golf
// table.js
// Version 1.0.0
// ======================================

function createFlights(rows) {

    const flights = new Map();

    rows.forEach(row => {

        const date = formatDate(row.Date);
        const time = formatTime(row.Time);
        const course = row.Ort;

        const key = `${date}|${time}|${course}`;

        if (!flights.has(key)) {

            flights.set(key, {
                date,
                time,
                course,
                players: []
            });

        }

        flights.get(key).players.push({
            code: row.Kürzel,
            firstName: row.Vorname,
            lastName: row.Name
        });

    });

    // Spieler alphabetisch sortieren
    for (const flight of flights.values()) {

        flight.players.sort((a, b) =>
            a.code.localeCompare(b.code)
        );

    }

    // Flights nach Datum/Zeit sortieren
    const result = [...flights.values()];

    result.sort((a, b) => {

        const dateA = a.date.split(".").reverse().join("-");
        const dateB = b.date.split(".").reverse().join("-");

        return `${dateA} ${a.time}`.localeCompare(
            `${dateB} ${b.time}`
        );

    });

    return result;

}



// ======================================
// Tabelle anzeigen
// ======================================

function renderTable(flights) {

    const table = document.getElementById("teeTable");

    table.innerHTML = `
        <thead>
            <tr>
                <th>Datum</th>
                <th>Zeit</th>
                <th>Ort</th>
                <th>Spieler</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tbody = table.querySelector("tbody");

    flights.forEach(flight => {

        const tr = document.createElement("tr");

        const players = flight.players.map((player, index) => {

            const separator =
                index < flight.players.length - 1
                    ? `<span class="player-separator"> · </span>`
                    : "";

            return `
                <span class="player-link"
                      title="${player.firstName} ${player.lastName}"
                      onclick="showPlayer('${player.code}')">
                    ${player.code}
                </span>${separator}
            `;

        }).join("");

        tr.innerHTML = `
            <td>${flight.date}</td>
            <td>${flight.time}</td>
            <td>${flight.course}</td>
            <td>${players}</td>
        `;

        tbody.appendChild(tr);

    });

}