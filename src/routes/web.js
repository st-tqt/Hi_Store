import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController";
import adminController from "../admin/controller/adminController";

const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", homeController.handleGetHomePage);
    router.get("/san-pham", homeController.handleGetProduct);
    router.get("/lien-he", homeController.handleGetContact);
    router.get("/tin-tuc", homeController.handleGetNews);
    router.get("/gioi-thieu", homeController.handleGetIntroduce);
    router.get("/tuyen-dung", homeController.handleGetRecruit);

    router.get("/account/login", homeController.handleLoginAccount);
    router.post("/account/login-user", userController.handleLoginUser);
    router.get("/account/register", homeController.handleRegisterAccount);
    router.post("/account/create-new-user", userController.handleCreateNewUser);

    router.get("/account/profile", userController.handleGetProfile);
    router.get("/account/logout", userController.handleLogoutUser);

    // admin
    router.get("/admin/home", adminController.handleGetHomeAdmin);
    router.get("/admin/product", adminController.handleGetProductManage);

    router.get("/admin/user", adminController.handleGetUserManage);

    router.get("/admin/form-create-new-user", adminController.handleGetFormCreateNewUser);
    router.post("/admin/create-new-user", adminController.handleCreateNewUser);
    
    router.get("/admin/form-edit-user", adminController.handleGetFormEditUser);
    router.post("/admin/edit-user", adminController.handleEditUser);
    
    router.get("/admin/delete-user", adminController.handleDeleteUser);

    return app.use("/", router);
}

export default initWebRoutes;