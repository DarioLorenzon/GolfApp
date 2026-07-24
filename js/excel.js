// ======================================
// Teneriffa Golf
// excel.js
// Version 2.3.0
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
    // Letzter Import anzeigen
    // ======================================

    let modifiedDate = null;

    // 1. Excel-Metadaten (bevorzugt)
    if (workbook.Props && workbook.Props.ModifiedDate) {
        modifiedDate = new Date(workbook.Props.ModifiedDate);
    }

    // 2. Falls keine Excel-Metadaten vorhanden sind:
    if (!modifiedDate) {

        const lastModified = response.headers.get("Last-Modified");

        if (lastModified) {
            modifiedDate = new Date(lastModified);
        }
    }

    if (modifiedDate) {

        document.getElementById("lastUpdate").textContent =
            "Letzter Import: " +
            modifiedDate.toLocaleDateString("de-CH", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit"
            });

    } else {

        document.getElementById("lastUpdate").textContent =
            "Letzter Import: unbekannt";

    }

    // ======================================
    // Tabellenblatt laden
    // ======================================

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