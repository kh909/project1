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
async (request: Request, response: Response) => {
    
    const user = await userService.getUser();

    if (user) {
        response.status(200).json(user);
    } else {
        response.sendStatus(404);
    }

});

//Test \/\/\/\/

userRouter.patch('',
    async (request: Request, response: Response) => {
        const patch: User = request.body;
        
        const patchedUser: User = await userService.patchCoalesce(patch);

        // 
        if (patchedUser.userId) {
            response.json(patchedUser);
        } else {

        }
        response.sendStatus(200);
    });

export default userRouter;