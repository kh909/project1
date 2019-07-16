import express, {Request, Response } from 'express';
import User from '../models/user';
import * as userService from '../services/user-services';

const userRouter = express.Router();

     

//get /users/idnumber
userRouter.get('/:id',
    async (request: Request, response: Response) => {
        //retrieves id number
        const id = parseInt(request.params.id);

        const user = await userService.getUserById(id);

            if (user) {
                response.status(200).json(user);
            } else {
                response.sendStatus(404);
            }

    });

//get /users
userRouter.get('',
// any to receive the token
async (request: any, response: Response) => {
   //console.log(request.token);
   let testToken = request.token.role;

        // outputs the role number
        // console.log(testToken);
//if user is admin
   if (testToken == 1) {
        const user = await userService.getUser();

        if (user) {
            response.status(200).json(user);
        } 
    }
    //if user us not admin
    else {
        response.status(401).json({message: 'You are not authorized for this operation'});
    }
    
    
});

// patching /user
// request a user
userRouter.patch('',
    async (request: Request, response: Response) => {
        const patch: User = request.body;
        //store the role
        let testToken = request.token.role;

        //if user is admin
             if( testToken == 1){
                 const patchedUser: User = await userService.patchCoalesce(patch);
                 if (patchedUser.userId) {
                    response.json(patchedUser);
                } else {
                response.sendStatus(200);
                }
             }
        //if user is not admin
        else {
            response.status(401).json({message: 'You are not authorized for this operation'});
    }

        // maybe use a try catch
       
        
    });

export default userRouter;