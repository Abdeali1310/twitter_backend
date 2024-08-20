const { Tweet } = require("../../src/models");
const { TweetRepository } = require("../../src/repositories");

jest.mock("../../src/models/Tweet.js");

test('creating new tweet',async ()=>{
    const data = {
        content:'Testing tweet',
    }
    const spy = jest.spyOn(Tweet,'create').mockImplementation(()=>{
        return {
            ...data,createdAt:'2024-05-06',updatedAt:'2024-08-19'
        }
    });

    const tweetRepository = new TweetRepository();
    const tweet = await tweetRepository.createTweet(data);

    expect(tweet.content).toBe(data.content);
})