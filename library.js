async function parseCSV() {
    fileUrl = './data/pigoreauslist.csv';
    let csvString = '';
    try {
        const response = await fetch(fileUrl);
        csvString = await response.text();
    } catch (error) {
        console.error('Error fetching CSV:', error);
    }

    //console.log(csvString);

    const rows = csvString.trim().split('\n'); // Split the CSV into rows
    const headers = rows[0].split(','); // Extract the header row
    const data = [];

    for (let i = 1; i < rows.length; i++) { // Iterate through the rest of the rows
      const rowValues = rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      const row = {};

      for (let j = 0; j < headers.length; j++) { // Create an object for each row
        row[headers[j]] = rowValues[j];
      }

      data.push(row);
    }

    const listContainer = document.getElementById('list');

    data.forEach(element => {
        console.log(element);
        const bookContainer = document.createElement('li');
        bookContainer.textContent = element;
        listContainer.appendChild(bookContainer);
    });
}

parseCSV();