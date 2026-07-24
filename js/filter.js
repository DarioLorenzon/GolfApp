// ======================================
// Teneriffa Golf
// filter.js
// Version 2.3.1
// ======================================

let selectedCourse = "Alle";
let playerSearch = "";

function createFilters(rows) {

    // aktuelle Werte merken
    const currentCourse = selectedCourse;
    const currentSearch = playerSearch;

    // Golfplätze ermitteln
    const courses = [...new Set(rows.map(r => r.Ort))].sort();

    // Dropdown füllen
    const courseFilter = document.getElementById("courseFilter");

    courseFilter.innerHTML =
        `<option value="Alle">Alle</option>` +
        courses.map(course =>
            `<option value="${course}">${course}</option>`
        ).join("");

    // Werte wiederherstellen
    courseFilter.value = currentCourse;

    const playerInput = document.getElementById("playerSearch");
    playerInput.value = currentSearch;

    // alte Event-Handler entfernen
    courseFilter.onchange = null;
    playerInput.oninput = null;

    // neue Event-Handler
    courseFilter.addEventListener("change", e => {

        selectedCourse = e.target.value;
        applyFilters();

    });

    playerInput.addEventListener("input", e => {

        playerSearch = e.target.value.trim().toLowerCase();
        applyFilters();

    });

}