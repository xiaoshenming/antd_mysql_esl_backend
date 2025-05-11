const express = require("express");
const eslKeyController = require("../controllers/eslKeyController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// スキャン入力 (ログインユーザーなら誰でもアクセス可能: admin, user)
router.post(
  "/scan",
  authMiddleware.protect, // ログイン必須
  eslKeyController.scanAndCreateEslKey
);

// 作成 (ログインユーザーなら誰でもアクセス可能: admin, user)
router.post(
  "/",
  authMiddleware.protect, // ログイン必須
  eslKeyController.createEslKey
);

// 一覧取得 (ログインユーザーなら誰でもアクセス可能: admin, user)
router.get(
  "/",
  authMiddleware.protect, // ログイン必須
  eslKeyController.getEslKeys
);

// IDで取得 (ログインユーザーなら誰でもアクセス可能: admin, user)
router.get(
  "/:id",
  authMiddleware.protect, // ログイン必須
  eslKeyController.getEslKeyById
);

// 更新 (ログインユーザーなら誰でもアクセス可能: admin, user)
router.put(
  "/:id",
  authMiddleware.protect, // ログイン必須
  eslKeyController.updateEslKey
);

// 削除 (管理者(admin)のみアクセス可能)
router.delete(
  "/:id",
  authMiddleware.protect,
  authMiddleware.restrictTo("admin"), // 管理者ロールのみ許可
  eslKeyController.deleteEslKey
);

module.exports = router;
