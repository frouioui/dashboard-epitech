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
            con.end()
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
    connectWidgetDB().then(function (res) {
        checkIfDBExists().then(function (res) {
            if (res == false) {
                console.log("Dabatase does not exist ... we are creating it ;) ...")
                startCreationTables().then(function (d) {
                    insertDefaultDataIntoTableService().then(function (d) {
                        insertDefaultDataIntoTableWidgets().then(function (d) {
                            console.log("... database ready!")
                        }).catch((err) => setImmediate(() => { throw err; }))
                    }).catch((err) => setImmediate(() => { throw err; }))
                }).catch((err) => setImmediate(() => { throw err; }))
            }
        }).catch((err) => setImmediate(() => { console.log(err); }))
    }).catch((err) => setImmediate(() => { console.log(err); }))
}

function insertDefaultDataIntoTableService() {
    return new Promise(function (resolve, reject) {
        var sql = 'INSERT INTO services (name) VALUES ("intra"), ("news")'
        con.query(sql, function (err, res) {
            if (err) { return reject(err) }
            return resolve(res)
        })
    })
}

function insertDefaultDataIntoTableWidgets() {
    return new Promise(function (resolve, reject) {
        var sql = 'INSERT INTO widgets (service_id, name, description) VALUES ' +
            '(1, \"GPA and Credits\", \"Display your GPA and credits\"),' +
            '(1, \"Marks\", \"Display your last marks\"),' +
            '(1, \"Logtime\", \"Display your logtime for the last 7 days\"),' +
            '(2, \"Search news\", \"Display news corresponding to your search\"),' +
            '(2, \"Headlines news\", \"Display the headlines corresponding to a search\"),' +
            '(2, \"Headlines country\", \"Display the headlines in a country\")'
        con.query(sql, function (err, res) {
            if (err) { return reject(err) }
            console.log("Default data inserted")
            return resolve(res)
        })
    })
}

function checkIfDBExists() {
    return new Promise(function (resolve, reject) {
        console.log("Checking if tables exist ...")
        con.query("SHOW TABLES", function (err, res) {
            if (err) return reject(err)
            if (res == null || res.length == 0) {
                return resolve(false)
            }
            console.log("... everything exists, ready to go! :D")
            return resolve(true)
        })
    })
}

function connectWidgetDB() {
    return new Promise(function (resolve, reject) {
        con.connect(function (err) {
            if (err) return reject(err);
            console.log("Connected to database api_widget.");
            con.changeUser({ database: "api_widget" }, function (err) {
                if (err) return reject(err);
                return resolve(true)
            })
        });
    })
}

function startCreationTables() {
    return new Promise(function (resolve, reject) {
        tableServiceCreate().then(function (d) {
            return resolve(true)
        }).catch((err) => setImmediate(() => { reject(err); }))
    })
}

function tableServiceCreate() {
    return new Promise(function (resolve, reject) {
        let sqlTableService = "CREATE TABLE IF NOT EXISTS services (id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL)";
        con.query(sqlTableService, function (err, result) {
            if (err) throw err;
            console.log("Table service created");
            tableWidgetCreate().then(function (d) {
                return resolve(true)
            }).catch((err) => setImmediate(() => { reject(err); }))
        });
    })
}

function tableWidgetCreate() {
    return new Promise(function (resolve, reject) {
        let sqlTableWidget = "CREATE TABLE IF NOT EXISTS widgets (id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT, service_id INT(11) NOT NULL, name VARCHAR(255) NOT NULL, description TEXT, CONSTRAINT fk_service_id FOREIGN KEY (service_id) REFERENCES services(id))";
        con.query(sqlTableWidget, function (err, result) {
            if (err) { reject(err); };
            console.log("Table widgets created");
            tableWidgetUserCreate().then(function (d) {
                return resolve(true)
            }).catch((err) => setImmediate(() => { reject(err); }))
        });
    })
}

function tableWidgetUserCreate() {
    return new Promise(function (resolve, reject) {
        let sqlTableWidgetsUser = "CREATE TABLE IF NOT EXISTS widgets_user (id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT, position INT(11) NOT NULL, user_id INT(11) NOT NULL, widget_id INT(11) NOT NULL, CONSTRAINT fk_widget_id FOREIGN KEY (widget_id) REFERENCES widgets(id), CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES api_users.users(id))";
        con.query(sqlTableWidgetsUser, function (err, result) {
            if (err) { reject(err); };
            console.log("Table widgets_user created");
            tableWidgetParamsCreate().then(function (d) {
                return resolve(true)
            }).catch((err) => setImmediate(() => { reject(err); }))
        });
    })
}

function tableWidgetParamsCreate() {
    return new Promise(function (resolve, reject) {
        let sqlTableWidgetParams = "CREATE TABLE IF NOT EXISTS widget_params (id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, widget_id INT(11) NOT NULL, CONSTRAINT fk_widget_id_params FOREIGN KEY (widget_id) REFERENCES widgets(id))";
        con.query(sqlTableWidgetParams, function (err, result) {
            if (err) { reject(err); };
            console.log("Table widget_params created");
            tableWidgetUserParamsCreate().then(function (d) {
                return resolve(true)
            }).catch((err) => setImmediate(() => { reject(err); }))
        });
    })
}

function tableWidgetUserParamsCreate() {
    return new Promise(function (resolve, reject) {
        let sqlTableWidgetUserParams = "CREATE TABLE IF NOT EXISTS widget_user_params (id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT, value VARCHAR(255) NOT NULL, user_widget_id INT(11) NOT NULL, widget_param_id INT(11) NOT NULL, user_id INT(11) NOT NULL, CONSTRAINT fk_user_widget_id FOREIGN KEY (user_widget_id) REFERENCES widgets_user(id), CONSTRAINT fk_user_widget_param_id FOREIGN KEY (widget_param_id) REFERENCES widget_params(id), CONSTRAINT fk_user_id_params FOREIGN KEY (user_id) REFERENCES api_users.users(id))";
        con.query(sqlTableWidgetUserParams, function (err, result) {
            if (err) { reject(err); };
            console.log("Table widget_user_params created");
            return resolve(true)
        });
    })
}

module.exports = { con }