import Reimbursement from '../models/reimbursement';
import db from '../util/pg-connector';

//returns the user row with matching id number
// Promise returns the User array
export async function getReimbursementByAuthorId(id: number): Promise<Reimbursement[]> {
    //await pauses execution of query until promise completed
    const result = await db.query(`SELECT * FROM "Reimbursement" WHERE author = $1`, [id]);
    return result.rows;
}

export async function getReimbursement(): Promise<Reimbursement[]> {
    //await pauses execution of query until promise completed
    const result = await db.query(`SELECT * FROM "Reimbursement" `);

    console.log(result);
   

    return result.rows;
    
}

//returns all of the users in the table
//promise returns user array


// use "" to rename

// used to update the rows in the database.
// promises a user
export async function patchCoalesce(patch: Reimbursement) {
    // await pauses execution of query until promise is completed
    const result = await db.query(`UPDATE "Reimbursement" SET author = COALESCE($1, author), \
amount = COALESCE($2, amount), \ date_submitted = COALESCE($3, date_submitted), \ 
date_resolved = COALESCE($4, date_resolved), \ resolver = COALESCE($5, resolver), \ 
status = COALESCE($6, status) \ type = COALESCE($7, type) WHERE reimbursementid = COALESCE $8
\ RETURNING author, amount, date_submitted, date_resolved, resolver, status, type, reimbursementid;`,
[patch.author, patch.amount, patch.dateSumbmitted, patch.dateResolved, patch.resolver, patch.status, patch.type, patch.reimbursementId]);

    if (result.rowCount === 0) {
        // throw error, 404 
        
    } else {
        return result.rows[0];
    }
}

