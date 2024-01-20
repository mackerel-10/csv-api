import db from '../db';

const combineWhereOptions = (startDate, endDate, customerId, orderType) => {
  let whereOptions = '';
  const type = {
    0: "'order'",
    1: "'refund'",
    undefined: "'order' & 'refund'",
    '': "'order' & 'refund'",
  };

  if (startDate && endDate) {
    whereOptions += `DATE_FORMAT(\`order\`.created_at, '%Y-%m-%d') BETWEEN '${startDate}' AND '${endDate}'`;
  }

  if (customerId) {
    if (whereOptions) whereOptions += ` AND `;
    whereOptions += `customer_id = ${customerId}`;
  }

  // type = 0, 1 (order, refund, order & refund)
  if (whereOptions) whereOptions += ` AND `;
  whereOptions += `type = ${type[orderType]}`;

  return whereOptions;
};

const getOrders = async (req, res, next) => {
  try {
    // Query: startDate, endDate, orderType, customerId, pageSize, pageNo
    let { startDate, endDate, orderType, customerId, pageSize, pageNo } =
      req.query;
    if (!pageSize && !pageNo) {
      pageNo = 1;
      pageSize = 50;
    }

    const whereOptions = combineWhereOptions(
      startDate,
      endDate,
      customerId,
      orderType
    );

    const result = await db.query(`
        SELECT DATE_FORMAT(\`order\`.created_at, '%Y-%m-%d') AS '주문일자',
          customer.name AS '주문고객명',
          customer.grade AS '주문고객 등급',
          type AS '주문타입',
          amount AS '주문금액'
        FROM \`order\`
        JOIN customer ON \`order\`.customer_id = customer.id
        WHERE ${whereOptions}
        ORDER BY '주문일자' DESC
        LIMIT ${(pageNo - 1) * pageSize}, ${pageSize};
    `);

    return res.status(200).json({ message: 'Ok', data: result[0] });
  } catch (err) {
    next(err);
  }
};

export default getOrders;
