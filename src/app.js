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

// 2) 월별 매출 통계 API

// 3) 주문 목록 조회 API

app.use((err, req, res, next) => {
  return res.status(400).json({
    message: 'Failed',
    err,
  });
});

app.listen(process.env.PORT, () => {
  console.log('connected');
});
