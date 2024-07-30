module.exports = function (router) {

    var userController = require('../controller/userController'); 
    var {isAuthenticated, isAdmin} = require('../middleware/auth');
    
    router.get('/api/user/admin-all-users', isAuthenticated, isAdmin("Admin"), userController.getAllUser);
    router.post('/api/user/create-user', userController.createUser);
    router.post('/api/user/activation', userController.activateUser);
    router.post('/api/user/login-user', userController.login);
    router.get('/api/user/getuser', isAuthenticated, userController.getUserInfor);
    router.get('/api/user/logout', userController.logout);
    router.put('/api/user/update-user-info', isAuthenticated, userController.updateUserInfor);
    router.put('/api/user/update-avatar', isAuthenticated, userController.updateUserAvatar);
    router.put('/api/user/update-user-addresses', isAuthenticated, userController.updateUserAddress);
    router.delete('/api/user/delete-user-address/:id', isAuthenticated, userController.deleteUserAddress);
    router.put('/api/user/update-user-password', isAuthenticated, userController.updateUserPassword);
    router.get('/api/user/user-info/:id', userController.getUserById);
    router.delete('/api/user/delete-user/:id', isAuthenticated, isAdmin("Admin"), userController.deleteUser);
}