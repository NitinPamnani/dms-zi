import express from 'express';
import * as userUseCases from '../../domain/use-cases/UserUseCases.js';
const userRouter = express.Router();
import jwt from 'jsonwebtoken';
import Config from '../../config/config.js'
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

        
//public and private key
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)
const privateKey = fs.readFileSync(path.resolve(__dirname,'../../config/private.key'),'utf-8');
const publicKey = fs.readFileSync(path.resolve(__dirname,'../../config/public.key'),'utf-8');

userRouter.post('/token', async(req, res) => {
    //validate the user exits and check if pass is valid
    const username = "nitin2n33";
    const password = "nitin2n33";
    const email = "nitinpamnani002@gmail.com";
    const context = {
        username: username,
        password: password,
        email: email
    }
    const validUserRes = await userUseCases.validateUserPassword(context);
    if(validUserRes.success) {
        const userData = validUserRes.data;

        //signing options
        const signOptions = {
            issuer: 'dms-zi',
            subject: 'auth token for dms-zi',
            audience: 'dms users',
            expiresIn: '15d',
            algorithm: "RS256"
        }

        const jwtData = {
            userId: userData.userId,
            username: userData.username,
            email: userData.email,
            rootDir: userData.root_dir
        }
        try {
          const token = jwt.sign(jwtData, privateKey, signOptions);
          if(token) {
            res.send({success:1, token: token});
          } else {
            res.send({success:0})
          }
        } catch(err) {
            console.log("Unable to create JWT: "+err)
            res.send({success:0})
        }
    } else {
        res.send({success:0, message:"Invalid User!"});
    }

})

export default userRouter;