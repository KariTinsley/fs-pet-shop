let fs = require('fs');
const path = require('path');
//const petsPath = path.join(__dirname, 'pets.json');
//const toyotaPath = path.join(__dirname, 'postgres-db');
//pool query: npm install pg then const pg = require("pg"); or const {'pool'} = require("pg");
const pg = require("pg");
const { Pool } = require("pg");
const express = require('express');
const app = express();

app.disable('x-powered-by');

const morgan = require('morgan');

app.use(morgan('short'));

const bodyParser = require('body-parser');

app.use(bodyParser.json());
let port = process.env.PORT || 8000;

const pool = new Pool({
  user: 'postgresKT',
  host: 'localhost',
  database: 'petshop',
  password: 'petsop24',
  port: 5432,
});



//get request for pets
/*app.get('/pets', (req, res, next) => {

    fs.readFile('./pets.json', function (err, data) {
        if (err) {

            throw err;
        }

        const pets = JSON.parse(data);
        res.send(pets);

    });
})
//get request for sigular pet
app.get('/pets/:id/', (req, res, next) => {

    //make sure id is a number

    //console.log('Here',id);
    fs.readFile('./pets.json', function (err, data) {
        const id = parseInt(req.params.id);
        let array = JSON.parse(data);
        //console.log(petsData);

        if (id < 0 || id >= array.length || Number.isNaN(id)) {
            return res.sendStatus(404);
        }

        res.send(array[id]);

        //console.log(petsData);


    });
})

//post request for pets array
app.post("/pets", (res, req, next) => {
    //get data request 
    //add new pet to data
    //console.log("req.body", req.body);
    let age = Number.parseInt(req.body.age);
    let { kind, name } = req.body;

    fs.readFile(petsPath, (readErr, petsResponse) => {
        if (readErr) {
            return next(readErr);
        }

        //retrieve data from file, then turn it into a JS object
        let pets = JSON.parse(petsResponse);

        //check to make sure data is ok
        if (!age || !kind || Number.isNaN(age) || !name) {
            return res.sendStatus(400);
        }

        //make newPet object
        let newPet = { age, kind, name };

        pets.push(newPet);
        console.log("pets after insert", pets);

        let petsString = JSON.stringify(pets);

        fs.writeFile(petsPath, petsString, (writeErr) => {
            if (writeErr) {
                return next(writeErr)
            }

            //if everything is good to go
            res.send(newPet);
        });
    })
});


//patch request for pet
app.patch('/pets/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    let { name } = req.body;

    fs.readFile(petsPath, (readErr, petsResponse) => {

        //if read error
        if (readErr) {
            return next(readErr);
        }


        //if id error
        if (Number.isNaN(id) || id > pets.length || id < 0) {
            res.sendStatus(404);
        }

        //get data parsed
        let pets = JSON.parse(petsResponse);

        //modify name
        let newName = { name };
        pets.push(newName);


        fs.writeFile(petsPath, petsString, (writeErr) => {
            if (writeErr) {
                return next(writeErr)
            }

            //if everything is good to go
            res.send(newName);
        });
    });
});


//delete method
app.delete('/pets/:id', (req, res, next) => {
    res.send('Deleted');
});






app.listen(port, () => {
    console.log('Listening on port', port);
});

module.exports = app;

/*
'use strict';
​
const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');
​
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
​
const port = process.env.PORT || 8000;
​
app.use(bodyParser.json());
​
app.get('/pets', (_req, res, next) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      return next(err);
    }
​
    const pets = JSON.parse(petsJSON);
​
    res.send(pets);
  });
});
​
​
app.get('/pets/:id', (req, res, next) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      return next(err);
    }
​
    const id = Number.parseInt(req.params.id);
    const pets = JSON.parse(petsJSON);
​
    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }
​
    res.send(pets[id]);
  });
});
​
​
app.post('/pets', (req, res, next) => {
  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      return next(readErr);
    }
​
    const pets = JSON.parse(petsJSON);
    const age = Number.parseInt(req.body.age);
    const kind = req.body.kind;
    const name = req.body.name;
​
    if (Number.isNaN(age) || !kind || !name) {
      return res.sendStatus(400);
    }
​
    const pet = { age, kind, name };
​
    pets.push(pet);
​
    const newPetsJSON = JSON.stringify(pets);
​
    fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
      if (writeErr) {
        return next(writeErr);
      }
​
      res.send(pet);
    });
  });
});
​
​
app.patch('/pets/:id', (req, res, next) => {
  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      return next(readErr);
    }
​
    const id = Number.parseInt(req.params.id);
    const pets = JSON.parse(petsJSON);
​
    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }
​
    const pet = pets[id];
    const age = Number.parseInt(req.body.age);
    const kind = req.body.kind;
    const name = req.body.name;
​
    if (!Number.isNaN(age)) {
      pet.age = age;
    }
​
    if (kind) {
      pet.kind = kind;
    }
​
    if (name) {
      pet.name = name;
    }
​
    const newPetsJSON = JSON.stringify(pets);
​
    fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
      if (writeErr) {
        return next(writeErr);
      }
​
      res.send(pet);
    });
  });
});
​
​
app.delete('/pets/:id', (req, res, next) => {
  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      return next(readErr);
    }
​
    const id = Number.parseInt(req.params.id);
    const pets = JSON.parse(petsJSON);
​
    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }
​
    const pet = pets.splice(id, 1)[0];
    const newPetsJSON = JSON.stringify(pets);
​
    fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
      if (writeErr) {
        return next(writeErr);
      }
​
      res.send(pet);
    });
  });
});
​
​
app.get('/boom', (_req, _res, next) => {
  next(new Error('BOOM!'));
});
​
​
app.use((_req, res) => {
  res.sendStatus(404);
});
​
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.sendStatus(500);
});
​
​
app.listen(port, () => {
  console.log('Listening on port', port);
});
​
​
module.exports = app;
*/



/*make table 
INSERT information to the TABLE
Request then Respond with the data pulled from the TABLE */

/*


app.get('/pets', (req, res, next) => {
    const result = pool.query('SELECT* FROM pets', (err, result) => {
        if (err) {
            return next(err);
        }

        const rows = result.rows;
        console.log(rows);

        res.send(rows);
    })
});


app.get('/pets/:id', (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    const result = pool.query('SELECT name, kind, age FROM pets WHERE id =' + id, (err, result) => {
        if (err) {
            return next(err);
        }

        const pet = result.rows[0];
        console.log("Single Pet ID", id, "values:", pet);

        res.send(pet[id]);
    })
});




//delete request

app.delete('/pets/:id', (req, res) => {

    const id = req.params.id;
    console.log("Pet ID to delete", id);

    pool.query("DELETE FROM pets WHERE id = $1" + id, (err, data) => {
        if (err) {
            return next(err);
        }
        console.log(data);
        const deleted = data.rows[0];

        if (deleted) {
            console.log(deleted);
            res.send(deleted);
        } else {
            console.log("row not found");
            res.sendStatus(404);
        }

    });
});

/*
app.delete('/pets/:id', (req, res, next) => {

    const id = req.params.id;

    pool.query('DELETE FROM pets WHERE id = $1 RETURNING *', [id], (err,data) =>{
      if (err){
        return next(err);
      }
      const deleted = data.rows;
      if (deleted){
      res.send(deleted);
    }else{
      res.sendStatus(404);
    }
  });
});
*/


//post request
/*app.post("/pets", (req, res) => {
    /*
    
    const age = req.body.age;
    const {kind, name} = req.body;
    //check to see if any info is missing in request and that age is a number
    //if all is good conduct a pool.query to return the appropriate information
    
});*/

/*
//PATCH request for /pets/:id
app.patch('/pets', (req, res, next)=>{

const id = Number.parseInt(req.params.id);

// get data from body
const age = Number.parseInt(req.body.age);
const  {name, kind} = req.body;

if(name && kind && age && !Number.isNaN(age)){
pool.query("UPDATE pets SET name=$1, kind=$2, age=$3 WHERE id = $4", [name, kind, age, id],  (err, data)=>{
console.log(data.rows);

})
}
})
*/



//Hands-on: Full Stack - Single Page Application Rep
//CRUD routes


//Create-POST route for /toyota, pulls everything from Toyota_Models table

//READ-GET route
app.get('/Toyota_Models', (req, res, next) => {
  pool.query('SELECT * FROM public."Toyota_Models"', (err, result) => {
    if (err) {
      return next(err);
    }
    console.log(result);
    /*const  = result.rows;
    console.log(rows);*/

    res.send(result);
  })
});


app.get('/Toyota_Models/:id', (req, res, next) => {
  let id = Number.parseInt(req.params.id);
  pool.query('SELECT year, model FROM public."Toyota_Models" WHERE "ID" =' + id, (err, result) => {
    if (err) {
      return next(err);
    }

    const toyota = result.rows[0];
    console.log("Single ID", id, "values:", toyota);

    res.send(toyota);
  })
});


//PUT route
app.post('/Toyota_Models', (req, res, next) => {
  const year = Number.parseInt(req.body.year);
  const { model } = req.body;
  console.log("Request body year, model", year, model);
  // check request data - if everything exists and id is a number
  if (model && year && !Number.isNaN(year)) {
    pool.query('INSERT INTO public."Toyota_Models" (year, model) VALUES ($1, $2) RETURNING *', [model, year], (err, data) => {
      const toyota = data.rows[0];
      console.log("Created entry: ", toyota);
      if (toyota) {
        return res.send(toyota);
      } else {
        return next(err);
      }
    });

  } else {
    return res.status(400).send("Unable to create entry from request body");
  }

});


//PATCH route

app.patch('/Toyota_Models/:id', (req, res, next) => {
  // parse id from URL
  const id = Number.parseInt(req.params.id);
  // get data from request body
  const year = Number.parseInt(req.body.year);
  const { model } = req.body;
  // if id input is ok, make DB call to get existing values
  if (!Number.isInteger(id)) {
    res.status(400).send("No entry found with that ID");
  }
  console.log("ModelID: ", id);
  // get current values of the pet with that id from our DB
  pool.query('SELECT * FROM public."Toyota_Models" WHERE "ID" = $1', [id], (err, result) => {
    if (err) {
      return next(err);
    }
    console.log("request body year and model: ", year, model);
    const toyota = result.rows[0];
    console.log("Single Model ID from DB", id, "values:", toyota);
    if (!toyota) {
      return res.status(404).send("No Toyota Model found with that ID");
    } else {
      // check which values are in the request body, otherwise use the previous pet values
      // let updatedName = null; 
      const updatedModel = model || toyota.name;
      // if (name){
      //   updatedName = name;
      // } else {
      //   updatedName = pets.name;
      // }

      const updatedYear = year || toyota.year;

      pool.query('UPDATE public."Toyota_Models" SET year=$1, model=$2 WHERE "ID" = $3 RETURNING *',
        [updatedYear, updatedModel, id], (err, data) => {

          if (err) {
            return next(err);
          }
          const updatedToyotaModel = data.rows[0];
          console.log("updated row:", updatedToyotaModel);
          return res.send(updatedToyotaModel);
        });
    }
  });
});


//DELETE route
app.delete('/Toyota_Models/:id', (req, res, next) => {

  const id = req.params.id;
  console.log("Toyota_Models ID to delete", id);

  pool.query('DELETE FROM public."Toyota_Models" WHERE "ID" = $1 RETURNING *', [id], (err, data) => {
    if (err) {
      return next(err);
    }
    console.log(data);
    const deleted = data.rows[0];

    if (deleted) {
      console.log(deleted);
      res.send(deleted);
    } else {
      console.log("row not found");
      res.sendStatus(404);
    }

  });
});




app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
