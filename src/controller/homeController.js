
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

const handleLoginAccount = (req, res) => {
    return res.render("login.ejs");
}

module.exports = {
    handleGetHomePage,
    handleGetProduct,
    handleGetContact,
    handleGetNews,
    handleGetIntroduce,
    handleGetRecruit,
    handleRegisterAccount,
    handleLoginAccount
}