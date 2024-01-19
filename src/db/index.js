import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
});

db.on('connection', () => {
  console.log('DB connected!');
});

// (async () => {
//   const result = await db.query(`DESCRIBE \`order\``);
//   console.log(result);
// })();

export default db;
