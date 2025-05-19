import db from "../../models/index";

let getAllUserService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let getUserInforById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true
            });

            if (user) {
                resolve(user);
            }
            else {
                resolve([]);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let editUserService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameters!"
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            })

            if (user) {
                await user.update({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phonenumber: data.phonenumber,
                })

                resolve({
                    errCode: 0,
                    message: "Update thành công",
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: "Không tìm thấy user",
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUserService = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })

            if (user) {
                await user.destroy();
            }

            resolve();
        } catch (e) {
            reject(e);
        }
    })
}

let getAllProductService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = db.Product.findAll({
                raw: true,
            });
            resolve(products);
        } catch (e) {
            reject(e);
        }
    })
}

let createProductService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Product.create({
                code: data.code,
                name: data.name,
                description: data.description,
                price: data.price,
                quantity: data.quantity,
                image: data.image
            })

            resolve({
                errCode: 0,
                message: 'OK',
            })
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllUserService,
    getUserInforById,
    editUserService,
    deleteUserService,
    getAllProductService,
    createProductService
}