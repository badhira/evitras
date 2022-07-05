const mongoose = require('mongoose');
var Employee = mongoose.model('Employee', {
    name: { type: String },
    role: { type: String },
    place: { type: String },
    age: { type: Number }

});
module.exports = {
    Employee
};