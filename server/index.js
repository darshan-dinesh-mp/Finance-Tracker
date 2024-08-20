import express from "express"
import { login, signup } from "./controllers/auth.controller.js";
import { createTransaction, getTransactions } from "./controllers/transaction.controller.js";
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());

app.post('/api/signup', signup);
app.post('/api/login', login);

app.post('/api/transaction/insert', createTransaction);
app.get('/api/transaction/:userId', getTransactions);


app.listen(5000, () => console.log(`Server listening on 5000`));