module.exports = function (router) {

    var orderController = require('../controller/orderController'); 
    var { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
    
    router.post('/api/order/create-order', orderController.createOrder);
    router.get('/api/order/get-all-orders/:id', orderController.getAllOrderByUserId);
    router.get('/api/order/get-seller-all-orders/:id', orderController.getAllOrderByShopId);
    router.put('/api/order/update-order-status/:id', isSeller ,orderController.updateOrderStatus);
    router.put('/api/order/order-refund/:id', orderController.createRefundRequest);
    router.put('/api/order/order-refund-success/:id', isSeller, orderController.acceptRefundRequest);
    router.get('/api/order/admin-all-orders', isAuthenticated, isAdmin("Admin") ,orderController.getAllOrder);






}