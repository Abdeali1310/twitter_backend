const express = require('express');

const { ServerConfig, DB_CONNECT } = require('./config');
const apiRoutes = require('./routes');
const { Tweet, Hashtag } = require('./models');
const { TweetRepository } = require('./repositories');

const app = express();

//DB connection
DB_CONNECT.connect().then(()=>console.log("MongoDB Connected")).catch((error)=>console.log("MongoDB Error ",error))

const tweetRepo = new TweetRepository();
// async function test(){
//     const res = await tweetRepo.deleteTweet('66b6f65663ada95c9d3713ec');
//     console.log(res);
    
// }
// test()
app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
