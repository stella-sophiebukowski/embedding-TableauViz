console.log("NYT Games Dashboard Script loaded");

const viz = document.getElementById("tableauViz");
let workbook;
let vizActiveSheet;
let worksheets = [];

function logWorkbookInformation() {
  workbook = viz.workbook;
  console.log(`Workbook Name: "${workbook.name}"`);

  vizActiveSheet = workbook.activeSheet;

  if (vizActiveSheet) {
    console.log(`Aktiver Sheet Name: "${vizActiveSheet.name}"`);

    // Falls das aktive Sheet ein Dashboard ist, holen wir alle enthaltenen Worksheets
    if (vizActiveSheet.sheetType === "dashboard") {
      worksheets = vizActiveSheet.worksheets;
    } else {
      worksheets = [vizActiveSheet];
    }

    worksheets.forEach((ws) => {
      console.log(`Gefundenes Worksheet: "${ws.name}"`);
    });
  }
}

// Event-Listener nach dem Laden der Visualisierung
viz.addEventListener("firstinteractive", logWorkbookInformation);

// DOM Elemente
const nameInput = document.getElementById("nameInput");
const filterNameButton = document.getElementById("filter_name");
const clearNameFilterButton = document.getElementById("clear_name_filter");
const undoButton = document.getElementById("undo");

// Funktion: Filter auf alle Worksheets anwenden
function applyFilterToAllSheets(fieldName, values, updateType = "replace") {
  worksheets.forEach((ws) => {
    ws.applyFilterAsync(fieldName, values, updateType);
  });
}

// Funktion: Filter von allen Worksheets entfernen
function clearFilterFromAllSheets(fieldName) {
  worksheets.forEach((ws) => {
    ws.clearFilterAsync(fieldName);
  });
}

// Event-Listener: Namensfilter
filterNameButton.addEventListener("click", () => {
  const nameValue = nameInput.value.trim();
  if (nameValue !== "") {
    // Hinweis: Ersetze "Name" durch den exakten Feldnamen aus deinem Tableau-Datensatz, falls dieser abweicht (z. B. "Player", "Spieler" oder "Name")
    applyFilterToAllSheets("Name", [nameValue], "replace");
  }
});

// Event-Listener: Namensfilter löschen
clearNameFilterButton.addEventListener("click", () => {
  nameInput.value = "";
  clearFilterFromAllSheets("Name");
});

// Event-Listener: Undo
undoButton.addEventListener("click", () => {
  viz.undoAsync();
});
