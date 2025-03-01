import bcrypt from "bcryptjs";
import mysql from "mysql2";

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'hi_store'
})

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = (email, password, username) => {
    let hashPassword = hashUserPassword(password);

    connection.query(
        'INSERT INTO users(email, password, username) VALUE(?, ?, ?)', [email, hashPassword, username]
    )
}

module.exports = {
    createNewUser
}