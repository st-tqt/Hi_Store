import db from "../models/index";

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

let getProductById = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = await db.Product.findOne({
                where: { id: productId },
                raw: true
            });

            if (product) {
                resolve(product);
            }
            else {
                resolve([]);
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllProductService,
    getProductById
}