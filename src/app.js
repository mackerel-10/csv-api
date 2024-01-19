import express from 'express';
import dotenv from 'dotenv/config';

const app = express();

app.listen(process.env.PORT, () => {
  console.log('connected');
});
