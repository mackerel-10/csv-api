const express = require('express');
const dotenv = require('dotenv/config');
const multer = require('multer');
const { insertCSV, salesStatistics, getOrders } = require('./services');
const { errorHandler } = require('./error-handler');

const app = express();
const upload = multer({ dest: 'uploads/' });
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 1) 고객정보 및 주문내역정보 업로드 API
app.post('/csv-file', upload.single('file'), insertCSV);

// 2) 월별 매출 통계 API
app.get('/sales-statistics', salesStatistics);

// 3) 주문 목록 조회 API
app.get('/orders', getOrders);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Port ${port} connected`);
});
