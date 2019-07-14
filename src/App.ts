import bodyParser from 'body-parser';
import express from 'express';
import userRouter from './routers/user-router';


import { closePool } from './util/pg-connector';

//Setup express
const app = express();

// set up port
const port = process.env.port || 3000;

// close the pool when the app shuts down
process.on('SIGINT', () => {
    closePool();
});

// Register middleware
app.use(bodyParser.json());

//Register routers
app.use('/users', userRouter);


//Open Port
app.listen(port, () => {
    console.log(`Application running on port ${port}.`);
});