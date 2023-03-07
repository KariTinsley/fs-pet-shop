let express = require('express');
let morgan = require('morgan');
let fs = require('fs');
let app = express();
let port = 5000;









//port listeners
app.listen(port, function () {
    //console.log('It works');
    console.log('Listening on port', port);
})