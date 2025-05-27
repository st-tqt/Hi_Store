import cartService from "../service/cartService";

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

const handleAddToCart = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.render("login.ejs", {
        errCode: 1,
        errMessage: "Vui lòng đăng nhập thêm vào giỏ hàng!"
      });
    }

    const userId = req.session.user.id;
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({ errCode: 2, message: "Thiếu thông tin sản phẩm" });
    }

    await cartService.addToCart(userId, productId, quantity || 1);

    const parsedQuantity = parseInt(quantity);
    req.session.cart.quantity += parsedQuantity;

    return res.redirect('/san-pham');
  } catch (e) {
    return res.status(500).json({ errCode: 3, message: e.message || "Lỗi máy chủ" });
  }
};

const handleDeleteCartItem = async (req, res) => {
  const id = req.query.id;
  const result = await cartService.deleteCartItemService(id);
  req.session.cart.quantity -= result;
  return res.redirect("/gio-hang");
}

module.exports = {
  handleAddToCart,
  handleGetCart,
  handleDeleteCartItem
};