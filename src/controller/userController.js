import userService from "../service/userService";
import cartService from "../service/cartService";

const handleCreateNewUser = async (req, res) => {
    let message = await userService.createUserService(req.body);
    if (message.errCode === 0) {
            return res.redirect('/account/login'); 
        } else {
            return res.render('register.ejs', { error: message.errMessage });
        }
}

let handleLoginUser = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }

    let userData = await userService.loginUserService(email, password);
    if (userData.errCode === 0) {
        req.session.user = {
            id: userData.user.id,
            email: userData.user.email,
            firstName: userData.user.firstName,
            lastName: userData.user.lastName,
            phoneNumber: userData.user.phoneNumber,
            roleId: userData.user.roleId
        };

        const cart = await cartService.getCartByUserId(userData.user.id);
        const totalQuantity = cart.items.reduce((sum, item) => sum + (item.quantity || 0), 0);
        req.session.cart = {
            quantity: totalQuantity
        }
        
        return res.redirect('/account/profile'); 
    } else {
        return res.render('login.ejs', {
            errCode: userData.errCode,
            errMessage: userData.errMessage,
            email: email, 
            password: '' 
        });
    }
}

const handleGetProfile = (req, res) => {
    return res.render('profile.ejs');
}

const handleLogoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Lỗi khi đăng xuất:', err);
            return res.status(500).json({ message: 'Lỗi khi đăng xuất' });
        }
        res.redirect('/account/login');
    });
};

module.exports = {
    handleCreateNewUser,
    handleLoginUser,
    handleGetProfile,
    handleLogoutUser
}