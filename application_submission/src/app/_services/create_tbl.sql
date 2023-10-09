connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);

connection.query(`USE ${process.env.DB_NAME}`);
connection.query(`CREATE TABLE IF NOT EXISTS ${process.env.DB_TBL_USR}(
    firstName VARCHAR(26),
    lastName VARCHAR(26),
    email VARCHAR(50),
    filename VARCHAR(255),
    date CHAR(10))`
);