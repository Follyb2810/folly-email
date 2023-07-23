const mongoose = require('mongoose');
const env = require('dotenv');


env.config();

const url = process.env.dbCon;

const connectdb = async () => {
    try {
        const con = await mongoose.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log(`${con.connection.host} is connected`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectdb;
