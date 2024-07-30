const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Shop = require("../model/shop");

exports.isAuthenticated = async(req,res,next) => {
    const {token} = req.cookies;

    if(!token){
        return res.status(401).json({
          success: false, 
          message: "Vui lòng đăng nhập để tiếp tục."
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);

    next();
};


exports.isSeller = async(req,res,next) => {
    const {seller_token} = req.cookies;
    if(!seller_token){
        return res.status(401).json({
          success: false, 
          message: "Vui lòng đăng nhập để tiếp tục."
        })
    }

    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);

    req.seller = await Shop.findById(decoded.id);

    next();
};


exports.isAdmin = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                success: false, 
                message: `${red.user.role} không có quyền truy cập.`
              })
        };
        next();
    }
}