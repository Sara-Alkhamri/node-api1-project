// implement your API here
const express = require('express'); //import express package

const dbModel = require('./data/db');

const server = express(); //creates the server


// middleware
// teach express how to read JSON fro the request body
server.use(express.json()); // <<<<<<<<<<<<<<<<<<<<<<<<<< we need this for POST and PUT

server.post('/api/users', (req,res) => {
    // axios.post(url, data);
  // get the hub data from the request
  const {name, bio} = req.body;

  // validate the data sent by he client
  // NEVER TRUST THE CLIENT!!!!!
  if (!name || !bio) {
    res.status(400).json({ message: 'Please provide name and bio for the user.' });
  } else {
    // add the hub to the database
    dbModel
      .insert(req.body)
      .then(db => {
        // send the hub back to the client
        res.status(201).json(db); //.json() will set the right headers and convert to JSON
      })
      .catch(() => {
        res.status(500).json({ message: 'There was an error while saving the user to the database' });
      });
  }
})

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

//get by id

server.get('/api/users/:id', (req, res) => {
    dbModel
    .findById(req.params.id)
    .then(db => {
        if (db) {
            res.status(200).json(db);
        } else {
            res.status(404).json({message: "The user with the specified ID does not exist"})
        }
       
    })
    .catch(() => {
        res.status(500).json({error: "The user information could not be retrieved."})
    })
});

//delete
server.delete('/api/users/:id', (req, res) => {
    dbModel.remove(req.params.id)
    .then(user => {
        if (user && user > 0) {
            res.status(200).json({message: 'user deleted'})
        } else {
            res.status(404).json({message: 'The user with the specified ID does not exist.'})
        }
    })
    .catch(() => {
        res.status(500).json({message: 'The user could not be removed'})
    })
})

//put
server.put('/api/users/:id', (req,res) => {
    const {name, bio} = req.body;

    if (!name || !bio) {
        res.status(400).json({message: "Please provide name and bio for the user."})
    } else {
        dbModel.update(req.params.id, req.body)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            }
            else {
                res.status(404).json({message: "The user with the specified ID does not exist."})
            }
        })
        .catch(() => {
            res.status(500).json({message: "The user information could not be modified."})
        })
        
    }

})


//watch for connections on port 5000
const port = 5000;
server.listen(port, () => console.log(`\n*** API on port ${port} ***\n`))
