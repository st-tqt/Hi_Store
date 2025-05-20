import userService from "../../service/userService";
import adminservice from "../service/adminService";
import upload from "../../middleware/multer";

const handleGetHomeAdmin = (req, res) => {
    return res.render("admin/homeAdmin.ejs");
}

const handleGetUserManage = async (req, res) => {
    const data = await adminservice.getAllUserService();
    return res.render('admin/userManage.ejs', {
        dataTable: data,
    });
}

const handleGetFormCreateNewUser = (req, res) => {
    return res.render("admin/createNewUser.ejs");
}

const handleCreateNewUser = async (req, res) => {
    const message = await userService.createUserService(req.body);
    if (message.errCode === 0) {
        return res.redirect('/admin/user');
    } else {
        return res.render('admin/createNewUser.ejs', { error: message.errMessage });
    }
}

const handleGetFormEditUser = async (req, res) => {
    const user = await adminservice.getUserInforById(req.query.id);
    return res.render("admin/editUser.ejs", {
        user: user,
    });
}

const handleEditUser = async (req, res) => {
    const data = req.body;
    const message = await adminservice.editUserService(data);
    return res.redirect("/admin/user");
}

const handleDeleteUser = async (req, res) => {
    const id = req.query.id;
    await adminservice.deleteUserService(id);
    return res.redirect("/admin/user");
}

// product
const handleGetProductManage = async (req, res) => {
    const data = await adminservice.getAllProductService();
    return res.render("admin/productManage.ejs", {
        dataTable: data
    });
}

const handleGetFormCreateNewProduct = (req, res) => {
    return res.render("admin/createNewProduct.ejs");
}

const handleCreateNewProduct = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log('Multer error:', err.message);
            return res.render("admin/createNewProduct.ejs", {
                error: err.message || "Lỗi khi upload ảnh!"
            });
        }
        const data = {
            ...req.body,
            image: req.file ? `/product/${req.file.filename}` : ''
        };
        try {
            await adminservice.createProductService(data);
            return res.redirect("/admin/product");
        } catch (e) {
            console.log('Error creating product:', e);
            return res.render("admin/createNewProduct.ejs", {
                error: "Lỗi khi tạo sản phẩm!"
            });
        }
    });
}

const handleDeleteProduct = async (req, res) => {
    const id = req.query.id;
    await adminservice.deleteProductService(id);
    return res.redirect("/admin/product");
}

module.exports = {
    handleGetHomeAdmin,
    handleGetProductManage,
    handleGetUserManage,
    handleGetFormCreateNewUser,
    handleCreateNewUser,
    handleGetFormEditUser,
    handleEditUser,
    handleDeleteUser,
    handleGetFormCreateNewProduct,
    handleCreateNewProduct,
    handleDeleteProduct
}