# second-backend

![Node.js](https://img.shields.io/badge/Node.js-20.5.0-339933?style=flat&logo=Node.js&logocolor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=Express&logocolor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.3.0-4479A1?style=flat&logo=MySQL&logocolor=white)

## ERD

![second](https://github.com/mackerel-10/second-backend/assets/67633810/2cf9fd41-ed21-48b5-b541-e18335fb964b)

## DDL

```SQL
CREATE TABLE customer (
	id INT NOT NULL,
	name VARCHAR(32) NOT NULL,
	grade CHAR NOT NULL,
	created_at DATETIME NOT NULL DEFAULT NOW(),
	updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	PRIMARY KEY(id)
);

CREATE TABLE `order` (
	id INT NOT NULL AUTO_INCREMENT,
	customer_id INT NOT NULL,
	type VARCHAR(8) NOT NULL,
	amount INT NOT NULL,
	created_at DATETIME NOT NULL,
	updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	PRIMARY KEY(id),
	FOREIGN KEY(customer_id) REFERENCES customer(id)
);
```

## 환경변수

```
PORT=

MYSQL_HOST=
MYSQL_PORT=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DATABASE=
```
