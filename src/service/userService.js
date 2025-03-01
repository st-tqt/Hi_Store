import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from 'bluebird';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPassword = hashUserPassword(password);
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'hi_store', Promise: bluebird });
    try {
        const [rows, fields] =
            await connection.execute('INSERT INTO users(email, password, username) VALUE(?, ?, ?)',
                [email, hashPassword, username]);
    } catch (error) {
        console.log(">>> check error: ", error);
    }
}

module.exports = {
    createNewUser
}