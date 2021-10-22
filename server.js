//pulling in required packages
const express = require("express");
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json');
//creating instance of express
const app = express();
//setting the port that the server is listening on 
const PORT = 3001;

//sets up the express app to handle data parsing 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public)'));


//dirname is recognized by the path package as the current directory
//This creates a path to the index.html file
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

//This creates a path to the notes.html file
app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

//This gets the data in the db.json file
app.get('/api', (req,res) => res.json(db));

//This should be the last thing 
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);


// npm install uniqid 
