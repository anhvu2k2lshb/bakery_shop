module.exports = function (router) {

    var eventController = require('../controller/eventController'); 
    var {isAdmin, isSeller, isAuthenticated} = require("../middleware/auth");

    router.post('/api/event/create-event', isAuthenticated, eventController.createEvent);
    router.get('/api/event/get-all-events', eventController.getAllEventForBuyer);
    router.get('/api/event/get-all-events/:id', eventController.getAllEventOfShop);
    router.delete('/api/event/delete-shop-event/:id', eventController.deleteEventOfShop);
    router.get('/api/event/admin-all-events', isAuthenticated, isAdmin("Admin"), eventController.getAllEventForAdmin);
}