const db = require("../config/db");

class EslKey {
  static async create(data) {
    const { hardware_id, secret_key, userId, username } = data;
    try {
      const [result] = await db.execute(
        "INSERT INTO esl_keys (hardware_id, secret_key, user_id, created_by) VALUES (?, ?, ?, ?)",
        [hardware_id, secret_key, userId, username]
      );
      return { id: result.insertId, hardware_id, secret_key, userId, username };
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
    const {
      page = 1,
      limit = 10,
      searchHardwareId = "",
      searchSecretKey = "",
      sortBy = "created_at",
      order = "DESC",
    } = params;
    const offset = (page - 1) * limit;

    let query =
      "SELECT id, hardware_id, secret_key, created_by, created_at, updated_at FROM esl_keys WHERE 1=1";
    const queryParams = [];

    if (searchHardwareId) {
      query += " AND hardware_id LIKE ?";
      queryParams.push(`%${searchHardwareId}%`);
    }
    if (searchSecretKey) {
      query += " AND secret_key LIKE ?"; // 必要に応じて秘密鍵での検索も追加
      queryParams.push(`%${searchSecretKey}%`);
    }

    // Count total records for pagination
    // FROM句以降をコピーしてCOUNTクエリを生成
    const fromClause = query.substring(query.indexOf("FROM esl_keys"));
    let countQuery = `SELECT COUNT(*) as total ${fromClause}`;

    // WHERE句のパラメータをCOUNTクエリにも適用
    const countQueryParams = [...queryParams]; //queryParamsのコピーを作成

    const [totalRows] = await db.execute(countQuery, countQueryParams);
    const total = totalRows[0].total;

    query += ` ORDER BY ${db.escapeId(sortBy)} ${
      order.toUpperCase() === "ASC" ? "ASC" : "DESC"
    }`;
    query += " LIMIT ? OFFSET ?";
    queryParams.push(parseInt(limit, 10), parseInt(offset, 10));

    try {
      const [rows] = await db.execute(query, queryParams);
      return {
        data: rows,
        pagination: {
          page: parseInt(page, 10),
          limit: parseInt(limit, 10),
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.error("获取所有ESL密钥时出错:", error);
      throw error;
    }
  }

  static async update(id, data) {
    const { hardware_id, secret_key } = data;
    try {
      if (hardware_id) {
        const [existing] = await db.execute(
          "SELECT id FROM esl_keys WHERE hardware_id = ? AND id != ?",
          [hardware_id, id]
        );
        if (existing.length > 0) {
          const error = new Error(
            "硬件编号已存在 (Hardware ID already exists)"
          );
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

      if (fields.length === 0) {
        return { affectedRows: 0, message: "没有提供更新的字段" };
      }

      const query = `UPDATE esl_keys SET ${fields.join(", ")} WHERE id = ?`;
      values.push(id);

      const [result] = await db.execute(query, values);
      if (result.affectedRows === 0) {
        return null;
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
