let stockData = []; // This will hold the stock data

// Fetch the stock data from the JSON file
fetch('stocks.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        stockData = data;
        console.log('Stock Data:', stockData); // Log the fetched data
    })
    .catch(error => console.error('Error loading stock data:', error));

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
    // Attach event listeners to buttons
    document.getElementById('filterBtn').onclick = filterStocks;
    document.getElementById('downloadBtn').onclick = downloadCSV;
});

// Filter stocks function
function filterStocks() {
    console.log("filterStocks function called");
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

    console.log("Filtering stocks...");
    console.log("Total stocks before filtering:", stockData.length); // Log total stocks

    // Filter stock data
    stockData.forEach((row, index) => {
        console.log('Row Data:', row); // Log each row

        // Check for undefined properties before filtering
        const companyNameMatch = row["Company Name"] ? row["Company Name"].toLowerCase().includes(companyName) : false;
        const tickerMatch = row.Ticker ? row.Ticker.toLowerCase().includes(ticker) : false;
        const exchangeMatch = row.Exchange ? row.Exchange.toLowerCase().includes(exchange) : false;
        const gicsSectorMatch = row["GICS Sector"] ? row["GICS Sector"].toLowerCase().includes(gicsSector) : false;
        const gicsIndustryGroupMatch = row["GICS Industry Group"] ? row["GICS Industry Group"].toLowerCase().includes(gicsIndustryGroup) : false;
        const gicsIndustryMatch = row["GICS Industry"] ? row["GICS Industry"].toLowerCase().includes(gicsIndustry) : false;
        const gicsSubIndustryMatch = row["GICS Sub-Industry"] ? row["GICS Sub-Industry"].toLowerCase().includes(gicsSubIndustry) : false;

        if (
            (companyName === '' || companyNameMatch) &&
            (ticker === '' || tickerMatch) &&
            (exchange === '' || exchangeMatch) &&
            (gicsSector === '' || gicsSectorMatch) &&
            (gicsIndustryGroup === '' || gicsIndustryGroupMatch) &&
            (gicsIndustry === '' || gicsIndustryMatch) &&
            (gicsSubIndustry === '' || gicsSubIndustryMatch)
        ) {
            console.log("Match found:", row); // Log matches
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

    console.log("Filtered stocks count:", tableBody.children.length); // Log count of rows added
}

function downloadCSV() {
    const filename = document.getElementById('filename').value || 'filtered_stocks'; // Default name if empty
    const rows = document.querySelectorAll("#stockTable tbody tr");
    console.log("Rows to download:", rows.length); // Check how many rows are selected

    // Prepare CSV data
    const csvData = [];
    const headers = ["Row", "Company Name", "Ticker", "Exchange", "GICS Sector", "GICS Industry Group", "GICS Industry", "GICS Sub-Industry"];
    csvData.push(headers.join(',')); // Add headers to CSV

    rows.forEach((row) => {
        const rowData = [];
        row.querySelectorAll("td").forEach(cell => {
            rowData.push(cell.innerText);
        });
        csvData.push(rowData.join(',')); // Add row data to CSV
    });

    // Check CSV data before creating Blob
    console.log("CSV Data:", csvData);

    // Create a Blob and download it
    const blob = new Blob([csvData.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`; 
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Clean up
}
