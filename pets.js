let fs = require("fs");

let input = process.argv[2];
let i = process.argv[3];

fs.readFile("./pets.json", "utf-8", function (err, data) {
    let parsedData = JSON.parse(data);
    let stringedData = JSON.stringify(parsedData);
    if (err) {
        console.log(err);
    } else if (input === create || input === read || input === update || input === destroy) {
        console.log(input, i);
    }
});