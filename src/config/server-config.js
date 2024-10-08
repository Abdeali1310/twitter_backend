const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    DATABASE_URL:process.env.DATABASE_URL,
    SECRET_KEY:process.env.SECRET_KEY,
}