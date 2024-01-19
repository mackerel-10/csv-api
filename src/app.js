import express, { json } from 'express';
import dotenv from 'dotenv/config';
import { insertCSV } from './services';
import multer from 'multer';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 1) 고객정보 및 주문내역정보 업로드 API
app.use('/csv-file', upload.single('file'), insertCSV);

app.listen(process.env.PORT, () => {
  console.log('connected');
});
