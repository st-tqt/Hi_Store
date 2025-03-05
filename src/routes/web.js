import express from "express";
import homeController from "../controller/homeController";

const router = express.Router();

/**
 * 
 * @param {*} app : express app 
 */
const initWebRoutes = (app) => {
    router.get("/", homeController.handleGetHomePage);
    router.get("/san-pham", homeController.handleGetProduct);
    router.get("/lien-he", homeController.handleGetContact);
    router.get("/tin-tuc", homeController.handleGetNews);
    router.get("/gioi-thieu", homeController.handleGetIntroduce);
    router.get("/tuyen-dung", homeController.handleGetRecruit);

    router.get("/account/register", homeController.handleRegisterAccount);
    // router.get("/user", homeController.handleUserPage);
    // router.get("/user/get-user", homeController.handleGetUserList);
    // router.post("/user/create-user", homeController.handleCreateNewUser);

    return app.use("/", router);
}

export default initWebRoutes;