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

        displayStocks(stocksData);
        displayETFs(etfsData);
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
    
    const filteredStocks = stocksData.filter(stock => 
        (companyName === "" || stock.company.toLowerCase().includes(companyName)) &&
        (ticker === "" || stock.ticker.toLowerCase().includes(ticker)) &&
        (exchange === "" || stock.exchange.toLowerCase().includes(exchange))
    );

    displayStocks(filteredStocks);
}

// Display Function for Stocks
function displayStocks(data) {
    const stocksTable = document.getElementById("stocks-table");
    stocksTable.innerHTML = "";

    data.forEach(stock => {
        const row = stocksTable.insertRow();
        row.insertCell(0).innerText = stock.company;
        row.insertCell(1).innerText = stock.ticker;
        row.insertCell(2).innerText = stock.exchange;
        row.insertCell(3).innerText = stock.price;
    });
}

// Filter Function for ETFs
function filterETFs() {
    const etfName = document.getElementById("etf-name").value.toLowerCase();
    const etfTicker = document.getElementById("etf-ticker").value.toLowerCase();
    
    const filteredETFs = etfsData.filter(etf => 
        (etfName === "" || etf.name.toLowerCase().includes(etfName)) &&
        (etfTicker === "" || etf.ticker.toLowerCase().includes(etfTicker))
    );

    displayETFs(filteredETFs);
}

// Display Function for ETFs
function displayETFs(data) {
    const etfsTable = document.getElementById("etfs-table");
    etfsTable.innerHTML = "";

    data.forEach(etf => {
        const row = etfsTable.insertRow();
        row.insertCell(0).innerText = etf.name;
        row.insertCell(1).innerText = etf.ticker;
        row.insertCell(2).innerText = etf.expenseRatio;
        row.insertCell(3).innerText = etf.price;
    });
}

// Download Function for Stocks
function downloadStocks() {
    const csvContent = "data:text/csv;charset=utf-8," + 
        stocksData.map(stock => 
            `${stock.company},${stock.ticker},${stock.exchange},${stock.price}`
        ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "stocks_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Download Function for ETFs
function downloadETFs() {
    const csvContent = "data:text/csv;charset=utf-8," + 
        etfsData.map(etf => 
            `${etf.name},${etf.ticker},${etf.expenseRatio},${etf.price}`
        ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "etfs_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Initialize Tab and Fetch Data
document.addEventListener("DOMContentLoaded", function() {
    document.getElementsByClassName("tablink")[0].click(); // Click on the first tab to open it
    fetchData(); // Fetch data when the document is loaded
});
