import userService from "../service/userService";

const handleGetHomePage = (req, res) => {
    return res.render("home.ejs");
}

const handleGetProduct = (req, res) => {
    return res.render("product.ejs");
}

const handleGetContact = (req, res) => {
    return res.render("contact.ejs");
}

const handleGetNews = (req, res) => {
    return res.render("news.ejs");
}

const handleGetIntroduce = (req, res) => {
    return res.render("introduce.ejs");
}

const handleGetRecruit = (req, res) => {
    return res.render("recruit.ejs");
}

const handleRegisterAccount = (req, res) => {
    return res.render("register.ejs");
}

// const handleUserPage = (req, res) => {
//     return res.render("user.ejs");
// }

// const handleCreateNewUser = (req, res) => {
//     let email = req.body.email;
//     let password = req.body.password;
//     let username = req.body.username;

//     userService.createNewUser(email, password, username);

//     return res.send("handleCreateNewUser");
// }

// const handleGetUserList = async (req, res) => {
//     let data = await userService.getUserList();
//     return res.send(data);
// }

module.exports = {
    handleGetHomePage,
    handleGetProduct,
    handleGetContact,
    handleGetNews,
    handleGetIntroduce,
    handleGetRecruit,
    handleRegisterAccount
    // handleUserPage,
    // handleCreateNewUser,
    // handleGetUserList
}