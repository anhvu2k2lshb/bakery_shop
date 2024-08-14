module.exports = function (router) {

    var productController = require('../controller/productController'); 
    var {isSeller, isAdmin, isAuthenticated} = require("../middleware/auth"); 
    
    router.post('/api/product/create-product', isSeller, productController.createProduct);
    router.get('/api/product/get-all-products-shop/:id', productController.getAllProductOfShop);
    router.delete('/api/product/delete-shop-product/:id', isSeller, productController.deleteProductOfShop);
    router.get('/api/product/get-all-products', productController.getAllProduct);
    router.put('/api/product/create-new-review', isAuthenticated, productController.createReviewForProduct);
}