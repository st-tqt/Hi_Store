import userService from "../../service/userService";
import adminservice from "../service/adminService";

const handleGetHomeAdmin = (req, res) => {
    return res.render("admin/homeAdmin.ejs");
}

const handleGetProductManage = (req, res) => {
    return res.render("admin/productManage.ejs");
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

module.exports = {
    handleGetHomeAdmin,
    handleGetProductManage,
    handleGetUserManage,
    handleGetFormCreateNewUser,
    handleCreateNewUser,
    handleGetFormEditUser,
    handleEditUser,
    handleDeleteUser
}