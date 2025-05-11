const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 生成JWT令牌
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d", // 令牌有效期为1天
  });
};

// 注册新用户
exports.register = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;

    // 检查用户是否已存在
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "用户名已存在",
      });
    }

    // 创建新用户
    const newUser = await User.create({
      username,
      password,
      email,
      role,
    });

    // 生成JWT令牌
    const token = signToken(newUser.id);

    res.status(201).json({
      status: "ok",
      token,
      type: "account",
      currentAuthority: newUser.role,
      data: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      status: "error",
      message: "服务器错误，请稍后再试",
    });
  }
};

// 用户登录
exports.login = async (req, res) => {
  try {
    const { username, password, type } = req.body;

    // 检查用户是否存在
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(401).json({
        status: "error",
        type,
        currentAuthority: "guest",
        message: "用户名或密码不正确",
      });
    }

    // 验证密码
    const isPasswordCorrect = await User.comparePassword(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: "error",
        type,
        currentAuthority: "guest",
        message: "用户名或密码不正确",
      });
    }

    // 生成JWT令牌
    const token = signToken(user.id);

    res.status(200).json({
      status: "ok",
      type,
      currentAuthority: user.role,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      status: "error",
      message: "服务器错误，请稍后再试",
    });
  }
};

// 获取当前用户信息
exports.getCurrentUser = async (req, res) => {
  try {
    // 用户信息已在中间件中添加到req对象
    const user = req.user;

    // 转换为Ant Design Pro需要的格式
    res.status(200).json({
      success: true,
      data: {
        name: user.username,
        avatar:
          "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
        userid: user.id.toString(),
        email: user.email,
        signature: "",
        title: "",
        group: "",
        tags: [],
        notifyCount: 0,
        unreadCount: 0,
        country: "China",
        access: user.role,
        address: "",
        phone: "",
      },
    });
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({
      status: "error",
      message: "服务器错误，请稍后再试",
    });
  }
};

// 退出登录
exports.logout = (req, res) => {
  res.status(200).json({
    data: {},
    success: true,
  });
};
