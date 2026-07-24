// ======================================
// Teneriffa Golf
// app.js
// Version 2.3.1
// ======================================

let allRows = [];
let allFlights = [];

async function init() {

    try {

        await loadData();

        document.getElementById("loading").style.display = "none";
        document.getElementById("content").style.display = "block";

    } catch (error) {

        console.error(error);

        document.getElementById("loading").innerHTML =
            "❌ Fehler beim Laden der Golfdaten.";

    }

}

async function loadData() {

    // aktuelle Filter merken
    const currentCourse = selectedCourse;
    const currentSearch = playerSearch;

    allRows = await loadExcel();

    createFilters(allRows);

    allFlights = createFlights(allRows);

    // Filter wiederherstellen
    selectedCourse = currentCourse;
    playerSearch = currentSearch;

    applyFilters();

}


function applyFilters() {

    let flights = [...allFlights];

    // Golfplatz
    if (selectedCourse !== "Alle") {

        flights = flights.filter(f =>
            f.course === selectedCourse
        );

    }

    // Spieler
    if (playerSearch !== "") {

        flights = flights.filter(flight =>

            flight.players.some(player =>

                player.code.toLowerCase().includes(playerSearch) ||
                player.firstName.toLowerCase().includes(playerSearch) ||
                player.lastName.toLowerCase().includes(playerSearch)

            )

        );

    }

    renderTable(flights);

}

init();