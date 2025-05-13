/*
 Navicat Premium Dump SQL

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80039 (8.0.39)
 Source Host           : localhost:3306
 Source Schema         : antd_auth_db

 Target Server Type    : MySQL
 Target Server Version : 80039 (8.0.39)
 File Encoding         : 65001

 Date: 13/05/2025 11:30:10
*/
CREATE DATABASE IF NOT EXISTS antd_auth_db;

USE antd_auth_db;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for esl_keys
-- ----------------------------
DROP TABLE IF EXISTS `esl_keys`;
CREATE TABLE `esl_keys`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `hardware_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '电子价签硬件编号',
  `secret_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '对应的键值密钥',
  `box_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '装箱ID',
  `user_id` int NULL DEFAULT NULL COMMENT '录入用户ID (关联 users 表)',
  `created_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '录入用户名称',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `hardware_id_unique`(`hardware_id` ASC) USING BTREE COMMENT '硬件ID必须唯一',
  INDEX `user_id_fk`(`user_id` ASC) USING BTREE,
  INDEX `box_id_idx`(`box_id` ASC) USING BTREE COMMENT '为装箱ID创建索引以优化查询',
  CONSTRAINT `esl_keys_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 200 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '电子价签硬件编号与密钥表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of esl_keys
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role` enum('admin','user','guest') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE,
  UNIQUE INDEX `email`(`email` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'admin', '$2b$10$XB5rnJqFEOFqp5c4VsRzgenqGumI6Ac91RcWY.RPrTFFLJbFfMIt2', 'admin@example.com', 'admin', '2025-05-11 21:38:28');
INSERT INTO `users` VALUES (2, 'user', '$2b$10$HXOKDMBMsrueS0wBwakP8urn9VtXlAwUQcKdDoMonwgJrpVD3Gsai', 'user@example.com', 'user', '2025-05-11 21:38:50');
INSERT INTO `users` VALUES (3, 'esl', '$2b$10$8hqyEigbcxsKUuA.wMnIZ.BX0wQWZ2M5MjA0u5.xz60iVQRi.cnNK', 'esl@example.com', 'user', '2025-05-11 21:39:45');
INSERT INTO `users` VALUES (4, 'esl1', '$2b$10$NGe.NFS8HujXBrZYURIjO.Sw8DDrQXdGNNBOzKikozXIiy8ddXdJu', 'esl1@example.com', 'user', '2025-05-13 11:29:18');
INSERT INTO `users` VALUES (5, 'esl2', '$2b$10$sEBjYbGDzN6xPtxQldMLjee3NRGWgb/URBAXbSEtPyqAAx3lK6dfS', 'esl2@example.com', 'user', '2025-05-13 11:29:32');
INSERT INTO `users` VALUES (6, 'esl3', '$2b$10$vyqSm2BVs8Mzpa06H79uL.ANeGBFf2.PJM9/WlvPX2AfNF55bH6QS', 'esl3@example.com', 'user', '2025-05-13 11:29:40');
INSERT INTO `users` VALUES (7, 'esl4', '$2b$10$c6H4PwQkmYw4ZQc7jGEkg.zun2SqnF0AamTYC.s5hgdIdVpSS5erC', 'esl4@example.com', 'user', '2025-05-13 11:29:48');

SET FOREIGN_KEY_CHECKS = 1;
