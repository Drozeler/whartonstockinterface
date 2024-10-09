let stockData = []; // This will hold the stock data

// Fetch the stock data from the JSON file
fetch('stocks.json')
    .then(response => response.json())
    .then(data => {
        stockData = data;
    })
    .catch(error => console.error('Error loading stock data:', error));

// Filter stocks function
function filterStocks() {
    // Get filter values
    const companyName = document.getElementById("company-name").value.toLowerCase();
    const ticker = document.getElementById("ticker").value.toLowerCase();
    const exchange = document.getElementById("exchange").value.toLowerCase();
    const gicsSector = document.getElementById("gics-sector").value.toLowerCase();
    const gicsIndustryGroup = document.getElementById("gics-industry-group").value.toLowerCase();
    const gicsIndustry = document.getElementById("gics-industry").value.toLowerCase();
    const gicsSubIndustry = document.getElementById("gics-sub-industry").value.toLowerCase();

    // Get table body
    const tableBody = document.querySelector("#stockTable tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    // Filter stock data
    stockData.forEach((row, index) => {
        // Log the row for debugging
        console.log(row);

        if (
            (companyName === '' || row["Company Name"].toLowerCase().includes(companyName)) &&
            (ticker === '' || row.Ticker.toLowerCase().includes(ticker)) &&
            (exchange === '' || row.Exchange.toLowerCase().includes(exchange)) &&
            (gicsSector === '' || row["GICS Sector"].toLowerCase().includes(gicsSector)) &&
            (gicsIndustryGroup === '' || row["GICS Industry Group"].toLowerCase().includes(gicsIndustryGroup)) &&
            (gicsIndustry === '' || row["GICS Industry"].toLowerCase().includes(gicsIndustry)) &&
            (gicsSubIndustry === '' || row["GICS Sub-Industry"].toLowerCase().includes(gicsSubIndustry))
        ) {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${index + 1}</td>
                <td>${row["Company Name"]}</td>
                <td>${row.Ticker}</td>
                <td>${row.Exchange}</td>
                <td>${row["GICS Sector"]}</td>
                <td>${row["GICS Industry Group"]}</td>
                <td>${row["GICS Industry"]}</td>
                <td>${row["GICS Sub-Industry"]}</td>
            `;
            tableBody.appendChild(newRow);
        }
    });
}
