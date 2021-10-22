//pulling in required packages
const express = require("express");
const path = require('path');
const fs = require('fs');
const util = require('util');
const db = require('./db/db.json');
const uuid = require('./helpers/uuid.js');

//creating instance of express
const app = express();
//setting the port that the server is listening on 
const PORT = 3001;

//sets up the express app to handle data parsing 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connects static middleware in the public folder
app.use(express.static('public'));

//promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

//This creates a path to the notes.html file
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

//This gets the data in the db.json file
app.get('/api/notes', (req,res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//This posts data to the db.json file
app.post('/api/notes', (req, res) => {
    const {title, text} = req.body;
    const newNote = {
        title, 
        text, 
        id: uuid(),
    };

    // const writeToFile = (db, title, text) =>
    //     fs.writeFile(db, JSON.stringify(title, text, null, 4), (err) =>
    //     err ? console.error(err) : console.info(`\nData written to ${db}`)
    // );

    // const readAndAppend = (title, text, db) => {
    //     fs.readFile(db, 'utf8', (err, data) => {
    //       if (err) {
    //         console.error(err);
    //       } else {
    //         const parsedData = JSON.parse(data);
    //         parsedData.push(title, text);
    //         writeToFile(db, parsedData);
    //       }
    //     });
    //   };

    // readAndAppend(newNote, './db/db.json');
    //     res.json(`Tip added successfully `);

  //converts data to a string so it can be saved
    const noteString = JSON.stringify(newNote);
    //writes the string to a file
    fs.writeFile('./db/db.json', noteString, (err) =>
        err ? console.error(err): console.log("New note has been written to the JSON file.")
    );

    const response = {
        status: 'success',
        body: newNote,
    }

    res.status(201).json(response);
});

// BONUS app.delete 

//This creates a path to the index.html file
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

//This should be the last thing 
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);



