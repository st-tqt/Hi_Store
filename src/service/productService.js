import db from "../models/index";

let getAllProductService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = [];
            if (data === 'all') {
                products = db.Product.findAll({
                    raw: true,
                });
            }
            else if (data === 'up') {
                products = db.Product.findAll({
                    order: [['price', 'ASC']],
                    raw: true,
                });
            }
            else if (data === 'down') {
                products = db.Product.findAll({
                    order: [['price', 'DESC']],
                    raw: true,
                });
            }
            else if (data === 'hat') {
                products = db.Product.findAll({
                    where: {description: 'Mũ'},
                    raw: true,
                });
            }
            else if (data === 'shirt') {
                products = db.Product.findAll({
                    where: {description: 'Áo'},
                    raw: true,
                });
            }
            else if (data === 'bag') {
                products = db.Product.findAll({
                    where: {description: 'Túi'},
                    raw: true,
                });
            }
            else if (data === 'bear') {
                products = db.Product.findAll({
                    where: {description: 'Gấu'},
                    raw: true,
                });
            }
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

let searchProductByName = (searchTerm) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = '';

            if (!searchTerm || typeof searchTerm !== 'string' || searchTerm.trim() === '') {
                resolve(products); // Trả về mảng rỗng nếu không có từ khóa hợp lệ
                return;
            } 

            products = await db.Product.findAll({
                where: {
                    name: {
                        [db.Sequelize.Op.like]: `%${searchTerm.trim()}%` // Tìm kiếm tên chứa chuỗi searchTerm, không phân biệt hoa thường
                    }
                },
                raw: true
            });
            resolve(products);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getAllProductService,
    getProductById,
    searchProductByName
}