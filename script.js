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
    // Get the filename from the input, defaulting to 'filtered_stocks' if not provided
    const filename = document.getElementById('filename').value.trim() || 'filtered_stocks'; 
    const rows = document.querySelectorAll("#stockTable tbody tr");
    
    // Log the number of rows to be downloaded
    console.log("Rows to download:", rows.length);

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

    // Create a Blob and download it
    const blob = new Blob([csvData.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`; // Use the filename from the input
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Clean up
}

// Filter ETFs function
function filterETFs() {
    console.log("filterETFs function called");
    // Get filter values
    const etfName = document.getElementById("etf-name").value.toLowerCase();
    const etfTicker = document.getElementById("etf-ticker").value.toLowerCase();
    const assetClass = document.getElementById("asset-class").value.toLowerCase();
    const marketCap = document.getElementById("market-cap").value.toLowerCase();
    const strategy = document.getElementById("strategy").value.toLowerCase();
    const industryFocus = document.getElementById("industry-focus").value.toLowerCase();
    const geoFocus = document.getElementById("geo-focus").value.toLowerCase();
    const activelyManaged = document.getElementById("actively-managed").value.toLowerCase();

    // Get table body for ETFs
    const etfTableBody = document.querySelector("#etfTable tbody");
    etfTableBody.innerHTML = ""; // Clear existing rows

    console.log("Filtering ETFs...");
    console.log("Total ETFs before filtering:", etfData.length); // Log total ETFs

    // Filter ETF data
    etfData.forEach((row, index) => {
        console.log('ETF Row Data:', row); // Log each ETF row

        // Check for undefined properties before filtering
        const etfNameMatch = row["Name"] ? row["Name"].toLowerCase().includes(etfName) : false;
        const tickerMatch = row.Ticker ? row.Ticker.toLowerCase().includes(etfTicker) : false;
        const assetClassMatch = row["Fund Asset Class Focus"] ? row["Fund Asset Class Focus"].toLowerCase().includes(assetClass) : false;
        const marketCapMatch = row["Fund Market Cap Focus"] ? row["Fund Market Cap Focus"].toLowerCase().includes(marketCap) : false;
        const strategyMatch = row.Strategy ? row.Strategy.toLowerCase().includes(strategy) : false;
        const industryFocusMatch = row["Fund Industry Focus"] ? row["Fund Industry Focus"].toLowerCase().includes(industryFocus) : false;
        const geoFocusMatch = row["Fund Geographical Focus"] ? row["Fund Geographical Focus"].toLowerCase().includes(geoFocus) : false;
        const activelyManagedMatch = row["Actively Managed?"] ? row["Actively Managed?"].toLowerCase().includes(activelyManaged) : false;

        if (
            (etfName === '' || etfNameMatch) &&
            (etfTicker === '' || tickerMatch) &&
            (assetClass === '' || assetClassMatch) &&
            (marketCap === '' || marketCapMatch) &&
            (strategy === '' || strategyMatch) &&
            (industryFocus === '' || industryFocusMatch) &&
            (geoFocus === '' || geoFocusMatch) &&
            (activelyManaged === '' || activelyManagedMatch)
        ) {
            console.log("ETF Match found:", row); // Log ETF matches
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${index + 1}</td>
                <td>${row["Name"]}</td>
                <td>${row.Ticker}</td>
                <td>${row["Fund Asset Class Focus"]}</td>
                <td>${row["Fund Market Cap Focus"]}</td>
                <td>${row.Strategy}</td>
                <td>${row["Fund Industry Focus"]}</td>
                <td>${row["Fund Geographical Focus"]}</td>
                <td>${row["Actively Managed?"]}</td>
            `;
            etfTableBody.appendChild(newRow);
        }
    });

    console.log("Filtered ETFs count:", etfTableBody.children.length); // Log count of rows added
}
// Download filtered ETFs as CSV
function downloadETFCsv() {
    // Get the filename from the input, defaulting to 'filtered_etfs' if not provided
    const filename = document.getElementById('etf-filename').value.trim() || 'filtered_etfs'; 
    const rows = document.querySelectorAll("#etfTable tbody tr");
    
    // Log the number of rows to be downloaded
    console.log("Rows to download:", rows.length);

    // Prepare CSV data
    const csvData = [];
    const headers = ["Row", "Name", "Ticker", "Fund Asset Class Focus", "Fund Market Cap Focus", "Strategy", "Fund Industry Focus", "Fund Geographical Focus", "Actively Managed?"];
    csvData.push(headers.join(',')); // Add headers to CSV

    rows.forEach((row) => {
        const rowData = [];
        row.querySelectorAll("td").forEach(cell => {
            rowData.push(cell.innerText);
        });
        csvData.push(rowData.join(',')); // Add row data to CSV
    });

    // Create a Blob and download it
    const blob = new Blob([csvData.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`; // Use the filename from the input
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Clean up
}

document.getElementById('etfFilterBtn').onclick = filterETFs; // ETF filter button
document.getElementById('etfDownloadBtn').onclick = downloadETFCsv; // ETF download button








