import { Pool } from 'pg';

const db = new Pool({
    database: 'postgres',
    host: 'localhost',
    password: 'password',
    port: 5432,
    user: 'login_user',
});

export function closePool() {
    db.end();
}

export default db;