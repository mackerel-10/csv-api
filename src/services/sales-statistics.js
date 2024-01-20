const db = require('../db');
const { CustomError } = require('../error-handler');

const salesStatistics = async (req, res, next) => {
  try {
    let orderStatistics = await db.query(`
      SELECT DATE_FORMAT(created_at, '%Y') AS year,
        DATE_FORMAT(created_at, '%m') AS month,
        SUM(amount) AS amount
      FROM \`order\`
      WHERE type = 'order'
      GROUP BY year, month;
    `);
    orderStatistics = orderStatistics[0];

    let refundStatistics = await db.query(`
      SELECT DATE_FORMAT(created_at, '%Y') AS year,
        DATE_FORMAT(created_at, '%m') AS month,
        SUM(amount) AS amount
      FROM \`order\`
      WHERE type = 'refund'
      GROUP BY year, month;
    `);
    refundStatistics = refundStatistics[0];

    if (!orderStatistics || !refundStatistics) {
      throw new CustomError(404, 'DB Not Found.');
    }

    const result = {};
    for (let i = 0; i < orderStatistics.length; i++) {
      let order = orderStatistics[i];
      let refund = refundStatistics[i];
      let [year, month] = [order.year, Number(order.month)];

      result[`${year}년 ${month}월 주문액`] = Number(order.amount);
      result[`${year}년 ${month}월 반품액`] = Number(refund.amount);
      result[`${year}년 ${month}월 매출`] = order.amount - refund.amount;
    }

    return res.status(200).json({
      message: 'Ok',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = salesStatistics;
