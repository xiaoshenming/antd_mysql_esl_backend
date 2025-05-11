const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// 公开路由
router.post("/api/register", authController.register);
router.post("/api/login", authController.login);
router.post("/api/logout", authController.logout);

// 受保护路由
router.get(
  "/api/currentUser",
  authMiddleware.protect,
  authController.getCurrentUser
);

// 管理员路由示例
router.get(
  "/api/admin/users",
  authMiddleware.protect,
  authMiddleware.restrictTo("admin"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "只有管理员可以访问此路由",
    });
  }
);

module.exports = router;
