const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Employee } = require('../models/employee');


//localhost:3000/employees/
router.get('/', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) { res.send(docs); } else { console.log('error in Retrieving employees:' + JSON.stringify(err, undefined, 2)); }
    });
});

//single employee
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`no record with given id:${req.params.id}`);

    Employee.findById(req.params.id, (err, docs) => {
        if (!err) { res.send(docs); } else { console.log('error in Retrieving employees:' + JSON.stringify(err, undefined, 2)); }
    });
})

router.post('/', (req, res) => {
    var emp = new Employee({
        name: req.body.name,
        role: req.body.role,
        place: req.body.place,
        age: req.body.age
    });
    emp.save((err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Employee Save:' + JSON.stringify(err, undefined, 2)) }
    });
});
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`no record with given id:${req.params.id}`);
    var emp = {
        name: req.body.name,
        role: req.body.role,
        place: req.body.place,
        age: req.body.age
    }
    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc) } else {
            console.log('Error in employee Update:' + JSON.stringify(err, undefined, 2))
        }
    });

});
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`no record with iven id:${req.params.id}`);

    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc) } else {
            console.log('Error in employee Delete:' + JSON.stringify(err, undefined, 2))
        }
    });
});
module.exports = router;