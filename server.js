// import your node modules

const db = require('./data/db.js');

// add your server code starting here
const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello CS12');
});

server.post('/api/posts', (req, res) => {
    const { title, contents} = req.body;
    db.insert({
        title,
        contents
    }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        console.error('Error', err);
        res.status(500).json({message: "Error"});
    });
});

server.get('/api/posts', (req, res) => {
    db.find().then(posts => {
        res.status(200).json(posts);
    }).catch(err => {
        console.error('Error', err);
        res.status(500).json({message: "Error"});
    });
});

server.get('/api/posts/:id', (req, res) => {
    db.findById(req.params.id).then(post => {
        res.status(200).json(post);
    }).catch(err => {
        console.error('Error', err);
        res.status(500).json({message: "Error"});
    });
});
server.listen(9000, () => console.log('\n== API on port 9k ==\n'));