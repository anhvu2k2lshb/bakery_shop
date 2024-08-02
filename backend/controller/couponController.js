const CoupounCode = require("../model/couponCode");

// create coupon code
exports.createCouponCode = async (req, res) => {
  try {
    const isCoupounCodeExists = await CoupounCode.find({
      name: req.body.name,
    });

    if (isCoupounCodeExists.length !== 0) {
      return res.status(400).json({
        success: false,
        message: "Mã giảm giá đã tồn tại, vui lòng kiểm tra lại.",
      });
    }

    const coupounCode = await CoupounCode.create(req.body);

    res.status(201).json({
      success: true,
      coupounCode,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

// get all coupons of a shop
exports.getAllCouponByShopId = async (req, res) => {
  try {
    const couponCodes = await CoupounCode.find({ shopId: req.seller.id });
    res.status(201).json({
      success: true,
      couponCodes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

// delete coupoun code of a shop
exports.deleteCouponOfShop = async (req, res) => {
  try {
    const couponCode = await CoupounCode.findByIdAndDelete(req.params.id);

    if (!couponCode) {
      return res.status(400).json({
        success: false,
        message: "Mã giảm giá không tồn tại.",
      });
    }
    res.status(201).json({
      success: true,
      message: "Đã xóa mã giảm giá thành công!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

// get coupon code value by its name
exports.getCouponCodeByName = async (req, res) => {
  try {
    const couponCode = await CoupounCode.findOne({ name: req.params.name });

    res.status(200).json({
      success: true,
      couponCode,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};
