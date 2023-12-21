// JavaScript functionalities go here
// Example: Generating a table dynamically
function generateTable() {
    const tableData = [
        { service: "Service 1", price: 100 },
        { service: "Service 2", price: 150 },
        { service: "Service 3", price: 200 }
    ];

    const table = document.getElementById("servicesTable");
    const headerRow = table.insertRow(0);

    // Create table header
    for (const key in tableData[0]) {
        const th = document.createElement("th");
        th.textContent = key;
        headerRow.appendChild(th);
    }

    // Create table rows
    tableData.forEach((rowData, index) => {
        const row = table.insertRow(index + 1);

        for (const key in rowData) {
            const cell = row.insertCell();
            cell.textContent = rowData[key];
        }
    });
}

// Call the function to generate the table on page load
generateTable();
