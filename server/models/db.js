const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err) { console.log('Mongo db connection succeeded...'); } else {
        console.log('Error Mongodb Connection:' + JSON.stringify(err, undefined, 2));
    }

});
require('./user.model');
module.exports = mongoose;