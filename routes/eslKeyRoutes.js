const express = require("express");
const eslKeyController = require("../controllers/eslKeyController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// スキャン入力用ルート (ログインユーザーなら誰でもアクセス可能)
router.post(
  "/scan",
  authMiddleware.protect, // このルートを保護
  eslKeyController.scanAndCreateEslKey
);

// --- 管理者向けCRUDルート ---
// 作成 (管理者のみ)
router.post(
  "/",
  authMiddleware.protect,
  authMiddleware.restrictTo("admin"),
  eslKeyController.createEslKey
);

// 一覧取得 (ログインユーザーなら誰でも)
router.get("/", authMiddleware.protect, eslKeyController.getEslKeys);

// IDで取得 (ログインユーザーなら誰でも)
router.get("/:id", authMiddleware.protect, eslKeyController.getEslKeyById);

// 更新 (管理者のみ)
router.put(
  "/:id",
  authMiddleware.protect,
  authMiddleware.restrictTo("admin"),
  eslKeyController.updateEslKey
);

// 削除 (管理者のみ)
router.delete(
  "/:id",
  authMiddleware.protect,
  authMiddleware.restrictTo("admin"),
  eslKeyController.deleteEslKey
);

module.exports = router;
