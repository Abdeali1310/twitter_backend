const mongoose = require('mongoose');
const serverConfig = require('./server-config');


async function connect(){
    return await mongoose.connect(serverConfig.DATABASE_URL);
}

module.exports = {connect};