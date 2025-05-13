const EslKey = require("../models/EslKey");

// Helper function to validate 12-digit hexadecimal ID
const isValidHardwareIdFormat = (id) => {
  if (typeof id !== "string") return false;
  const hexRegex = /^[0-9a-fA-F]{12}$/;
  return hexRegex.test(id);
};

// 扫描录入 API (快速添加)
exports.scanAndCreateEslKey = async (req, res) => {
  try {
    const { hardware_id, secret_key, box_id } = req.body;
    const userId = req.user.id;
    const username = req.user.username;

    if (!hardware_id || !secret_key) {
      return res.status(400).json({
        status: "error",
        message: "硬件编号 (hardware_id) 和密钥 (secret_key) 不能为空",
      });
    }

    // Validate hardware_id format
    if (!isValidHardwareIdFormat(hardware_id)) {
      return res.status(400).json({
        status: "error",
        message:
          "硬件编号 (hardware_id) 必须是12位十六进制字符 (例如: 1A2B3C4D5E6F)",
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
      box_id: box_id || null,
      userId,
      username,
    });

    res.status(201).json({
      status: "ok",
      message: "电子价签信息录入成功",
      data: newEslKey, // This already includes the DB-generated ID and other fields
    });
  } catch (error) {
    console.error("扫描录入ESL密钥时出错:", error);
    if (
      error.code === "ER_DUP_ENTRY" ||
      (error.message && error.message.includes("ER_DUP_ENTRY"))
    ) {
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

// (管理用) 创建 ESL Key
exports.createEslKey = async (req, res) => {
  try {
    const { hardware_id, secret_key, box_id } = req.body;
    const userId = req.user.id;
    const username = req.user.username;

    if (!hardware_id || !secret_key) {
      return res.status(400).json({
        status: "error",
        message: "硬件编号和密钥不能为空",
      });
    }

    // Validate hardware_id format
    if (!isValidHardwareIdFormat(hardware_id)) {
      return res.status(400).json({
        status: "error",
        message:
          "硬件编号 (hardware_id) 必须是12位十六进制字符 (例如: 1A2B3C4D5E6F)",
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
      box_id: box_id || null,
      userId,
      username,
    });
    res.status(201).json({
      status: "ok",
      message: "电子价签信息创建成功",
      data: newEslKey, // This already includes the DB-generated ID and other fields
    });
  } catch (error) {
    console.error("创建ESL密钥时出错:", error);
    if (
      error.code === "ER_DUP_ENTRY" ||
      (error.message && error.message.includes("ER_DUP_ENTRY"))
    ) {
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

// 获取 ESL Key 列表 (分页、搜索)
exports.getEslKeys = async (req, res) => {
  try {
    // 从 req.query 中获取 searchBoxId
    const {
      page,
      limit,
      searchHardwareId,
      searchSecretKey,
      searchBoxId,
      sortBy,
      order,
    } = req.query;
    const result = await EslKey.getAll({
      page,
      limit,
      searchHardwareId,
      searchSecretKey,
      searchBoxId, // 传递 searchBoxId
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

// 通过 ID 获取 ESL Key
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

// 更新 ESL Key
exports.updateEslKey = async (req, res) => {
  try {
    const { id } = req.params;
    const { hardware_id, secret_key, box_id } = req.body;

    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "请求体不能为空" });
    }

    // If hardware_id is being updated, validate its format
    if (hardware_id !== undefined && !isValidHardwareIdFormat(hardware_id)) {
      return res.status(400).json({
        status: "error",
        message:
          "硬件编号 (hardware_id) 必须是12位十六进制字符 (例如: 1A2B3C4D5E6F)",
      });
    }

    const currentEslKey = await EslKey.findById(id);
    if (!currentEslKey) {
      return res
        .status(404)
        .json({ status: "error", message: "未找到要更新的电子价签信息" });
    }

    const dataToUpdate = {
      hardware_id:
        hardware_id !== undefined ? hardware_id : currentEslKey.hardware_id,
      secret_key:
        secret_key !== undefined ? secret_key : currentEslKey.secret_key,
      box_id: box_id !== undefined ? box_id : currentEslKey.box_id,
    };

    const updatedEslKey = await EslKey.update(id, dataToUpdate);

    if (!updatedEslKey) {
      return res
        .status(404)
        .json({ status: "error", message: "更新失败或没有字段被实际更新" });
    }
    if (updatedEslKey.affectedRows === 0 && updatedEslKey.message) {
      return res
        .status(400)
        .json({ status: "info", message: updatedEslKey.message });
    }

    // It's good practice to return the updated entity or at least the ID.
    // If EslKey.update doesn't return the full entity, fetch it again.
    // For now, assuming updatedEslKey contains enough info or the frontend refetches.
    const freshUpdatedKey = await EslKey.findById(id); // Fetch the updated record to return it

    res.status(200).json({
      status: "ok",
      message: "电子价签信息更新成功",
      data: freshUpdatedKey, // Return the full updated record
    });
  } catch (error) {
    console.error("更新ESL密钥时出错:", error);
    if (
      error.statusCode === 409 ||
      (error.message && error.message.includes("ER_DUP_ENTRY")) ||
      (error.code && error.code.includes("ER_DUP_ENTRY"))
    ) {
      // More robust duplicate check
      return res
        .status(409)
        .json({
          status: "error",
          message: error.message || `硬件编号 (${req.body.hardware_id}) 已存在`,
        });
    }
    res.status(500).json({ status: "error", message: "服务器错误" });
  }
};

// 删除 ESL Key
exports.deleteEslKey = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await EslKey.delete(id);
    if (!success) {
      return res
        .status(404)
        .json({ status: "error", message: "未找到要删除的电子价签信息" });
    }
    res.status(200).json({ status: "ok", message: "电子价签信息删除成功" });
  } catch (error) {
    console.error("删除ESL密钥时出错:", error);
    res.status(500).json({ status: "error", message: "服务器错误" });
  }
};
