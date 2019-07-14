import User from '../models/user';
import db from '../util/pg-connector';

/*
export function createInventory(inventory: Inventory):
    Promise<Inventory[]> {
    // enforce business rules
    if (!inventory.itemName) {
        console.warn('Inventory item requires name');
    }

    // This operation will send a query to the database,
    // which will then return a new promise that includes
    // only the row data

    return db.query(`INSERT INTO inventory (item_name, quantity)
    VALUES ($1, $2) RETURNING id, item_name, quantity`,
        [inventory.itemName, inventory.quantity])
        .then((data) => {
            return data.rows;
        }).catch((err) => {
            return [];
        });
}
*/

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
