import bcrypt from "bcryptjs";
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