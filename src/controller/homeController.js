
const handleGetHomePage = (req, res) => {
    return res.render("home.ejs");
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

const handleGetCart = (req, res) => {
    return res.render("cart.ejs");
}

module.exports = {
    handleGetHomePage,
    handleGetContact,
    handleGetNews,
    handleGetIntroduce,
    handleGetRecruit,
    handleRegisterAccount,
    handleLoginAccount,
    handleGetCart
}