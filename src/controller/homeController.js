import userService from "../service/userService";

const handleHelloworld = (req, res) => {
    return res.render("home.ejs");
}

const handleUserPage = (req, res) => {
    return res.render("user.ejs");
}

const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    userService.createNewUser(email, password, username);

    return res.send("handleCreateNewUser");
}

const handleGetUserList = async (req, res) => {
    let data = await userService.getUserList();
    return res.send(data);
}

module.exports = {
    handleHelloworld,
    handleUserPage,
    handleCreateNewUser,
    handleGetUserList
}