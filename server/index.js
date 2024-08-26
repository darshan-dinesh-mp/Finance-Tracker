import express from "express"
import { login, signup } from "./controllers/auth.controller.js";
import { createTransaction, deleteTransaction, editTransaction, getTransactions } from "./controllers/transaction.controller.js";
import cors from 'cors';
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.post('/api/signup', signup);
app.post('/api/login', login);

app.post('/api/transaction/insert', createTransaction);
app.post('/api/transaction/delete', deleteTransaction);
app.post('/api/transaction/edit', editTransaction);
app.get('/api/transaction/:userId', getTransactions);


app.listen(port, () => console.log('Server listening on 5000'));