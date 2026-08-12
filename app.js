console.log("Bach to School - just a bit random text");

// Create some constants and variables that we will use later
// to find out about the structure of the workbook
const viz = document.getElementById("tableauViz");
let workbook;
let vizActiveSheet;
let dashboard;
let listSheets;

// The sheets we want to filter
let saleMap;
let totalSales;
let salesByProduct;
let salesBySegment;

// To make our job easier going forward, we are going to log all the information about the workbook
// Let's make a function that allows us to do this.
function logWorkbookInformation() {
  // Get the workbook
  workbook = viz.workbook;
  console.log(`The workbook name is: "${workbook.name}"`);
}

// Log the workbook information once the viz has become interactive
viz.addEventListener("firstinteractive", logWorkbookInformation);

// To make our job easier going forward, we are going to log all the information about the workbook
// Let's make a function that allows us to do this.
function logWorkbookInformation() {
  // Get the workbook
  workbook = viz.workbook;
  console.log(`The workbook name is: "${workbook.name}"`);

  // Get the array of dashboards and stand-alone sheets
  const sheets = workbook.publishedSheetsInfo || [];
  sheets.forEach((element) => {
    const index = element.index;
    console.log(`The sheet with index [${index}] is: "${element.name}"`);
  });

  // We are normally only interested in interacting with the active sheet (tab), so let's get that
  vizActiveSheet = workbook.activeSheet;
  if (vizActiveSheet) {
    console.log(`The active sheet is "${vizActiveSheet.name}"`);

    // List all of the worksheets within the active sheet
    listSheets = vizActiveSheet.worksheets || [];
    listSheets.forEach((element) => {
      const index = element.index;
      const worksheetName = element.name;
      console.log(`The worksheet with index [${index}] is: "${worksheetName}"`);
    });
  }
  // Assign sheets to the variables created at the top of the script
  saleMap = listSheets.find((ws) => ws.name == "SaleMap");
  totalSales = listSheets.find((ws) => ws.name == "Total Sales");
  salesByProduct = listSheets.find((ws) => ws.name == "SalesbyProduct");
  salesBySegment = listSheets.find((ws) => ws.name == "SalesbySegment");
}

// Log the workbook information once the viz has become interactive
viz.addEventListener("firstinteractive", logWorkbookInformation);

// Tell JS which button to look for
const oregonWashingtonButton = document.getElementById("oregon_and_washington");
const clearFilterButton = document.getElementById("clear_filter");
const undoButton = document.getElementById("undo");

const filterRangeButton = document.getElementById("filter_range");

// Functions that tell JS what to do when buttons are clicked

function oregonWashFunction() {
  //Log what's pressed
  console.log(oregonWashingtonButton.value);

  //Apply the filter to all of the sheets
  saleMap.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  totalSales.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesByProduct.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesBySegment.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
}

//Event listeners that wait for the button click

oregonWashingtonButton.addEventListener("click", oregonWashFunction);

function clearStateFilter() {
  //Log what's pressed
  console.log(clearFilterButton.value);

  //Apply the filter to all of the sheets
  saleMap.clearFilterAsync("State");
  totalSales.clearFilterAsync("State");
  salesByProduct.clearFilterAsync("State");
  salesBySegment.clearFilterAsync("State");
}

function unDo() {
  // Log what's pressed
  console.log(undoButton.value);

  //Undo last action to viz
  viz.undoAsync();
}

clearFilterButton.addEventListener("click", clearStateFilter);
undoButton.addEventListener("click", unDo);

//Adding range filters for map - doesn't make sense to do this for the other charts.
filterRangeButton.addEventListener("click", function filterRangeFunction() {
  //Bringing in min and max values specified in our number inputs on the HTML page.
  // Have to convert these to floats to keep Tableau API happy
  const minValue = parseFloat(document.getElementById("minValue").value);
  const maxValue = parseFloat(document.getElementById("maxValue").value);
  console.log(minValue, maxValue);
  saleMap.applyRangeFilterAsync("SUM(Sales)", {
    min: minValue,
    max: maxValue,
  });
});
