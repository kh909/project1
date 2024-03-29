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
   //console.log(username, password)
   let user : User = await userService.validateUser(username, password);

try {

    //if username and password are true this will 
    if (user.username && user.password) {
       // if (user.role === 1) {
            const token =jwt.sign({
                userid: user.userId,
                role: user.role},
            
                "secretkey", // << this is the secret key
                //sets the expiration for the token
                { expiresIn : "24hr"  
            });

            //provides the token if the login credentials are true.
            //outputs the username, token, and sucess
            response.status(200).json({
                username,
                sucess: true,
                token: token
            });
     //   }
    }
}
//output for incorrect username or password
catch {
    response.status(400).json({message: 'Invalid Credentials'});}
});
export default loginRouter;

