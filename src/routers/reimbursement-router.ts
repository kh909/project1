import express, {Request, Response } from 'express';
import Reimbursement from '../models/reimbursement';
import * as reimbursementService from '../services/reimbursement-services';

const reimbursementRouter = express.Router();

     

//get /users/idnumber
reimbursementRouter.get('/:id',
    async (request: Request, response: Response) => {
        //retrieves id number
        const id = parseInt(request.params.id);

        const reimbursement = await reimbursementService.getReimbursementByAuthorId(id);

            if (reimbursement) {
                response.status(200).json(reimbursement);
            } else {
                response.sendStatus(404);
            }

    });

//get /users
reimbursementRouter.get('/status/:id',
// any to receive the token 
async (request: any, response: Response) => {
   //console.log(request.token);
   let testToken = request.token.role;

        // outputs the role number
        // console.log(testToken);
//if user is admin
   if (testToken == 1) {
        const reimbursement = await reimbursementService.getReimbursement();

        if (reimbursement) {
            response.status(200).json(reimbursement);
        } 
    }
    //if user us not admin
    else {
        response.status(401).json({message: 'You are not authorized for this operation'});
    }
    
    
});

// patching /user
// request a user
reimbursementRouter.patch('',
    async (request: Request, response: Response) => {
        const patch: Reimbursement = request.body;
        //store the role
        let testToken = request.token.role;

        //if user is admin
             if( testToken == 1){
                 const patchedReimbursement: Reimbursement = await reimbursementRouter.patchCoalesce(patch);
                 if (patchedReimbursement.reimbursementId) {
                    response.json(patchedReimbursement);
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

export default reimbursementRouter;