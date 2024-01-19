import express from 'express';
import dotenv from 'dotenv/config';
import multer from 'multer';
import { insertCSV, salesStatistics, getOrders } from './services';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 1) 고객정보 및 주문내역정보 업로드 API
app.post('/csv-file', upload.single('file'), insertCSV);

// 2) 월별 매출 통계 API
app.get('/sales-statistics', salesStatistics);

// 3) 주문 목록 조회 API
app.get('/orders', getOrders);

app.use((err, req, res, next) => {
  return res.status(400).json({
    message: 'Failed',
    err,
  });
});

app.listen(process.env.PORT, () => {
  console.log('connected');
});
