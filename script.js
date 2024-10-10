let stocks = [];
let etfs = [];

// Function to fetch data from JSON files
async function fetchData() {
    try {
        const stocksResponse = await fetch('stocks.json'); // Replace with the correct path to your JSON file
        const etfsResponse = await fetch('etfs.json');     // Replace with the correct path to your JSON file

        if (!stocksResponse.ok || !etfsResponse.ok) {
            throw new Error('Network response was not ok');
        }

        const stocksData = await stocksResponse.json();
        const etfsData = await etfsResponse.json();

        stocks = stocksData; // Store stocks data
        etfs = etfsData;     // Store ETFs data

        displayStocks(stocks);  // Display all stocks initially
        renderETFs(etfs);       // Use the render function for ETFs
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

// Open Tab Function
function openTab(evt, tabName) {
    let tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";  
    }
    let tablinks = document.getElementsByClassName("tablink");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";  
    evt.currentTarget.className += " active";
}

// Filter Function for Stocks
function filterStocks() {
    const companyName = document.getElementById("company-name").value.toLowerCase();
    const ticker = document.getElementById("ticker").value.toLowerCase();
    const exchange = document.getElementById("exchange").value.toLowerCase();
    
    const filteredStocks = stocks.filter(stock => 
        (companyName === "" || stock.company.toLowerCase().includes(companyName)) &&
        (ticker === "" || stock.ticker.toLowerCase().includes(ticker)) &&
        (exchange === "" || stock.exchange.toLowerCase().includes(exchange))
    );

    displayStocks(filteredStocks);
}

// Display Function for Stocks
function displayStocks(data) {
    const stocksTable = document.getElementById("stockTable").getElementsByTagName('tbody')[0];
    stocksTable.innerHTML = "";

    data.forEach((stock, index) => {
        const row = stocksTable.insertRow();
        row.insertCell(0).innerText = index + 1; // Row number
        row.insertCell(1).innerText = stock.company;
        row.insertCell(2).innerText = stock.ticker;
        row.insertCell(3).innerText = stock.exchange;
        row.insertCell(4).innerText = stock.price;
        row.insertCell(5).innerText = stock.gicsSector || ""; // Assuming this field exists
        row.insertCell(6).innerText = stock.gicsIndustryGroup || ""; // Assuming this field exists
        row.insertCell(7).innerText = stock.gicsIndustry || ""; // Assuming this field exists
        row.insertCell(8).innerText = stock.gicsSubIndustry || ""; // Assuming this field exists
    });
}

// Download Function for Stocks
function downloadStocks() {
    const filename = document.getElementById("filename").value || 'stocks.csv';
    const csvContent = generateCSV(stocks);
    downloadFile(csvContent, filename);
}

// Generate CSV for Stocks
function generateCSV(data) {
    const headers = ['Row', 'Company Name', 'Ticker', 'Exchange', 'Price', 'GICS Sector', 'GICS Industry Group', 'GICS Industry', 'GICS Sub-Industry'];
    const csvRows = [];

    csvRows.push(headers.join(','));
    data.forEach((stock, index) => {
        const values = [
            index + 1,
            stock.company,
            stock.ticker,
            stock.exchange,
            stock.price,
            stock.gicsSector || "",
            stock.gicsIndustryGroup || "",
            stock.gicsIndustry || "",
            stock.gicsSubIndustry || ""
        ];
        csvRows.push(values.join(','));
    });

    return csvRows.join('\n');
}

// Function to download CSV file
function downloadFile(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Filter Function for ETFs
function filterETFs() {
    const etfName = document.getElementById("etf-name").value.toLowerCase();
    const etfTicker = document.getElementById("etf-ticker").value.toLowerCase();
    const etfAssetClass = document.getElementById("etf-asset-class").value.toLowerCase();
    const etfMarketCap = document.getElementById("etf-market-cap").value.toLowerCase();
    const etfStrategy = document.getElementById("etf-strategy").value.toLowerCase();
    const etfIndustryFocus = document.getElementById("etf-industry-focus").value.toLowerCase();
    const etfGeographicalFocus = document.getElementById("etf-geographical-focus").value.toLowerCase();
    const etfMaturityBand = document.getElementById("etf-maturity-band").value.toLowerCase();
    const etfExpenseRatio = document.getElementById("etf-expense-ratio").value;
    const etfActivelyManaged = document.getElementById("etf-actively-managed").value.toLowerCase();

    const filteredETFs = etfs.filter(etf =>
        (etfName === "" || etf.name.toLowerCase().includes(etfName)) &&
        (etfTicker === "" || etf.ticker.toLowerCase().includes(etfTicker)) &&
        (etfAssetClass === "" || etf.assetClass.toLowerCase().includes(etfAssetClass)) &&
        (etfMarketCap === "" || etf.marketCap.toLowerCase().includes(etfMarketCap)) &&
        (etfStrategy === "" || etf.strategy.toLowerCase().includes(etfStrategy)) &&
        (etfIndustryFocus === "" || etf.industryFocus.toLowerCase().includes(etfIndustryFocus)) &&
        (etfGeographicalFocus === "" || etf.geographicalFocus.toLowerCase().includes(etfGeographicalFocus)) &&
        (etfMaturityBand === "" || etf.maturityBand.toLowerCase().includes(etfMaturityBand)) &&
        (etfExpenseRatio === "" || etf.expenseRatio <= etfExpenseRatio) &&
        (etfActivelyManaged === "" || (etf.activeManaged ? 'yes' : 'no') === etfActivelyManaged)
    );

    renderETFs(filteredETFs);
}

// Display Function for ETFs
function renderETFs(data) {
    const etfTable = document.getElementById("etfTable").getElementsByTagName('tbody')[0];
    etfTable.innerHTML = "";

    data.forEach((etf, index) => {
        const row = etfTable.insertRow();
        row.insertCell(0).innerText = index + 1; // Row number
        row.insertCell(1).innerText = etf.name;
        row.insertCell(2).innerText = etf.ticker;
        row.insertCell(3).innerText = etf.assetClass || ""; // Assuming this field exists
        row.insertCell(4).innerText = etf.marketCap || ""; // Assuming this field exists
        row.insertCell(5).innerText = etf.strategy || ""; // Assuming this field exists
        row.insertCell(6).innerText = etf.industryFocus || ""; // Assuming this field exists
        row.insertCell(7).innerText = etf.geographicalFocus || ""; // Assuming this field exists
        row.insertCell(8).innerText = etf.maturityBand || ""; // Assuming this field exists
        row.insertCell(9).innerText = etf.expenseRatio || ""; // Assuming this field exists
        row.insertCell(10).innerText = etf.activeManaged ? 'Yes' : 'No'; // Assuming this field exists
    });
}

// Download Function for ETFs
function downloadETFs() {
    const filename = document.getElementById("etf-filename").value || 'etfs.csv';
    const csvContent = generateETFCSV(etfs);
    downloadFile(csvContent, filename);
}

// Generate CSV for ETFs
function generateETFCSV(data) {
    const headers = ['Row', 'Name', 'Ticker', 'Fund Asset Class Focus', 'Fund Market Cap Focus', 'Strategy', 'Fund Industry Focus', 'Fund Geographical Focus', 'Maturity Band', 'Expense Ratio', 'Actively Managed?'];
    const csvRows = [];

    csvRows.push(headers.join(','));
    data.forEach((etf, index) => {
        const values = [
            index + 1,
            etf.name,
            etf.ticker,
            etf.assetClass || "",
            etf.marketCap || "",
            etf.strategy || "",
            etf.industryFocus || "",
            etf.geographicalFocus || "",
            etf.maturityBand || "",
            etf.expenseRatio || "",
            etf.activeManaged ? 'Yes' : 'No' // Assuming this field exists
        ];
                csvRows.push(values.join(','));
    });

    return csvRows.join('\n');
}
