const express = require('express');

const { ServerConfig, DB_CONNECT } = require('./config');
const apiRoutes = require('./routes');
const { Tweet, Hashtag } = require('./models');
const { TweetRepository } = require('./repositories');
const passport = require('passport');
const { passportAuth } = require('./middlewares/jwt-middleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

//passport
app.use(passport.initialize());
passportAuth(passport);

//DB connection
DB_CONNECT.connect().then(()=>console.log("MongoDB Connected")).catch((error)=>console.log("MongoDB Error ",error))


app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
