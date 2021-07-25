//importing required api
const express = require('express')
const http = require('http');
const fs = require('fs');
const path = require('path');

const app = express()

const PORT = 3000

//Middleware
app.use(express.static('public'));

//Default page is index
app.get('/', (req,res)=> {
    res.sendFile(path.resolve(__dirname, './public/index.html'))
})

//If pathed to /notes, bring up notes html
app.get('/notes', (req,res)=> {
    res.sendFile(path.resolve(__dirname, './public/notes.html'))
})

//Gets access json file
app.get('/api/notes', (req,res)=>{
    fs.readFile(__dirname + '/db/db.json', function (err, data) {
        var json = JSON.parse(data);
        res.json(json)
    })
})

app.post('/api/notes', (req, res) => {

    fs.readFile(__dirname + '/db/db.json', function (err, data) {
        var json = JSON.parse(data);
        req.body.id = uniqid();
        json.push(req.body);
        console.log(json);
        fs.writeFile(__dirname + '/db/db.json', JSON.stringify(json), function(err){
            if (err) throw err;
            console.log('Success!');
        })
    })

})

app.get('/api/notes/:note')

//If at an unrecognized path, respond with err
app.get('*', (req,res)=> {
    res.status(404).send('Resource not found')
})

//Listening?
app.listen(PORT, ()=> {
    console.log(`Server is listening on port ${PORT}, http://localhost:${PORT}`)
})