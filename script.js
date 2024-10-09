function filterStocks() {
    console.log("Filter button clicked."); // Debugging statement
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

    // Log the stock data being filtered
    console.log("Filtering stock data:", stockData);

    // Filter stock data
    stockData.forEach((row, index) => {
        console.log("Processing row:", row); // Debugging statement
        if (
            (companyName === '' || row["Company Name"].toLowerCase().includes(companyName)) &&
            (ticker === '' || row["Ticker"].toLowerCase().includes(ticker)) &&
            (exchange === '' || row["Exchange"].toLowerCase().includes(exchange)) &&
            (gicsSector === '' || row["GICS Sector"].toLowerCase().includes(gicsSector)) &&
            (gicsIndustryGroup === '' || row["GICS Industry Group"].toLowerCase().includes(gicsIndustryGroup)) &&
            (gicsIndustry === '' || row["GICS Industry"].toLowerCase().includes(gicsIndustry)) &&
            (gicsSubIndustry === '' || row["GICS Sub-Industry"].toLowerCase().includes(gicsSubIndustry))
        ) {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${index + 1}</td>
                <td>${row["Company Name"]}</td>
                <td>${row["Ticker"]}</td>
                <td>${row["Exchange"]}</td>
                <td>${row["GICS Sector"]}</td>
                <td>${row["GICS Industry Group"]}</td>
                <td>${row["GICS Industry"]}</td>
                <td>${row["GICS Sub-Industry"]}</td>
            `;
            tableBody.appendChild(newRow);
        }
    });
}
