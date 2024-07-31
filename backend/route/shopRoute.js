module.exports = function (router) {

    var shopController = require('../controller/shopController'); 
    var {isAdmin, isSeller, isAuthenticated} = require('../middleware/auth');
    
    router.post('/api/shop/create-shop', shopController.createShop);
    router.post('/api/shop/activation', shopController.activateSellerUser);
    router.post('/api/shop/login-shop', shopController.login);
    router.get('/api/shop/getSeller', isSeller, shopController.getSellerInfor);
    router.get('/api/shop/logout', shopController.logoutFromSellerAccount);
    router.get('/api/shop/get-shop-info/:id', shopController.getSellerInforById);
    router.put('/api/shop/update-shop-avatar', isSeller , shopController.updateSellerAvatar);
    router.put('/api/shop/update-seller-info', isSeller, shopController.updateSellerInfor);
    router.get('/api/shop/admin-all-sellers', isAuthenticated , isAdmin("Admin"), shopController.getAllSellerAccount);
    router.delete('/api/shop/delete-seller/:id', isAuthenticated, isAdmin("Admin"), shopController.deleteSellerAccount);
    router.put('/api/shop/update-payment-methods', isSeller, shopController.updatePaymentMethod);
    router.delete('/api/shop/delete-withdraw-method', isSeller, shopController.deleteSellerWithdrawMethod);
}