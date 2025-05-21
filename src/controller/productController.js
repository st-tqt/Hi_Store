import productService from "../service/productService";

const handleGetProduct = async (req, res) => {
    const data = await productService.getAllProductService(req.query.action ? req.query.action : 'all');
    return res.render("product.ejs", {
        dataTable: data
    });
}

const handleGetProductDetail = async (req, res) => {
    const data = await productService.getProductById(req.query.id);
    return res.render("productDetail.ejs", {
        product: data
    });
}

module.exports = {
    handleGetProduct,
    handleGetProductDetail
}