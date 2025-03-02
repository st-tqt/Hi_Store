import express from "express";
import homeController from "../controller/homeController";

const router = express.Router();

/**
 * 
 * @param {*} app : express app 
 */
const initWebRoutes = (app) => {
    router.get("/", homeController.handleHelloworld);
    router.get("/user", homeController.handleUserPage);
    router.get("/user/get-user", homeController.handleGetUserList);
    router.post("/user/create-user", homeController.handleCreateNewUser);

    return app.use("/", router);
}

export default initWebRoutes;