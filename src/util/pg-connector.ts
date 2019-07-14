import { Pool } from 'pg';

// information about the database
const db = new Pool({
    database: 'project0',
    host: 'localhost',
    password: 'password',
    port: 5432,
    user: 'postgres',
});

export function closePool() {
    db.end();
}

export default db;