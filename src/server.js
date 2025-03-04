import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();
import bodyParser from "body-parser";
import connection from "./config/connectDB";
import { createJWT, verifyToken } from "./middleware/jwtAction";

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// config view engine
configViewEngine(app);

// createJWT();
// verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVFFUIiwiYWRkcmVzcyI6IlZQIiwiaWF0IjoxNzQxMDc5ODM0fQ.zVdLnwg7o-EpprnmF63DCo8FwlRFcVCIBjacUd-Qf-I");

connection();

// init web routes
initWebRoutes(app);

app.listen(PORT, () => {
    console.log(">>> BE is running on the port = " + PORT);
})