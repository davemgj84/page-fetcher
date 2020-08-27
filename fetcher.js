// Require both File System && Request modules:

const request = require('request');
const fs = require('fs');

// Accesses the user input and sets them into an array:

const webPage = process.argv.slice(2);

// Created function to handle HTTP request
// Used first element in array as the URL and a callback function, write() to send the data to be written within a file:

const fetcher = function(write) {
  request(webPage[0], (error, response, body) => {
    if (error) throw error;
    write(body);
  });
};

// Created a function that receives the data from fetcher, to be written to index.html
// Using the path from second element in user input array
// also console.log the size of the data that is written to our index.html into a readable statement

const write = function(data) {
  fs.writeFile(webPage[1], data, (err) => {
    if (err) throw err;
    const fileSize = fs.statSync(webPage[1]).size;
    console.log(`Downloaded and saved ${fileSize} bytes to ./index.html`);
  });
};

fetcher(write);