module.exports = function (router) {

    var userController = require('../controller/userController'); 
    
    router.get('/api/user/userList', userController.getAllUser);
}