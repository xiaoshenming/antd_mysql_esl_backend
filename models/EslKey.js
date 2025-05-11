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
      console.error("创建ESL密钥时出错 (创建ESL密钥时出错):", error); // エラーメッセージを中国語に
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
      console.error(
        "通过硬件ID查找ESL密钥时出错 (ハードウェアIDによるESLキー検索時にエラー):",
        error
      ); // エラーメッセージを中国語に
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
      console.error(
        "通过ID查找ESL密钥时出错 (IDによるESLキー検索時にエラー):",
        error
      ); // エラーメッセージを中国語に
      throw error;
    }
  }

  static async getAll(params = {}) {
    let {
      // page と limit を let に変更
      page = 1,
      limit = 10,
      searchHardwareId = "",
      searchSecretKey = "",
      sortBy = "created_at",
      order = "DESC",
    } = params;

    // page と limit を確実に数値に変換し、不正な値の場合はデフォルト値を使用
    page = parseInt(String(page), 10);
    limit = parseInt(String(limit), 10);

    if (isNaN(page) || page < 1) {
      page = 1;
    }
    if (isNaN(limit) || limit < 1) {
      limit = 10;
    }

    const offset = (page - 1) * limit;

    let query =
      "SELECT id, hardware_id, secret_key, created_by, created_at, updated_at FROM esl_keys WHERE 1=1";
    const queryParamsForWhere = []; // WHERE句専用のパラメータ配列

    if (searchHardwareId) {
      query += " AND hardware_id LIKE ?";
      queryParamsForWhere.push(`%${searchHardwareId}%`);
    }
    if (searchSecretKey) {
      query += " AND secret_key LIKE ?";
      queryParamsForWhere.push(`%${searchSecretKey}%`);
    }

    // 合計件数を取得するためのクエリ (WHERE句のみ適用)
    // query (WHERE句まで構築済み) の FROM 以降を流用
    const fromClause = query.substring(query.indexOf("FROM esl_keys"));
    const countQuery = `SELECT COUNT(*) as total ${fromClause}`;

    let total = 0;
    try {
      const [totalRows] = await db.execute(countQuery, queryParamsForWhere);
      total = totalRows[0].total;
    } catch (error) {
      console.error("获取总行数时出错 (合計行数の取得時にエラー):", error);
      throw error; // 合計行数取得エラーも上位にスロー
    }

    // メインクエリにORDER BY句を追加
    query += ` ORDER BY ${db.escapeId(sortBy)} ${
      order.toUpperCase() === "ASC" ? "ASC" : "DESC"
    }`;
    // LIMIT句とOFFSET句を直接SQL文字列に埋め込む (数値なのでSQLインジェクションの危険性なし)
    query += ` LIMIT ${limit} OFFSET ${offset}`;

    try {
      // メインクエリの実行 (queryParamsForWhere はWHERE句のパラメータのみ)
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
      console.error(
        "获取所有ESL密钥时出错 (ESLキーの全件取得時にエラー):",
        error
      );
      // デバッグ用に詳細情報をログ出力
      console.error("SQL Query for getAll (メインクエリ):", query);
      console.error(
        "Query Params for WHERE (WHERE句のパラメータ):",
        queryParamsForWhere
      );
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
            "硬件编号已存在 (ハードウェアIDは既に存在します)" // エラーメッセージを中国語に
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
        // 更新するフィールドがない場合は、影響行数0として処理
        return {
          affectedRows: 0,
          message:
            "没有提供更新的字段 (更新するフィールドが提供されていません)",
        };
      }

      const updateQuery = `UPDATE esl_keys SET ${fields.join(
        ", "
      )} WHERE id = ?`;
      values.push(id);

      const [result] = await db.execute(updateQuery, values);
      if (result.affectedRows === 0) {
        // IDが存在しない、または値が変更されなかった場合
        return null;
      }
      // 更新後のデータを取得して返す
      const [updatedRow] = await db.execute(
        "SELECT * FROM esl_keys WHERE id = ?",
        [id]
      );
      return updatedRow[0];
    } catch (error) {
      console.error("更新ESL密钥时出错 (ESLキー更新時にエラー):", error); // エラーメッセージを中国語に
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
      console.error("删除ESL密钥时出错 (ESLキー削除時にエラー):", error); // エラーメッセージを中国語に
      throw error;
    }
  }
}

module.exports = EslKey;
