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


//promise returns reimbursement


export function createReimbursement(reimbursement: Reimbursement):
    Promise<Reimbursement[]> {

    return db.query(`INSERT INTO \"Reimbursement\" (author, amount, date_submitted, date_resolved,
        resolver, status, type, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING reimbursementid, author, amount, date_submitted, date_resolved,
        resolver, status, type, description,`,
        [reimbursement.author, reimbursement.amount, reimbursement.dateSubmitted, reimbursement.dateResolved,
        reimbursement.resolver, reimbursement.status, reimbursement.type, reimbursement.description])
        .then((data) => {
            return data.rows;
        }).catch((err) => {
            return [err];
        });
}

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
[patch.author, patch.amount, patch.dateSubmitted, patch.dateResolved, patch.resolver, patch.status, patch.type, patch.reimbursementId]);

    if (result.rowCount === 0) {
        // throw error, 404 
        
    } else {
        return result.rows[0];
    }
}

