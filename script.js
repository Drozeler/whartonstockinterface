// Initialize arrays to hold stock and ETF data
let stockData = []; 
let etfData = []; 

// Fetch stock data from the JSON file
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

// Fetch ETF data from the JSON file
fetch('etfs.json') // Ensure you have an 'etfs.json' file
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        etfData = data; // Assign fetched data to etfData
        console.log('ETF Data:', etfData); // Log the fetched ETF data
    })
    .catch(error => console.error('Error loading ETF data:', error));

// Function to open the tab
function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all tabcontent elements and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all tablinks and remove the active class
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
    // Attach event listeners to buttons
    document.getElementById('stockTab').onclick = function(event) { openTab(event, 'Stocks'); };
document.getElementById('etfTab').onclick = function(event) { openTab(event, 'ETFs'); };
    document.getElementById('filterBtn').onclick = filterStocks;
    document.getElementById('downloadBtn').onclick = downloadCSV;
    document.getElementById('etfFilterBtn').onclick = filterETFs; // ETF filter button
    document.getElementById('etfDownloadBtn').onclick = downloadETFCsv; // ETF download button
});

// Filter stocks function
function filterStocks() {
    console.log("filterStocks function called");
    const filters = {
        companyName: document.getElementById("company-name").value.toLowerCase(),
        ticker: document.getElementById("ticker").value.toLowerCase(),
        exchange: document.getElementById("exchange").value.toLowerCase(),
        gicsSector: document.getElementById("gics-sector").value.toLowerCase(),
        gicsIndustryGroup: document.getElementById("gics-industry-group").value.toLowerCase(),
        gicsIndustry: document.getElementById("gics-industry").value.toLowerCase(),
        gicsSubIndustry: document.getElementById("gics-sub-industry").value.toLowerCase(),
    };

    const tableBody = document.querySelector("#stockTable tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    console.log("Filtering stocks...");
    console.log("Total stocks before filtering:", stockData.length); // Log total stocks

    // Define key mappings
    const keyMap = {
        companyName: "Company Name",
        ticker: "Ticker",
        exchange: "Exchange",
        gicsSector: "GICS Sector",
        gicsIndustryGroup: "GICS Industry Group",
        gicsIndustry: "GICS Industry",
        gicsSubIndustry: "GICS Sub-Industry",
    };

    stockData.forEach((row, index) => {
        console.log('Row Data:', row); // Log each row

        const isMatch = Object.keys(filters).every(key => {
            const matchValue = row[keyMap[key]]?.toLowerCase().includes(filters[key]);
            return filters[key] === '' || matchValue;
        });

        if (isMatch) {
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

// Download filtered stocks as CSV
function downloadCSV() {
    const filename = document.getElementById('filename').value.trim() || 'filtered_stocks'; 
    const rows = document.querySelectorAll("#stockTable tbody tr");
    
    console.log("Rows to download:", rows.length);

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

    downloadBlob(csvData.join('\n'), `${filename}.csv`);
}

// Filter ETFs function
function filterETFs() {
    console.log("filterETFs function called");
    const filters = {
        etfName: document.getElementById("etf-name").value.toLowerCase(),
        etfTicker: document.getElementById("etf-ticker").value.toLowerCase(),
        assetClass: document.getElementById("asset-class").value.toLowerCase(),
        marketCap: document.getElementById("market-cap").value.toLowerCase(),
        strategy: document.getElementById("strategy").value.toLowerCase(),
        industryFocus: document.getElementById("industry-focus").value.toLowerCase(),
        geoFocus: document.getElementById("geo-focus").value.toLowerCase(),
        activelyManaged: document.getElementById("actively-managed").value.toLowerCase(),
        maturityBand: document.getElementById("maturity-band").value.toLowerCase(), // Add maturity band filter if needed
        fundRating: document.getElementById("fund-rating").value.toLowerCase(), // Add fund rating class filter if needed
        expenseRatio: document.getElementById("expense-ratio").value.toLowerCase() // Add expense ratio filter if needed
    };

    const etfTableBody = document.querySelector("#etfTable tbody");
    etfTableBody.innerHTML = ""; // Clear existing rows

    console.log("Filtering ETFs...");
    console.log("Total ETFs before filtering:", etfData.length); // Log total ETFs

    // Define key mappings
    const etfKeyMap = {
        etfName: "Name",
        etfTicker: "Ticker",
        assetClass: "Fund Asset Class Focus",
        marketCap: "Fund Market Cap Focus",
        strategy: "Strategy",
        industryFocus: "Fund Industry Focus",
        geoFocus: "Fund Geographical Focus",
        activelyManaged: "Actively Managed?",
        maturityBand: "Maturity Band",
        fundRating: "Fund Rating Class Focus",
        expenseRatio: "Expense Ratio"
    };

    etfData.forEach((row, index) => {
        console.log('ETF Row Data:', row); // Log each ETF row

        const isMatch = Object.keys(filters).every(key => {
            const matchValue = row[etfKeyMap[key]]?.toString().toLowerCase().includes(filters[key]);
            return filters[key] === '' || matchValue;
        });

        if (isMatch) {
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
                <td>${row["Maturity Band"]}</td>
                <td>${row["Fund Rating Class Focus"]}</td>
                <td>${row["Expense Ratio"]}</td>
                <td>${row["Actively Managed?"]}</td>
            `;
            etfTableBody.appendChild(newRow);
        }
    });

    console.log("Filtered ETFs count:", etfTableBody.children.length); // Log count of rows added
}

// Download filtered ETFs as CSV
function downloadETFCsv() {
    const filename = document.getElementById('etf-filename').value.trim() || 'filtered_etfs'; 
    const rows = document.querySelectorAll("#etfTable tbody tr");
    
    console.log("Rows to download:", rows.length);

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

    downloadBlob(csvData.join('\n'), `${filename}.csv`);
}

// Helper function to download CSV files
function downloadBlob(data, filename) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename; // Use the provided filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Clean up
}
