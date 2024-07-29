const User = require("../model/user");
// all users --- for admin
exports.getAllUser = async function (req, res) {
  try {
    const users = await User.find().sort({
      createdAt: -1,
    });
    return res.status(201).json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(500).json({error: error});
  }
};
