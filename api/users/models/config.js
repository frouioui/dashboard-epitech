var mysql = require('mysql');

var con

// Connection to MySQL Server
if (process.env.DEV_ENV == "TRUE") {
    console.log("Connecting to local MySQL")
    con = mysql.createConnection({
        host: "database",
        user: process.env.USER_DATABASE || "root",
        password: process.env.PASSWORD_DATABASE || "test",
    });
} else {
    console.log("Connecting to production MySQL")
    con = mysql.createConnection({
        host: "34.76.133.198", // TODO: Use environment variable
        user: process.env.USER_DATABASE || "root",
        password: process.env.PASSWORD_DATABASE || "test",
    });
}

// Connect and create database "api_users" if needed
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to MySQL.");
    con.query("CREATE DATABASE IF NOT EXISTS api_users", function (err, result) {
        if (err) throw err;
        console.log("Database api_users created");
    });
});

con.end()

// Connection to database
if (process.env.DEV_ENV == "TRUE") {
    console.log("Connecting to local api_users database")
    con = mysql.createConnection({
        host: "database",
        user: process.env.USER_DATABASE || "root",
        password: process.env.PASSWORD_DATABASE || "test",
        database: "api_users",
    });
} else {
    console.log("Connecting to production api_users database")
    con = mysql.createConnection({
        host: "34.76.133.198", // TODO: Use environment variable
        user: process.env.USER_DATABASE || "root",
        password: process.env.PASSWORD_DATABASE || "test",
        database: "api_users",
    });
}

// Connect and create tables if needed
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to database api_users.");
    var sql = "CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, email varchar(255) NOT NULL, password varchar(255) NOT NULL, added_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table users created");
    });
});

module.exports = { con }