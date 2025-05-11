const express = require("express");
const cors = require("cors");
require("dotenv").config();
// ... (既存の require 文)
const authRoutes = require("./routes/authRoutes"); // 既存の認証ルート
const eslKeyRoutes = require("./routes/eslKeyRoutes"); // 新しいESLキールートをインポート

const app = express();

// ... (既存のミドルウェア設定: cors, express.json, express.urlencoded)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ルート設定
// ユーザー提供の既存のauthRoutesは "/" で登録されているため、それに合わせるか確認。
// ここでは、authRoutesが "/api/auth"のようなプレフィックスを持つと仮定します。
// もし "/" で登録されている場合、競合しないように注意が必要です。
// app.use("/api/auth", authRoutes); // 既存の認証ルートの例
app.use("/", authRoutes); // ユーザー提供のコードに基づき、ルートを "/" で登録
app.use("/api/esl-keys", eslKeyRoutes); // 新しいESLキー関連のルートを追加

// ... (既存のエラーハンドリングとサーバー起動処理)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "服务器内部错误",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,'0.0.0.0', () => {
  console.log(`服务器运行在端口 ${PORT}`);
});