import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import Connection from './database/db.js';
import Router from './routes/route.js' 
// Here .js extension is compulsory for all imports

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use('/', Router);

const PORT = 8000 || process.env.PORT;

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT} !`))

const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD;

const URL = process.env.MONGODB_URI || `mongodb+srv://${username}:${password}@blog-app.v73rxj9.mongodb.net/?retryWrites=true&w=majority`;
    

Connection(URL);