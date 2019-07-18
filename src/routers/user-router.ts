import express, {Request, Response } from 'express';
import User from '../models/user';
import * as userService from '../services/user-services';


const userRouter = express.Router();

//get /users/idnumber
userRouter.get('/:id',
    async (request: Request, response: Response) => {
        //retrieves id number
        const id = parseInt(request.params.id);
        const testToken = request.token.role;
        const userToken = request.token.userId;
        
        try {
        if (testToken == 1 || (testToken == 3 ||  userToken == id) || testToken == 2) {
        

        const user = await userService.getUserById(id);
            //if user is and admin or if the id matches the current user
            if ((user) && (testToken == 1) ||(testToken == id)) {
                response.status(200).json(user);
              //console.log(testToken);
              //  console.log(user);
              //console.log(id);
            } else {
                response.sendStatus(401);
            }

    } else {
        response.status(401).json({message: 'You are not authorized for this operation'});
        console.log(testToken);
        console.log(userToken);
    } 
    
    
    }   
    catch {
        console.error('Invalid Token');
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
//if user is admin or finance manager
   if (testToken == 1 || testToken == 2) {
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