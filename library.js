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
    const rawData = [];

    for (let i = 1; i < rows.length; i++) { // Iterate through the rest of the rows
      const rowValues = rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      const row = {};

      for (let j = 0; j < headers.length; j++) { // Create an object for each row
        row[headers[j]] = rowValues[j].replaceAll('"','');
      }

      //if (row.AUTHOR !== "" && row.TRANSLATOR !== "" && row.PUBLICATION !=="") {
        rawData.push(row);
      //}
    }

    console.log(rawData.length);

    const listContainer = document.getElementById('list');

    // https://stackoverflow.com/questions/51009090/sort-and-group-objects-alphabetically-by-first-letter-javascript

    let data = rawData.reduce((r, e) => {
      // get first letter of name of current element
      let group = e.TITLE[0];
      // if there is no property in accumulator with this letter create it
      if(!r[group]) r[group] = {group, children: [e]}
      // if there is push current element to children array for that letter
      else r[group].children.push(e);
      // return accumulator
      return r;
    }, {});

    //console.log(data);

    Object.entries(data).forEach(([key, value]) => {

      let letterContainer = document.createElement('li');
      let worksList = document.createElement('ul');
      letterContainer.textContent = key;
      letterContainer.setAttribute('id', key);
      letterContainer.appendChild(worksList);

      let works = value.children;
      works.forEach(function(work) {
        let workListItem = document.createElement('li');
        workListItem.textContent = work.TITLE;
        worksList.appendChild(workListItem);
      });

      listContainer.appendChild(letterContainer);


    });

}

parseCSV();