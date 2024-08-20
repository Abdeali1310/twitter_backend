const { Tweet } = require("../../src/models");
const { TweetRepository } = require("../../src/repositories");

jest.mock("../../src/models/Tweet.js");

describe('create new tweet test',()=>{
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
    });
})


describe('get all tweet test',()=>{
    test('get all tweet',async ()=>{
        const data = {
            content:'Testing Tweet',
        }

        const tweetsArray = [
            {
                ...data,createdAt:'2024-08-09',updatedAt:'2024-09-09'
            },
            {
                ...data,createdAt:'2024-08-09',updatedAt:'2024-09-09'
            },
            {
                ...data,createdAt:'2024-08-09',updatedAt:'2024-09-09'
            },
        ];

        const findResponse = {
            tweetsArray
        }

        // findResponse.limit = jest.fn((limit)=> findResponse.slice(0,limit));
        // findResponse.skip = jest.fn((offset)=> findResponse);
        
        const spy = jest.spyOn(Tweet,'find').mockImplementation(()=>{
            return findResponse;
        });

        const tweetRepository = new TweetRepository();
        const response = await tweetRepository.getAllTweets();
        expect(spy).toHaveBeenCalled();
        expect(response.tweetsArray).toEqual(tweetsArray); // Compare the `tweetsArray` property

        spy.mockRestore();

    })
})
