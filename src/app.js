import express from 'express';
import dotenv from 'dotenv/config';
import db from './db';

const app = express();

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log('connected');
});
