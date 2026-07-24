// ======================================
// Teneriffa Golf
// excel.js
// Version 1.0.0
// ======================================

async function loadExcel() {

    // Browser-Cache umgehen
    const url = CONFIG.EXCEL_FILE + "?v=" + Date.now();

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `Excel-Datei konnte nicht geladen werden (${response.status})`
        );
    }

    const arrayBuffer = await response.arrayBuffer();

    const workbook = XLSX.read(arrayBuffer, {
        type: "array",
        cellDates: true
    });

    // ======================================
    // Erstes Tabellenblatt verwenden
    // (Blattname = Datum des letzten Imports)
    // ======================================

    const sheetName = workbook.SheetNames[0];

    // Datum anzeigen
    const lastUpdate = document.getElementById("lastUpdate");

    if (lastUpdate) {
        lastUpdate.textContent = "Letzter Import: " + sheetName;
    }

    // Tabellenblatt laden
    const sheet = workbook.Sheets[sheetName];

    if (!sheet) {
        throw new Error(
            `Tabellenblatt "${sheetName}" nicht gefunden.`
        );
    }

    const rows = XLSX.utils.sheet_to_json(sheet);

    console.log("Excel geladen");
    console.log("Stand:", sheetName);
    console.table(rows);

    return rows;

}