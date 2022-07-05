require('./config/config');
require('./models/db');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const rtsIndex = require('./routes/index.router');

const { mongoose } = require('./models/db')
var employeeController = require('./controllers/employeeController')

var app = express();

//middleware
app.use(bodyParser.json());
app.use(cors(({ origin: 'http://localhost:4200' })));
app.use('/api', rtsIndex);

//error handling
app.use((err, req, res, next) => {
    if (err.name == 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});


//start server
app.listen(process.env.PORT, () => console.log(`server started at port:${process.env.PORT}`));

app.use('/employees', employeeController);