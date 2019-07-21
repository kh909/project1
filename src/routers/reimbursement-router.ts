import express, {Request, Response } from 'express';
import Reimbursement from '../models/reimbursement';
import * as reimbursementService from '../services/reimbursement-services';

const reimbursementRouter = express.Router();

reimbursementRouter.post('',
    (request: Request, response: Response) => {
        const reimbursement = new Reimbursement(request.body);
       // console.log(reimbursement)
        reimbursementService.createReimbursement(reimbursement)
            // This handler receives the row data
            // from the service method
            .then((rows) => {
                if (rows.length > 0) {
                    response.status(201).json(rows[0]);
                } else {
                    response.sendStatus(400);
                }
            });
    });

//get /users/idnumber
// reimbursement author id
reimbursementRouter.get('/author/userId/:id',
    async (request: Request, response: Response) => {
        //retrieves id number
        const id = parseInt(request.params.id);

        let testToken = request.token.role;

        const reimbursement = await reimbursementService.getReimbursementByAuthorId(id);

            if ((reimbursement) && (testToken == 1) || (testToken == 2) || (testToken == id)) {
                response.status(200).json(reimbursement);
            } else {
                response.sendStatus(401);
            }

    });

    //get reimbursement by status
    
    reimbursementRouter.get('/status/:id',
    async (request: Request, response: Response) => {
        //retrieves id number
        const id = parseInt(request.params.id);
        
        let testToken = request.token.role;
       // console.log(testToken);

        const reimbursement = await reimbursementService.getReimbursementByStatusId(id);

            if ((reimbursement) && (testToken == 1) || (testToken == 2)){
                response.status(200).json(reimbursement);
            } else {
                response.sendStatus(401);
            }

    });

/*
//get /status/idnumber
reimbursementRouter.get('',
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
*/
// patching /user
// request a user
reimbursementRouter.patch('',
    async (request: Request, response: Response) => {
        const patch: Reimbursement = request.body;
        //store the role
        let testToken = request.token.role;
    
        //if user is admin or financial manager
             if(( testToken == 1) || (testToken == 2)){
                 const patchedReimbursement: Reimbursement = await reimbursementService.patchCoalesce(patch);
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