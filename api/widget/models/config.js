var mysql = require('mysql');

var con

connectToMySQL()
connectAndCreateDatabase()

function connectToMySQL() {
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
}

function connectAndCreateDatabase() {
    // Connect and create database "api_widget" if needed
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected to MySQL.");
        con.query("CREATE DATABASE IF NOT EXISTS api_widget", function (err, result) {
            if (err) throw err;
            console.log("Database api_widget created");
            connectToDatabase()
        });
    });
}

function connectToDatabase() {
    // Connection to database
    if (process.env.DEV_ENV == "TRUE") {
        console.log("Connecting to local api_widget database")
        con = mysql.createConnection({
            host: "database",
            user: process.env.USER_DATABASE || "root",
            password: process.env.PASSWORD_DATABASE || "test",
            database: "api_widget",
        });
    } else {
        console.log("Connecting to production api_widget database")
        con = mysql.createConnection({
            host: "34.76.133.198", // TODO: Use environment variable
            user: process.env.USER_DATABASE || "root",
            password: process.env.PASSWORD_DATABASE || "test",
            database: "api_widget",
        });
    }
    connectAndCreateTable()
}

function connectAndCreateTable() {
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected to database api_widget.");
        con.changeUser({ database: "api_widget" }, function (err) {
            tableServiceCreate()
        })
    });
}

function tableServiceCreate() {
    let sqlTableService = "CREATE TABLE IF NOT EXISTS services (id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL)";
    con.query(sqlTableService, function (err, result) {
        if (err) throw err;
        console.log("Table service created");
        tableWidgetCreate()
    });
}

function tableWidgetCreate() {
    let sqlTableWidget = "CREATE TABLE IF NOT EXISTS widgets (id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT, service_id INT(11) NOT NULL, name VARCHAR(255) NOT NULL, description TEXT, CONSTRAINT fk_service_id FOREIGN KEY (service_id) REFERENCES services(id))";
    con.query(sqlTableWidget, function (err, result) {
        if (err) throw err;
        console.log("Table widgets created");
        tableWidgetUserCreate()
    });
}

function tableWidgetUserCreate() {
    let sqlTableWidgetsUser = "CREATE TABLE IF NOT EXISTS widgets_user (id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT, position INT(11) NOT NULL, user_id INT(11) NOT NULL, widget_id INT(11) NOT NULL, CONSTRAINT fk_widget_id FOREIGN KEY (widget_id) REFERENCES widgets(id), CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES api_users.users(id))";
    con.query(sqlTableWidgetsUser, function (err, result) {
        if (err) throw err;
        console.log("Table widgets_user created");
        tableWidgetParamsCreate()
    });
}

function tableWidgetParamsCreate() {
    let sqlTableWidgetParams = "CREATE TABLE IF NOT EXISTS widget_params (id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, widget_id INT(11) NOT NULL, CONSTRAINT fk_widget_id_params FOREIGN KEY (widget_id) REFERENCES widgets(id))";
    con.query(sqlTableWidgetParams, function (err, result) {
        if (err) throw err;
        console.log("Table widget_params created");
        tableWidgetUserParamsCreate()
    });
}

function tableWidgetUserParamsCreate() {
    let sqlTableWidgetUserParams = "CREATE TABLE IF NOT EXISTS widget_user_params (id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT, value VARCHAR(255) NOT NULL, user_widget_id INT(11) NOT NULL, widget_param_id INT(11) NOT NULL, user_id INT(11) NOT NULL, CONSTRAINT fk_user_widget_id FOREIGN KEY (user_widget_id) REFERENCES widgets_user(id), CONSTRAINT fk_user_widget_param_id FOREIGN KEY (widget_param_id) REFERENCES widget_params(id), CONSTRAINT fk_user_id_params FOREIGN KEY (user_id) REFERENCES api_users.users(id))";
    con.query(sqlTableWidgetUserParams, function (err, result) {
        if (err) throw err;
        console.log("Table widget_user_params created");
    });
}

module.exports = { con }