const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token;

  // 从请求头获取token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "未授权访问，请先登录",
    });
  }

  try {
    // 验证token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 获取用户信息
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: "error",
        message: "此令牌的用户不存在",
      });
    }

    // 将用户信息添加到请求对象
    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: "令牌无效或已过期",
    });
  }
};

// 角色授权中间件
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "error",
        message: "您没有权限执行此操作",
      });
    }
    next();
  };
};
