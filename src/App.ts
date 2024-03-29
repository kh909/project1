import bodyParser from 'body-parser';
import express from 'express';
import userRouter from './routers/user-router';
import checkToken from './util/validate-token';
import reimbursementRouter from './routers/reimbursement-router';

import { closePool } from './util/pg-connector';
import loginRouter from './routers/login-router';

//Setup express
const app = express();

// set up port
const port = process.env.port || 3004;

// close the pool when the app shuts down
process.on('SIGINT', async () => {
    await closePool();
});

// Register middleware
app.use(bodyParser.json());

//Register routers
//checkToken validates the user credentials
app.use('/users', checkToken, userRouter);
app.use('/login', loginRouter);
app.use('/reimbursements', checkToken, bodyParser.json(), reimbursementRouter);

//Open Port
app.listen(port, () => {
    console.log(`Application running on port ${port}.`);
});