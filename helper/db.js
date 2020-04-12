const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://mesutxx:qwert123@ds163387.mlab.com:63387/heroku_mspwj8cq' , { useUnifiedTopology: true ,  useNewUrlParser: true});

    mongoose.connection.on('open', () => {
        console.log('MongoDB: Connected.. ');
    });

    mongoose.connection.on('error', (error) => {
        console.log('MongoDB: Error',error);
    });

    mongoose.Promise = global.Promise;
};