const Shop = require("../model/shop");
const Event = require("../model/event");
const { isSeller, isAdmin, isAuthenticated } = require("../middleware/auth");
const cloudinary = require("cloudinary");

// create event
exports.createEvent = async (req, res) => {
  try {
    const shopId = req.body.shopId;
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(400).json({
        success: false,
        message: "Tài khoản người bán không tồn tại.",
      });
    } else {
      let images = [];

      if (typeof req.body.images === "string") {
        images.push(req.body.images);
      } else {
        images = req.body.images;
      }

      const imagesLinks = [];

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }

      const productData = req.body;
      productData.images = imagesLinks;
      productData.shop = shop;

      const event = await Event.create(productData);
      return res.status(201).json({
        success: true,
        event,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

// get all events
exports.getAllEventForBuyer = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

// get all events of a shop
exports.getAllEventOfShop = async (req, res) => {
  try {
    const events = await Event.find({ shopId: req.params.id });

    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

// delete event of a shop
exports.deleteEventOfShop = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
   
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sự kiện cần x",
      });
    }
    
    for (let i = 0; i < event.images.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        event.images[i].public_id
      );
    }
   
    await Event.findByIdAndDelete(req.params.id);
    
    return res.status(201).json({
      success: true,
      message: "Đã xóa sự kiện thành công!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

// get all events for admin
exports.getAllEventForAdmin = async (req, res, next) => {
  try {
    const events = await Event.find().sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};
