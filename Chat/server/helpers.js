let MySQLi = require("mysqli")

let conn = new MySQLi({
    host:"localhost",
    post:"3306",
    user:"root",
    passwd:"",
    db:"affablebean"
})

let db = conn.emit(false,"");

module.exports = {
    database:db
}
