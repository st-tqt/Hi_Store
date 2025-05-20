import session from "express-session";
import cartService from "../service/cartService";

const handleAddToCart = async (req, res) => {
  try {
    const userId = req.session.user.id; // Giả sử bạn lưu userId trong session sau khi đăng nhập
    const { productId, quantity } = req.body;

    if (!userId) {
      return res.status(401).json({ errCode: 1, message: "Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng" });
    }

    if (!productId) {
      return res.status(400).json({ errCode: 2, message: "Thiếu thông tin sản phẩm" });
    }

    await cartService.addToCart(userId, productId, quantity || 1);
    return res.status(200).json({ errCode: 0, message: "Thêm sản phẩm vào giỏ hàng thành công" });
  } catch (e) {
    return res.status(500).json({ errCode: 3, message: e.message || "Lỗi máy chủ" });
  }
};

const handleGetCart = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.render("login.ejs", {
        errCode: 1,
        errMessage: "Vui lòng đăng nhập để xem giỏ hàng!"
      });
    }
    const userId = req.session.user.id;

    const cart = await cartService.getCartByUserId(userId);
    return res.render("cart.ejs", { 
        cartItems: cart.items
    });
  } catch (e) {
    return res.status(500).json({ errCode: 3, message: e.message || "Lỗi máy chủ" });
  }
};

module.exports = {
  handleAddToCart,
  handleGetCart
};