document.addEventListener('DOMContentLoaded', function () {
    // Function to generate the table dynamically
    function generateTable() {
    // Check if the table element with ID "servicesTable" exists
    const table = document.getElementById("servicesTable");

    if (!table) {
        console.error("Table element not found");
        return;
    }


    const tableData = [
        { 
            service: "Gallery Basic Services",
            price: 250,
            description: "Our basic gallery services include image hosting, basic customization, and access to a wide range of stock photos.",
            image: "img/gallery_basic.jpg"
        },
        { 
            service: "Gallery Basic Premium Services",
            price: 399,
            description: "Upgrade to our premium package for additional features, including advanced customization options and priority support.",
            image: "img/gallery_premium.jpg"
        },
        { 
            service: "Gallery Ultimate Services",
            price: 450,
            description: "Experience the ultimate gallery services with unlimited storage, premium support, and exclusive access to premium stock photos.",
            image: "img/gallery_ultimate.jpg"
        },
        { 
            service: "Gallery Deluxe Services",
            price: 650,
            description: "Deluxe services offer a combination of advanced features, custom branding, and personalized assistance to showcase your gallery uniquely.",
            image: "img/gallery_deluxe.jpg"
        },
        { 
            service: "Gallery Platinum Services",
            price: 900,
            description: "Our platinum services provide top-tier solutions, including VIP support, exclusive features, and a personalized gallery experience.",
            image: "img/gallery_platinum.jpg"
        }
    ];
    const headerRow = table.insertRow(0);

    // Create table header
 const headerLabels = ['Service', 'Price', 'Description', 'Image', 'Action'];
    headerLabels.forEach(label => {
        const th = document.createElement("th");
        th.textContent = label;
        headerRow.appendChild(th);
    });

     // Create table rows
    tableData.forEach((rowData, index) => {
        const row = table.insertRow(index + 1);

        for (const key in rowData) {
            const cell = row.insertCell();

            // If the key is 'Image', create an image element
            if (key === 'image') {
                const img = document.createElement("img");
                img.src = rowData[key];
                img.alt = `${rowData.service} Image`;
                img.classList.add("service-image");
                cell.appendChild(img);
            } else {
                // For other keys, set text content
                cell.textContent = rowData[key];
            }
        }

        // Add Buy button to each row
        const buyCell = row.insertCell();
        const buyButton = document.createElement("button");
        buyButton.textContent = "Buy";
        buyButton.classList.add("buy-button");
        buyButton.addEventListener("click", function () {
            addToBasket(rowData.service, rowData.price);
        });
        buyCell.appendChild(buyButton);
    });
}

    // Function to find a row in the basket based on service name
    function findRowInBasket(service) {
        const basketTable = document.getElementById("basketTable");
        for (let i = 1; i < basketTable.rows.length; i++) {
            const row = basketTable.rows[i];
            if (row.cells[0].textContent === service) {
                return row;
            }
        }
        return null;
    }

// Function to add selected services to the basket
function addToBasket(service, price) {
    const basket = document.getElementById("basket");
    const basketTable = document.getElementById("basketTable");
    const existingRow = findRowInBasket(service);

    if (existingRow) {
        // Increment quantity and update total price
        const quantityCell = existingRow.cells[1];
        const quantity = parseInt(quantityCell.textContent, 10) + 1;
        quantityCell.textContent = quantity;

        const totalCell = existingRow.cells[3];
        const totalPrice = quantity * price;
        totalCell.textContent = `$${totalPrice.toFixed(2)}`;
    } else {
        // Add a new row to the basket
        const row = basketTable.insertRow(-1);
        const cells = [
            { text: service, className: '' },
            { text: '1', className: 'quantity-input' },
            { text: `$${price.toFixed(2)}`, className: '' },
            { text: `$${price.toFixed(2)}`, className: '' },
            { text: '', className: '' }
        ];

        cells.forEach((cellData, index) => {
            const cell = row.insertCell(index);
            cell.textContent = cellData.text;

            if (cellData.className) {
                cell.classList.add(cellData.className);
            }
        });

        // Add Remove button to the last cell
        const removeCell = row.cells[4];
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-button");
        removeButton.addEventListener("click", function () {
            removeFromBasket(row, price);
        });
        removeCell.appendChild(removeButton);
    }

    // Update the total after processing the new entry
    updateTotal();
     // Save basket information to a cookie
        saveBasketToCookie();
}
    // Function to remove a row from the basket
    function removeFromBasket(row, price) {
        const basketTable = document.getElementById("basketTable");
        basketTable.deleteRow(row.rowIndex);

        // Update the total
        updateTotal();
         // Save basket information to a cookie
        saveBasketToCookie();
    }

// Function to update the total in the basket
function updateTotal() {
    const basketTable = document.getElementById("basketTable");
    let total = 0;

    // Loop through rows starting from 1 to exclude header and total rows
    for (let i = 1; i < basketTable.rows.length; i++) {
        const row = basketTable.rows[i];
        const totalPriceCell = row.cells[3];

        // Check if totalPriceCell is defined and not empty
        if (totalPriceCell && totalPriceCell.textContent.trim() !== '') {
            const totalPrice = parseFloat(totalPriceCell.textContent.slice(1));
            total += totalPrice;
        }
    }

    // Update the total in the "Total" row
    const totalRow = document.getElementById("calculateRow");
    totalRow.cells[1].textContent = `$${total.toFixed(1)}`;
}


    // Function to calculate the bill and display it in the console
    function calculateBill() {
        const basketTable = document.getElementById("basketTable");
        let total = 0;

        for (let i = 1; i < basketTable.rows.length; i++) {
            const row = basketTable.rows[i];
            const totalPriceCell = row.cells[3];
            if (totalPriceCell) {
                const totalPrice = parseFloat(totalPriceCell.textContent.replace(/[^\d.-]/g, ''));
                total += totalPrice;
            }
        }

        console.log("---- Bill ----");
        for (let i = 1; i < basketTable.rows.length; i++) {
            const row = basketTable.rows[i];
            const service = row.cells[0].textContent;
            const quantity = row.cells[1].textContent;
            const totalPrice = row.cells[3].textContent;
            console.log(`${service} x${quantity}: ${totalPrice}`);
        }

        console.log("---------------");
        console.log(`Total: $${total.toFixed(2)}`);
    }

    // Call the function to generate the table on page load
    generateTable();

    const removeAllButton = document.getElementById("removeAllButton");

    if (removeAllButton) {
        removeAllButton.addEventListener("click", function () {
            removeAllFromBasket();
        });
    } else {
        console.error("Element with ID 'removeAllButton' not found.");
    }
  // Function to load basket information from a cookie
    function loadBasketFromCookie() {
        const basketTable = document.getElementById("basketTable");
        const basketJson = getCookie('basketData');

        if (basketJson) {
            const basketData = JSON.parse(basketJson);

            // Clear existing rows from the basket table
   while (basketTable.rows.length > 3) {
            basketTable.deleteRow(1);
        }

            // Populate the basket table with data from the cookie
            basketData.forEach(data => {
                const row = basketTable.insertRow(-1);
                const cells = [
                    { text: data.service, className: '' },
                    { text: data.quantity, className: 'quantity-input' },
                    { text: data.unitPrice, className: '' },
                    { text: data.totalPrice, className: '' },
                    { text: '', className: '' }
                ];

                cells.forEach((cellData, index) => {
                    const cell = row.insertCell(index);
                    cell.textContent = cellData.text;

                    if (cellData.className) {
                        cell.classList.add(cellData.className);
                    }
                });

                // Add Remove button to the last cell
                const removeCell = row.cells[4];
                const removeButton = document.createElement("button");
                removeButton.textContent = "Remove";
                removeButton.classList.add("remove-button");
                removeButton.addEventListener("click", function () {
                    removeFromBasket(row, data.totalPrice);
                });
                removeCell.appendChild(removeButton);
            });

            // Update the total after loading data from the cookie
            updateTotal();
             // Save basket information to a cookie
        saveBasketToCookie();
        }
    }
  // Function to remove all rows from the basket
    function removeAllFromBasket() {
        const basketTable = document.getElementById("basketTable");

        // Remove all rows except the header and "Total" rows
        for (let i = basketTable.rows.length-1; i > 1; i--) {
            basketTable.deleteRow(i);
        }

        // Update the total
        updateTotal();

        // Save basket information to a cookie after removing all items
        saveBasketToCookie();
    }

    // Load basket information from cookie on page load
    loadBasketFromCookie();

    // Function to set a cookie
    function setCookie(name, value) {
        document.cookie = `${name}=${value}; path=/`;
    }

    // Function to get a cookie value by name
    function getCookie(name) {
        const cookies = document.cookie.split('; ');
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === name) {
                return cookieValue;
            }
        }
        return null;
    }

      // Function to save basket information to a cookie
    function saveBasketToCookie() {
        const basketTable = document.getElementById("basketTable");
        const basketData = [];

        // Loop through rows starting from 1 to exclude header and total rows
        for (let i = 3; i < basketTable.rows.length; i++) {
            const row = basketTable.rows[i];
            const service = row.cells[0].textContent;
            const quantity = row.cells[1].textContent;
            const unitPrice = row.cells[2].textContent;
            const totalPrice = row.cells[3].textContent;
            basketData.push({ service, quantity,unitPrice, totalPrice });
        }

        // Convert basketData to JSON and save to a cookie
        const basketJson = JSON.stringify(basketData);
        setCookie('basketData', basketJson);
    }
});

