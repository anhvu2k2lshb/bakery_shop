const path = require("path");
const jwt = require("jsonwebtoken");
const Shop = require("../model/shop");
const cloudinary = require("cloudinary");
const sendMail = require("../utils/sendMail");
const sendShopToken = require("../utils/sellerToken");

// create shop
exports.createShop = async (req, res) => {
  try {
    const { email } = req.body;
    const sellerEmail = await Shop.findOne({ email });
    if (sellerEmail) {
      return res.status(400).json({
        success: false,
        message: "Tài khoản người dùng đã tồn tại.",
      });
    }

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar);

    const seller = {
      name: req.body.name,
      email: email,
      password: req.body.password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
    };

    const activationToken = createActivationToken(seller);

    const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "Xác thực tài khoản người bán",
        message: `Xin chào ${seller.name}, vui lòng nhấn link sau để xác thực tài khoản: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Vui lòng kiểm tra email:- ${seller.email} để kích hoạt tài khoản!`,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error: " + error.message,
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.name + " " + error.message,
    });
  }
};

// create activation token
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate user
exports.activateSellerUser = async (req, res) => {
  try {
    const { activation_token } = req.body;

    const newSeller = jwt.verify(
      activation_token,
      process.env.ACTIVATION_SECRET
    );

    if (!newSeller) {
      return res.status(400).json({
        success: false,
        message: "Mã token không hợp lệ, vui lòng kiểm tra lại.",
      });
    }
    const { name, email, password, avatar, zipCode, address, phoneNumber } =
      newSeller;

    let seller = await Shop.findOne({ email: email });

    if (seller) {
      return res.status(400).json({
        success: false,
        message: "Tài khoản người dùng đã tồn tại.",
      });
    }

    seller = await Shop.create({
      name,
      email,
      avatar,
      password,
      zipCode,
      address,
      phoneNumber,
    });

    sendShopToken(seller, 201, res);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

// login seller account
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng điền đầy đủ thông tin.",
      });
    }

    const user = await Shop.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Tài khoản người dùng không tồn tại, vui lòng kiểm tra lại.",
      });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Mật khẩu nhập sai, vui lòng kiểm tra lại.",
      });
    }

    sendShopToken(user, 201, res);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

// get seller information
exports.getSellerInfor = async (req, res) => {
  try {
    const seller = await Shop.findById(req.seller._id);

    if (!seller) {
      return res.status(400).json({
        success: false,
        message: "Tài khoản người dùng không tồn tại.",
      });
    }

    res.status(200).json({
      success: true,
      seller,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

// log out from seller account
exports.logoutFromSellerAccount = async (req, res) => {
  try {
    res.cookie("seller_token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(201).json({
      success: true,
      message: "Đăng xuất thành công!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

// get seller account info by id
exports.getSellerInforById = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    res.status(201).json({
      success: true,
      shop,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

// update seller avatar
exports.updateSellerAvatar = async (req, res) => {
  try {
    let existsSeller = await Shop.findById(req.seller._id);

    const imageId = existsSeller.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
    });

    existsSeller.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };

    await existsSeller.save();

    res.status(200).json({
      success: true,
      seller: existsSeller,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

// update seller infor
exports.updateSellerInfor = async (req, res) => {
  try {
    const { name, description, address, phoneNumber, zipCode } = req.body;

    const shop = await Shop.findOne(req.seller._id);

    if (!shop) {
      return res.status(400).json({
        success: false,
        message: "Tài khoản người dùng không tồn tại.",
      });
    }

    shop.name = name;
    shop.description = description;
    shop.address = address;
    shop.phoneNumber = phoneNumber;
    shop.zipCode = zipCode;

    await shop.save();

    res.status(201).json({
      success: true,
      shop,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

// get all seller account
exports.getAllSellerAccount = async (req, res) => {
  try {
    const sellers = await Shop.find().sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      sellers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

// delete seller account
exports.deleteSellerAccount = async (req, res) => {
  try {
    const seller = await Shop.findById(req.params.id);

    if (!seller) {
      return res.status(400).json({
        success: false,
        message: "Tài khoản người bán không tồn tại.",
      });
    }

    await Shop.findByIdAndDelete(req.params.id);

    res.status(201).json({
      success: true,
      message: "Xóa tài khoản người bán thành công!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

// update seller withdraw methods
exports.updatePaymentMethod = async (req, res) => {
  try {
    const { withdrawMethod } = req.body;

    const seller = await Shop.findByIdAndUpdate(req.seller._id, {
      withdrawMethod,
    });

    res.status(201).json({
      success: true,
      seller,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

// delete seller withdraw merthods
exports.deleteSellerWithdrawMethod = async (req, res) => {
  try {
    const seller = await Shop.findById(req.seller._id);

    if (!seller) {
      return res.status(400).json({
        success: false,
        message: "Tài khoản người bán không tồn tại.",
      });
    }

    seller.withdrawMethod = null;

    await seller.save();

    res.status(201).json({
      success: true,
      seller,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};
