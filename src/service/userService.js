import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from 'bluebird';
import db from '../models/index'

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPassword = hashUserPassword(password);

    try {
        await db.User.create({
            email: email,
            password: hashPassword,
            username: username,
        })
    } catch (error) {
        console.log(">>> check error: ", error);
    }
}

const getUserList = async () => {
    let users = [];
    users = await db.User.findAll();
    return users;
}

module.exports = {
    createNewUser,
    getUserList
}