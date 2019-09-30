// implement your API here
const express = require('express'); //import express package

const dbModel = require('./data/db');

const server = express(); //creates the server


// middleware
// teach express how to read JSON fro the request body
server.use(express.json()); // <<<<<<<<<<<<<<<<<<<<<<<<<< we need this for POST and PUT

// server.post('/api/users', (req,res) => {
//     // axios.post(url, data);
//   // get the hub data from the request
//   const dbData = req.body;

//   // validate the data sent by he client
//   // NEVER TRUST THE CLIENT!!!!!
//   if (!dbData.name) {
//     res.status(400).json({ message: 'gimme a name' });
//   } else {
//     // add the hub to the database
//     dbModel
//       .add(dbData)
//       .then(hub => {
//         // send the hub back to the client
//         res.json(hub); //.json() will set the right headers and convert to JSON
//       })
//       .catch(error => {
//         res.json({ message: 'error saving the hub' });
//       });
//   }
// })

//get 
server.get('/api/users', (req,res) => {
    // res.json('hello')

    dbModel
      .find()
      .then(db => {
        // send the hub back to the client
        res.status(200).json(db); //.json() will set the right headers and convert to JSON
      })
      .catch(() => {
        res.status(500).json({ error: "The users information could not be retrieved." });
      });
})
//watch for connections on port 8000
const port = 5000;
server.listen(port, () => console.log(`\n***server running***\n`))
