// ======================================
// Teneriffa Golf
// excel.js
// Version 2.2.0
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

    const sheet = workbook.Sheets[CONFIG.SHEET_NAME];

    if (!sheet) {
        throw new Error(
            `Tabellenblatt "${CONFIG.SHEET_NAME}" nicht gefunden.`
        );
    }

    const rows = XLSX.utils.sheet_to_json(sheet);

    console.log("Excel geladen");
    console.table(rows);

    return rows;

}