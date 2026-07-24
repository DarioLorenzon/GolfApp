// ======================================
// Hilfsfunktionen
// ======================================

function formatDate(value) {

    const date = value instanceof Date ? value : new Date(value);

    if (isNaN(date)) {
        return value;
    }

return date.toLocaleDateString("de-CH", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit"
});

}



function formatTime(value) {

    if (value instanceof Date) {

        return value.toLocaleTimeString("de-CH", {
            hour: "2-digit",
            minute: "2-digit"
        });

    }

    if (typeof value === "string") {

        return value.substring(0, 5);

    }

    return value;

}