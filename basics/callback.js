const fs = require('fs');

// USING ES6 CALLBACK
const readFile = (callback) => {
    fs.readFile('basics/test.txt', 'utf-8', callback)
}
readFile((err, data) => {
    if (err) throw err;
    console.log(data);
})

// USING OLD CALLBACK
function readFile(callback) {
    fs.readFile('basics/test.txt', 'utf-8', callback)
}
readFile(function (err, data) {
    if (err) throw err;
    console.log(data);
})

