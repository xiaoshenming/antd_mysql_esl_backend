const EslKey = require("../models/EslKey");

// スキャン入力用API (クイック追加)
exports.scanAndCreateEslKey = async (req, res) => {
  try {
    const { hardware_id, secret_key } = req.body;
    const userId = req.user.id;
    const username = req.user.username;

    if (!hardware_id || !secret_key) {
      return res.status(400).json({
        status: "error",
        message: "硬件编号 (hardware_id) 和密钥 (secret_key) 不能为空",
      });
    }

    const existingKey = await EslKey.findByHardwareId(hardware_id);
    if (existingKey) {
      return res.status(409).json({
        status: "error",
        message: `此硬件编号 (${hardware_id}) 已存在`,
        data: existingKey,
      });
    }

    const newEslKey = await EslKey.create({
      hardware_id,
      secret_key,
      userId,
      username,
    });

    res.status(201).json({
      status: "ok",
      message: "电子价签信息录入成功",
      data: newEslKey,
    });
  } catch (error) {
    console.error("扫描录入ESL密钥时出错:", error);
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        status: "error",
        message: `此硬件编号 (${req.body.hardware_id}) 已存在 (ER_DUP_ENTRY)`,
      });
    }
    res.status(500).json({
      status: "error",
      message: "服务器错误，请稍后再试",
    });
  }
};

// 管理者用: ESLキー作成
exports.createEslKey = async (req, res) => {
  try {
    const { hardware_id, secret_key } = req.body;
    const userId = req.user.id;
    const username = req.user.username;

    if (!hardware_id || !secret_key) {
      return res.status(400).json({
        status: "error",
        message: "硬件编号和密钥不能为空",
      });
    }

    const existingKey = await EslKey.findByHardwareId(hardware_id);
    if (existingKey) {
      return res.status(409).json({
        status: "error",
        message: `此硬件编号 (${hardware_id}) 已存在`,
      });
    }

    const newEslKey = await EslKey.create({
      hardware_id,
      secret_key,
      userId,
      username,
    });
    res.status(201).json({
      status: "ok",
      message: "电子价签信息创建成功",
      data: newEslKey,
    });
  } catch (error) {
    console.error("创建ESL密钥时出错:", error);
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        status: "error",
        message: `此硬件编号 (${req.body.hardware_id}) 已存在 (ER_DUP_ENTRY)`,
      });
    }
    res.status(500).json({
      status: "error",
      message: "服务器错误",
    });
  }
};

// ESLキー一覧取得 (ページネーション、検索対応)
exports.getEslKeys = async (req, res) => {
  try {
    const { page, limit, searchHardwareId, searchSecretKey, sortBy, order } =
      req.query;
    const result = await EslKey.getAll({
      page,
      limit,
      searchHardwareId,
      searchSecretKey,
      sortBy,
      order,
    });
    res.status(200).json({
      status: "ok",
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error("获取ESL密钥列表时出错:", error);
    res.status(500).json({
      status: "error",
      message: "服务器错误",
    });
  }
};

// IDによるESLキー取得
exports.getEslKeyById = async (req, res) => {
  try {
    const { id } = req.params;
    const eslKey = await EslKey.findById(id);
    if (!eslKey) {
      return res.status(404).json({
        status: "error",
        message: "未找到指定的电子价签信息",
      });
    }
    res.status(200).json({
      status: "ok",
      data: eslKey,
    });
  } catch (error) {
    console.error("获取单个ESL密钥时出错:", error);
    res.status(500).json({
      status: "error",
      message: "服务器错误",
    });
  }
};

// ESLキー更新
exports.updateEslKey = async (req, res) => {
  try {
    const { id } = req.params;
    const { hardware_id, secret_key } = req.body;

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: "error",
        message: "请求体不能为空",
      });
    }
    // 空文字チェックも追加 (undefined や null だけでなく)
    if (hardware_id === "" || secret_key === "") {
      return res.status(400).json({
        status: "error",
        message: "硬件编号和密钥不能为空字符串",
      });
    }

    const currentEslKey = await EslKey.findById(id);
    if (!currentEslKey) {
      return res.status(404).json({
        status: "error",
        message: "未找到要更新的电子价签信息",
      });
    }

    const updatedEslKey = await EslKey.update(id, {
      hardware_id:
        hardware_id !== undefined ? hardware_id : currentEslKey.hardware_id,
      secret_key:
        secret_key !== undefined ? secret_key : currentEslKey.secret_key,
    });

    if (!updatedEslKey) {
      // updateメソッドがnullを返す場合 (e.g., afectedRows 0 and no other error)
      return res.status(404).json({
        // Or 304 Not Modified if no changes were made but ID exists
        status: "error",
        message: "更新失败或没有字段被实际更新",
      });
    }
    if (updatedEslKey.affectedRows === 0 && updatedEslKey.message) {
      // Modelで独自メッセージを返した場合
      return res.status(400).json({
        status: "info",
        message: updatedEslKey.message,
      });
    }

    res.status(200).json({
      status: "ok",
      message: "电子价签信息更新成功",
      data: updatedEslKey,
    });
  } catch (error) {
    console.error("更新ESL密钥时出错:", error);
    if (error.statusCode === 409) {
      // Modelで設定したカスタムエラーコード
      return res.status(409).json({ status: "error", message: error.message });
    }
    res.status(500).json({
      status: "error",
      message: "服务器错误",
    });
  }
};

// ESLキー削除
exports.deleteEslKey = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await EslKey.delete(id);
    if (!success) {
      return res.status(404).json({
        status: "error",
        message: "未找到要删除的电子价签信息",
      });
    }
    res.status(200).json({
      status: "ok",
      message: "电子价签信息删除成功",
    });
  } catch (error) {
    console.error("删除ESL密钥时出错:", error);
    res.status(500).json({
      status: "error",
      message: "服务器错误",
    });
  }
};
