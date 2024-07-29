module.exports = function (router) {

    var productController = require('../controller/productController'); 
    
    router.get('/api/product/productList', productController.getAllProduct);
}