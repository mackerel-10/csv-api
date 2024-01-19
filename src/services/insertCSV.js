import { parse } from 'csv-parse/sync';
import fs from 'fs';
import db from '../db';

const insertCSV = async (req, res, next) => {
  try {
    const filePath = req.file.path;
    const csvFile = fs.readFileSync(filePath, 'utf-8');
    const parsedCsv = parse(csvFile);
    fs.unlinkSync(filePath);
    console.log(parsedCsv);

    return res.status(201).json({
      message: 'Created',
    });
  } catch (err) {
    console.error(err);
  }
};

export default insertCSV;
