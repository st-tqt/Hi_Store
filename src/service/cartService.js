import db from "../models/index";

const getCartByUserId = async (userId) => {
    try {
        const cart = await db.Cart.findOne({
            where: { userId: userId },
            include: [
                {
                    model: db.CartItem,
                    as: 'items',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: [
                        {
                            model: db.Product,
                            as: 'product',
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            },
                        }
                    ]
                }
            ],
            nest: true
        });

        if (!cart) {
            return { items: [] };
        }

        return { items: cart.items || [] };
    } catch (e) {
        throw e;
    }
};

const addToCart = async (userId, productId, quantity = 1) => {
    try {
        // Tìm giỏ hàng của người dùng
        let cart = await db.Cart.findOne({
            where: { userId: userId }
        });

        // Nếu chưa có giỏ hàng, tạo mới
        if (!cart) {
            cart = await db.Cart.create({ 
                userId: userId 
            });
        }

        // Kiểm tra sản phẩm có tồn tại không
        const product = await db.Product.findOne({
            where: { id: productId }
        });

        if (!product) {
            throw new Error("Sản phẩm không tồn tại");
        }

        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        let cartItem = await db.CartItem.findOne({
            where: {
                cartId: cart.id,
                productId: productId
            }
        });

        if (cartItem) {
            // Nếu sản phẩm đã có, tăng số lượng
            const parsedQuantity = parseInt(quantity);
            cartItem.quantity += parsedQuantity;
            await cartItem.save();
        } else {
            // Nếu chưa có, tạo mới mặt hàng trong giỏ
            cartItem = await db.CartItem.create({
                cartId: cart.id,
                productId: productId,
                quantity: quantity
            });
        }

        return cartItem;
    } catch (e) {
        throw e;
    }
};

let deleteCartItemService = (CartItemId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let cartItem = await db.CartItem.findOne({
                where: { id: CartItemId }
            })

            if (cartItem) {
                await cartItem.destroy();
            }

            resolve();
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    addToCart,
    getCartByUserId,
    deleteCartItemService
};