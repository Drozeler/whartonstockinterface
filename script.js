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
        if (
            (companyName === '' || row.company_name.toLowerCase().includes(companyName)) &&
            (ticker === '' || row.ticker.toLowerCase().includes(ticker)) &&
            (exchange === '' || row.exchange.toLowerCase().includes(exchange)) &&
            (gicsSector === '' || row.gics_sector.toLowerCase().includes(gicsSector)) &&
            (gicsIndustryGroup === '' || row.gics_industry_group.toLowerCase().includes(gicsIndustryGroup)) &&
            (gicsIndustry === '' || row.gics_industry.toLowerCase().includes(gicsIndustry)) &&
            (gicsSubIndustry === '' || row.gics_sub_industry.toLowerCase().includes(gicsSubIndustry))
        ) {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${index + 1}</td>
                <td>${row.company_name}</td>
                <td>${row.ticker}</td>
                <td>${row.exchange}</td>
                <td>${row.gics_sector}</td>
                <td>${row.gics_industry_group}</td>
                <td>${row.gics_industry}</td>
                <td>${row.gics_sub_industry}</td>
            `;
            tableBody.appendChild(newRow);
        }
    });
}
