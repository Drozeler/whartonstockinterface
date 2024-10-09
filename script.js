const stockData = [
    // Example stock data
    ["Company A", "A", "NYSE", "Sector A", "Group A", "Industry A", "Sub-Industry A"],
    ["Company B", "B", "NASDAQ", "Sector B", "Group B", "Industry B", "Sub-Industry B"],
    // Add more stock data as needed
];

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
            (companyName === '' || row[0].toLowerCase().includes(companyName)) &&
            (ticker === '' || row[1].toLowerCase().includes(ticker)) &&
            (exchange === '' || row[2].toLowerCase().includes(exchange)) &&
            (gicsSector === '' || row[3].toLowerCase().includes(gicsSector)) &&
            (gicsIndustryGroup === '' || row[4].toLowerCase().includes(gicsIndustryGroup)) &&
            (gicsIndustry === '' || row[5].toLowerCase().includes(gicsIndustry)) &&
            (gicsSubIndustry === '' || row[6].toLowerCase().includes(gicsSubIndustry))
        ) {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${index + 1}</td>
                <td>${row[0]}</td>
                <td>${row[1]}</td>
                <td>${row[2]}</td>
                <td>${row[3]}</td>
                <td>${row[4]}</td>
                <td>${row[5]}</td>
                <td>${row[6]}</td>
            `;
            tableBody.appendChild(newRow);
        }
    });
}
