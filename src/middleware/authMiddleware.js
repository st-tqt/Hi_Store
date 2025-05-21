const differentiateUserAdmin = (req, res, next) => {
    if (req.session && req.session.user) {
        // Người dùng đã đăng nhập
        req.isAuthenticated = true;
        req.userId = req.session.user.id;

        // Kiểm tra vai trò (giả định role là 'admin' hoặc 'user')
        if (req.session.user.roleId === 1) {
            req.userType = 'admin';
        } else {
            req.userType = 'user';
        }

        // Kiểm tra quyền truy cập vào route /admin/*
        if (req.path.startsWith('/admin/') && req.userType !== 'admin') {
            // Nếu không phải admin, trả về lỗi hoặc chuyển hướng
            return res.status(403).render('error.ejs', {
                errCode: 403,
                errMessage: 'Bạn không không thể truy cập trang web này!'
            });
        }
    } else {
        // Người dùng chưa đăng nhập
        req.isAuthenticated = false;
        req.userType = 'guest';
        req.userId = null;

        // Hạn chế truy cập /admin/* nếu chưa đăng nhập
        if (req.path.startsWith('/admin/')) {
            return res.redirect('/account/login');
        }
    }

    next(); // Tiếp tục xử lý yêu cầu
};

module.exports = { 
    differentiateUserAdmin 
};