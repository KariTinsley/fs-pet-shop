let express = require('express');
let fs = require('fs');
let app = express();
let port = 3000;
let error = 404;
let status = 200;


//route handlers
//pets route
app.get('/pets', (req, res, next) => {

    fs.readFile('./pets.json', function (err, data) {
        let petsData = JSON.parse(data);
        if (err) {

           throw err;
        } else {
            res.send(petsData);
            res.statusCode(200).json({'Content-Type': "application/json"});
        }
    });
})

//app.get('/pets', (req, res, next) => {
app.get('/pets/:id/', (req, res, next) => {

    //make sure id is a number
    const id = parseInt(req.params.id);
    //console.log('Here',id);
    fs.readFile('./pets.json', function (err, data) {
        let array = JSON.parse(data);
        //console.log(petsData);
        err = new Error('Not Found');
if(id < 0 || id > array.length){
   
    res.status(404);
    throw err;
}else if(id === NaN){
    res.status(404).json({'Content-Type': "text/plain"});
    throw err;
}else {
    console.log(array[id]);
}
        
        //console.log(petsData);


    });
})



//port listeners
app.listen(port, function () {
    //console.log('It works');
    console.log('Listening on port', port);
})