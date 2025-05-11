const db = require("../config/db");
const bcrypt = require("bcryptjs");

class User {
  static async findByUsername(username) {
    try {
      const [rows] = await db.execute(
        "SELECT * FROM users WHERE username = ?",
        [username]
      );
      return rows[0];
    } catch (error) {
      console.error("找不到用户:", error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await db.execute(
        "SELECT id, username, email, role, created_at FROM users WHERE id = ?",
        [id]
      );
      return rows[0];
    } catch (error) {
      console.error("无法通过ID找到用户:", error);
      throw error;
    }
  }

  static async create(userData) {
    const { username, password, email, role = "user" } = userData;

    // 密码加密
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      const [result] = await db.execute(
        "INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)",
        [username, hashedPassword, email, role]
      );

      return { id: result.insertId, username, email, role };
    } catch (error) {
      console.error("创建用户时出现错误:", error);
      throw error;
    }
  }

  static async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

module.exports = User;
