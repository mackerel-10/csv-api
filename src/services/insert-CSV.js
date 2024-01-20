const { parse } = require('csv-parse/sync');
const fs = require('fs');
const db = require('../db');

const insertCSV = async (req, res, next) => {
  try {
    const filePath = req.file.path;
    const csvFile = fs.readFileSync(filePath, 'utf-8');
    let parsedCsv = parse(csvFile, { from: 2 });
    fs.unlinkSync(filePath);

    if (parsedCsv[0].length === 3) {
      // customer csv -> 고객 id,고객명,고객등급
      await db.query(
        `INSERT INTO customer (
          id,
          name,
          grade
      ) VALUES ?;`,
        [parsedCsv]
      );
    } else if (parsedCsv[0].length === 4) {
      // order csv -> 주문고객 id,주문일자,주문타입,주문금액
      parsedCsv = parsedCsv.map((row) => {
        row[3] = row[3].replace(/,/g, '');
        return row;
      });
      await db.query(
        `INSERT INTO \`order\` (
          customer_id,
          created_at,
          type,
          amount
      ) VALUES ?;`,
        [parsedCsv]
      );
    }

    return res.status(201).json({
      message: 'Created.',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = insertCSV;
