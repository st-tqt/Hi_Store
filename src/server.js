import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();
import bodyParser from "body-parser";
import connection from "./config/connectDB";
import session from 'express-session';

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cấu hình session
app.use(session({
    secret: 'your-secret-key', // Thay bằng chuỗi ngẫu nhiên
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Truyền session vào tất cả template
app.use((req, res, next) => {
    res.locals.session = req.session; // Đảm bảo dòng này có
    next();
});

// config view engine
configViewEngine(app);

connection();

// init web routes
initWebRoutes(app);

app.listen(PORT, () => {
    console.log(">>> BE is running on the port = " + PORT);
})