module.exports = function (router) {

    var couponCodeController = require('../controller/couponController'); 
    var {isSeller} = require("../middleware/auth");
    router.post('/api/coupon/create-coupon-code', isSeller ,couponCodeController.createCouponCode);
    router.get('/api/coupon/get-coupon/:id', isSeller ,couponCodeController.getAllCouponByShopId);
    router.delete('/api/coupon/delete-coupon/:id', isSeller ,couponCodeController.deleteCouponOfShop);
    router.get('/api/coupon/get-coupon-value/:name' ,couponCodeController.getCouponCodeByName);
}