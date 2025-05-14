import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController";

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

    return app.use("/", router);
}

export default initWebRoutes;