let http = require('http');
let fs = require('fs');

let port = 9000;

let parsedData;
let stringedData;

fs.readFile("./pets.json", "utf-8", function (err, data) {
    let parsedData = JSON.parse(data);
    let stringedData = JSON.stringify(parsedData);

});
//console.log('file read');


let server = http.createServer(function (req, res) {
    let appJson = res.setHeader('Content-Type', 'application/json');
    let plainText = res.setHeader('Content-Type', 'text/plain');

    let statusCode1 = res.statusCode = 404;
    let statusCode2 = res.statusCode = 200;

    if ('/pets') {
        //GET	/pets	200	application/json	[{ "age": 7, "kind": "rainbow", "name": "fido" }, { "age": 5, "kind": "snake", "name": "Buttons" }]
        console.log(statusCode2);
        console.log(appJson);
        console.log(stringedData);
    }
    //GET	/pets/0	200	application/json	{ "age": 7, "kind": "rainbow", "name": "fido" }
});


server.listen(port, () => {
    console.log('Listening on port', port);
});