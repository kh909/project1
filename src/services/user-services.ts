import User from '../models/user';
import db from '../util/pg-connector';

// promises user information
export async function validateUser(username:string, password: string) {
    const info = await db.query(`select * FROM "User" WHERE username = $1 and password = $2;`,
    [username, password]);
    return info.rows[0];
    
}
//returns the user row with matching id number
// Promise returns the User array
export async function getUserById(id: number): Promise<User[]> {
    //await pauses execution of query until promise completed
    const result = await db.query(`SELECT * FROM "User" WHERE userid = $1`, [id]);
    return result.rows;
}

//returns all of the users in the table
//promise returns user array
export async function getUser(): Promise<User[]> {
    // await pauses execution of query until promise is completed
    const result = await db.query(`SELECT * FROM "User"`);
    return result.rows;
}

// use "" to rename

// used to update the rows in the database.
// promises a user
export async function patchCoalesce(patch: User) {
    // await pauses execution of query until promise is completed
    const result = await db.query(`UPDATE "User" SET username = COALESCE($1, username), \
password = COALESCE($2, password), \ first_name = COALESCE($3, first_name), \ 
last_name = COALESCE($4, last_name), \ email = COALESCE($5, email), \ 
role = COALESCE($6, role) WHERE userId =$7 \ RETURNING username, password, first_name , last_name , email, role, userid;`,
[patch.username, patch.password, patch.firstName, patch.lastName, patch.email, patch.role, patch.userId]);

    if (result.rowCount === 0) {
        // throw error, 404 
        
    } else {
        return result.rows[0];
    }
}

