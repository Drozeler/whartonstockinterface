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

// ... [filterStocks function remains unchanged] ...

function downloadCSV() {
    // Get table body rows
    const rows = document.querySelectorAll("#stockTable tbody tr");

    // Prepare CSV data
    const csvData = [];
    const headers = ["Row", "Company Name", "Ticker", "Exchange", "GICS Sector", "GICS Industry Group", "GICS Industry", "GICS Sub-Industry"];
    csvData.push(headers.join(',')); // Add headers to CSV

    rows.forEach((row, index) => {
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
    a.download = 'filtered_stocks.csv'; // Name of the downloaded file
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Clean up
}

// Log to confirm function definition
console.log("downloadCSV function:", typeof downloadCSV); // Check if function is recognized
