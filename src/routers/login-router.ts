import express, {Request, Response } from 'express';
import User from '../models/user';
import * as userService from '../services/user-services';

let jwt = require('jsonwebtoken');

const loginRouter = express.Router();

// for the login /post
// promise to return a user
loginRouter.post('',async (request: Request, response: Response) => {
    let username = request.body.username;
    let password = request.body.password;
   // optional console.log(username, password)
   let user : User = await userService.validateUser(username, password);


   //if username and password are true this will 
   if (user.username && user.password) {
        const token =jwt.sign({
            userId:user.userId,
            role: user.role},
            
            "secretkey", // << this is the secret key
            //sets the expiration for the token
            { expiresIn : "24hr"  
        });

        //provides the token if the login credentials are true.
        response.status(200).json({
            message: user,
            sucess: true,
            token: token
        });
   }
   else response.status(400).json({message: 'You are not authorized for this operation'});
});
export default loginRouter;

