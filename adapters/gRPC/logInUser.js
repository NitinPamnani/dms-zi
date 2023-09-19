import client from './gRPCClient.js';

client.logInUser({email:"nitinpamnani002@gmail.com", password:"nitin2n33"},(error, token) => {
    console.log(error, token)
});