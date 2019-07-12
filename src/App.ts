import express from 'express';
import bodyParser from 'body-parser';
import loginRouter from './routers/login-router';
import { closePool } from './util/pg-connector';
//Setup express
const app = express();

// process
const port = process.env.port || 3000;

// close the pool when the app shuts down
process.on('SIGINT', () => {
    closePool();
});

// Register middleware
app.use(bodyParser.json());

//Register routers
app.use('/login', loginRouter);

//Open Port
app.listen(port, () => {
    console.log(`Application running on port ${port}.`);
});