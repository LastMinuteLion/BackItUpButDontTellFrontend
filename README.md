# BackItUpButDontTellFrontend

🚀 Welcome to the Embarkment of Journey on ByteMeBackEnd!


// This is some of the snippet code

const express = require('express');
const app = express();

const bodyParser = require('body-parser');


app.use(bodyParser.json());

app.listen(8000 , () => {
    console.log('server started at port no 8000');
})

app.get('/' , (request,response) => {
    response.send("hello");
})
