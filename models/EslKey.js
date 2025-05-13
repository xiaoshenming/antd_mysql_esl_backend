const db = require("../config/db"); // 假设db配置文件路径

class EslKey {
  static async create(data) {
    const { hardware_id, secret_key, box_id, userId, username } = data; // 添加 box_id
    try {
      const [result] = await db.execute(
        "INSERT INTO esl_keys (hardware_id, secret_key, box_id, user_id, created_by) VALUES (?, ?, ?, ?, ?)", // 添加 box_id
        [hardware_id, secret_key, box_id, userId, username]
      );
      return {
        id: result.insertId,
        hardware_id,
        secret_key,
        box_id,
        userId,
        username,
      };
    } catch (error) {
      console.error("创建ESL密钥时出错:", error);
      throw error;
    }
  }

  static async findByHardwareId(hardwareId) {
    try {
      const [rows] = await db.execute(
        "SELECT * FROM esl_keys WHERE hardware_id = ?",
        [hardwareId]
      );
      return rows[0];
    } catch (error) {
      console.error("通过硬件ID查找ESL密钥时出错:", error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await db.execute("SELECT * FROM esl_keys WHERE id = ?", [
        id,
      ]);
      return rows[0];
    } catch (error) {
      console.error("通过ID查找ESL密钥时出错:", error);
      throw error;
    }
  }

  static async getAll(params = {}) {
    let {
      page = 1,
      limit = 10,
      searchHardwareId = "",
      searchSecretKey = "", // 尽管前端可能不直接搜索密钥，但保留以防万一
      searchBoxId = "", // 新增: 按 box_id 搜索
      sortBy = "created_at",
      order = "DESC",
    } = params;

    page = parseInt(String(page), 10);
    limit = parseInt(String(limit), 10);
    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;
    const offset = (page - 1) * limit;

    // 注意：查询中已包含 box_id
    let query =
      "SELECT id, hardware_id, secret_key, box_id, user_id, created_by, created_at, updated_at FROM esl_keys WHERE 1=1";
    const queryParamsForWhere = [];

    if (searchHardwareId) {
      query += " AND hardware_id LIKE ?";
      queryParamsForWhere.push(`%${searchHardwareId}%`);
    }
    if (searchSecretKey) {
      // 如果确实不需要按secret_key搜索，可以移除这部分
      query += " AND secret_key LIKE ?";
      queryParamsForWhere.push(`%${searchSecretKey}%`);
    }
    if (searchBoxId) {
      // 按 box_id 搜索
      query += " AND box_id LIKE ?";
      queryParamsForWhere.push(`%${searchBoxId}%`);
    }

    const fromClause = query.substring(query.indexOf("FROM esl_keys"));
    const countQuery = `SELECT COUNT(*) as total ${fromClause}`;
    let total = 0;

    try {
      const [totalRows] = await db.execute(countQuery, queryParamsForWhere);
      total = totalRows[0].total;
    } catch (error) {
      console.error("获取总行数时出错:", error);
      throw error;
    }

    query += ` ORDER BY ${db.escapeId(sortBy)} ${
      order.toUpperCase() === "ASC" ? "ASC" : "DESC"
    }`;
    query += ` LIMIT ${limit} OFFSET ${offset}`;

    try {
      const [rows] = await db.execute(query, queryParamsForWhere);
      return {
        data: rows,
        pagination: {
          page: page,
          limit: limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.error("获取所有ESL密钥时出错:", error);
      console.error("SQL Query for getAll:", query);
      console.error("Query Params for WHERE:", queryParamsForWhere);
      throw error;
    }
  }

  static async update(id, data) {
    const { hardware_id, secret_key, box_id } = data; // 添加 box_id
    try {
      // 检查 hardware_id 是否已存在于其他记录中
      if (hardware_id) {
        const [existing] = await db.execute(
          "SELECT id FROM esl_keys WHERE hardware_id = ? AND id != ?",
          [hardware_id, id]
        );
        if (existing.length > 0) {
          const error = new Error("硬件编号已存在");
          error.statusCode = 409; // Conflict
          throw error;
        }
      }

      const fields = [];
      const values = [];
      if (hardware_id !== undefined) {
        fields.push("hardware_id = ?");
        values.push(hardware_id);
      }
      if (secret_key !== undefined) {
        fields.push("secret_key = ?");
        values.push(secret_key);
      }
      if (box_id !== undefined) {
        // 处理 box_id 更新
        fields.push("box_id = ?");
        values.push(box_id === "" ? null : box_id); // 如果 box_id 为空字符串，则存为 NULL
      }

      if (fields.length === 0) {
        return { affectedRows: 0, message: "没有提供更新的字段" };
      }

      // 确保 updated_at 会自动更新，如果表结构中已定义 ON UPDATE CURRENT_TIMESTAMP，则无需手动添加
      // fields.push("updated_at = CURRENT_TIMESTAMP"); // 如果需要手动更新时间戳

      const updateQuery = `UPDATE esl_keys SET ${fields.join(
        ", "
      )} WHERE id = ?`;
      values.push(id);

      const [result] = await db.execute(updateQuery, values);
      if (result.affectedRows === 0) {
        return null; // ID不存在或值未改变
      }

      const [updatedRow] = await db.execute(
        "SELECT * FROM esl_keys WHERE id = ?",
        [id]
      );
      return updatedRow[0];
    } catch (error) {
      console.error("更新ESL密钥时出错:", error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const [result] = await db.execute("DELETE FROM esl_keys WHERE id = ?", [
        id,
      ]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("删除ESL密钥时出错:", error);
      throw error;
    }
  }
}

module.exports = EslKey;
