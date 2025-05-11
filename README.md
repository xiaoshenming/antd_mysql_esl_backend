DROP TABLE IF EXISTS `act_ext_template_print`;

CREATE TABLE `act_ext_template_print`  (

  `ID` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,

  `TENANT_ID` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '租户id',

  `NAME` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '名称',

  `CODE` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '编码',

  `CONTENT` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '内容',

  `CATEGORY` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分类',

  `TYPE` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '类别',

  `SORT_CODE` int NULL DEFAULT NULL COMMENT '排序码',

  `EXT_JSON` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '扩展信息',

  `DELETE_FLAG` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '删除标识',

  `CREATE_TIME` datetime NULL DEFAULT NULL COMMENT '创建时间',

  `CREATE_USER` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '创建用户',

  `UPDATE_TIME` datetime NULL DEFAULT NULL COMMENT '修改时间',

  `UPDATE_USER` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '修改用户',

  PRIMARY KEY (`ID`) USING BTREE

) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '打印模板' ROW_FORMAT = DYNAMIC;



DROP TABLE IF EXISTS `panda_product`;

CREATE TABLE `panda_product`  (

  `ID` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,

  `TENANT_ID` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '租户id',

  `EXT_JSON` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '扩展信息',

  `DELETE_FLAG` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '删除标志',

  `CREATE_TIME` datetime NULL DEFAULT NULL COMMENT '创建时间',

  `CREATE_USER` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '创建用户',

  `UPDATE_TIME` datetime NULL DEFAULT NULL COMMENT '修改时间',

  `UPDATE_USER` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '修改用户',

  `PRODUCT_ID` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '商品编号',

  `STORE_CODE` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '门店编码',

  `PRODUCT_NAME` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '商品名称',

  `PRODUCT_CATEGORY` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '商品分类',

  `PRODUCT_SPECIFICATION` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '商品规格',

  `PRODUCT_COST_PRICE` decimal(10, 2) NULL DEFAULT NULL COMMENT '商品成本价',

  `PRODUCT_RETAIL_PRICE` decimal(10, 2) NULL DEFAULT NULL COMMENT '商品零售价',

  `PRODUCT_SALE_PRICE` decimal(10, 2) NULL DEFAULT NULL COMMENT '商品销售价',

  `PRODUCT_DISCOUNT_PRICE` decimal(10, 2) NULL DEFAULT NULL COMMENT '商品折扣价',

  `PRODUCT_WHOLESALE_PRICE` decimal(10, 2) NULL DEFAULT NULL COMMENT '商品批发价',

  `PRODUCT_MATERIAL` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '商品材质',

  `PRODUCT_IMAGE` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '商品图片',

  `PRODUCT_DESCRIPTION` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '商品描述',

  `PRODUCT_UNIT` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '商品单位',

  `PRODUCT_WEIGHT` decimal(10, 2) NULL DEFAULT NULL COMMENT '产品重量',

  `PRODUCT_STATUS` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '商品状态',

  `PRODUCT_STOCK` int NULL DEFAULT NULL COMMENT '商品库存',

  `ESL_TEMPLATE` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '电子价签模版',

  `ESL_TEMPLATE_ID` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '电子价签模版id',

  `STORE_CODE_ID` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '门店编码id',

  PRIMARY KEY (`ID`) USING BTREE

) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;



DROP TABLE IF EXISTS `panda_store`;

CREATE TABLE `panda_store`  (

  `ID` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,

  `TENANT_ID` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '租户id',

  `SORT_CODE` int NULL DEFAULT NULL COMMENT '排序码',

  `EXT_JSON` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '扩展信息',

  `DELETE_FLAG` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '删除标志',

  `CREATE_TIME` datetime NULL DEFAULT NULL COMMENT '创建时间',

  `CREATE_USER` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '创建用户',

  `UPDATE_TIME` datetime NULL DEFAULT NULL COMMENT '修改时间',

  `UPDATE_USER` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '修改用户',

  `STORE_CODE` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '门店编码',

  `STORE_NAME` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '门店名称',

  `SERVER_MODE` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '服务器类型(MQTT/)',

  `SERVER_ADDRESS` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '服务器地址',

  `SERVER_PORT` int NULL DEFAULT NULL COMMENT '服务器端口',

  `ACCESS_USERNAME` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '访问用户名',

  `ACCESS_PASSWORD` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '访问密码',

  PRIMARY KEY (`ID`) USING BTREE

) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;



DROP TABLE IF EXISTS `panda_esl`;

CREATE TABLE `panda_esl`  (

  `ID` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,

  `TENANT_ID` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '租户id',

  `SORT_CODE` int NULL DEFAULT NULL COMMENT '排序码',

  `EXT_JSON` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '扩展信息',

  `DELETE_FLAG` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '删除标志',

  `CREATE_TIME` datetime NULL DEFAULT NULL COMMENT '创建时间',

  `CREATE_USER` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '创建用户',

  `UPDATE_TIME` datetime NULL DEFAULT NULL COMMENT '修改时间',

  `UPDATE_USER` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '修改用户',

  `ESL_ID` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '电子价签编号',

  `STORE_CODE` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '门店编码',

  `ESL_MODEL` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '电子价签型号',

  `BOUND_PRODUCT` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '绑定商品',

  `BATTERY_LEVEL` float NULL DEFAULT NULL COMMENT '电子价签电量（百分比）',

  `TEMPERATURE` float NULL DEFAULT NULL COMMENT '电子价签温度（摄氏度）',

  `SIGNAL_STRENGTH` int NULL DEFAULT NULL COMMENT '信号值',

  `COMMUNICATION_COUNT` int NULL DEFAULT NULL COMMENT '通讯次数',

  `FAILURE_COUNT` int NULL DEFAULT NULL COMMENT '失败次数',

  `ESL_CATEGORY` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'ESL分类',

  `ESL_STATUS` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '电子价签状态',

  `SCREEN_COLOR` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '电子价签屏幕颜色',

  `COMMUNICATION_METHOD` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '电子价签通讯方式（蓝牙/NFC/Wifi/ZigBee）',

  `OPERATING_TEMPERATURE_RANGE` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '电子价签适用温度（常温/冷冻）',

  `IP_RATING` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '电子价签IP等级（IP54/IP67）',

  `VERSION` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '版本',

  `HARDWARE` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '硬件',

  `STORE_CODE_ID` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '门店编码id',

  `BOUND_PRODUCT_ID` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '绑定商品id',

  `ESL_ID_X` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '十进制电子价签编号',

  `AP_SN` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'AP编号',

  `AP_SN_ID` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'AP列表id',

  `UPC1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'UPC1',

  `UPC2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'UPC2',

  `UPC3` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'UPC3',

  `UPC4` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'UPC4',

  `ESL_TEMPLATE_JSON` json NULL COMMENT '模板json',

  `NAME` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '名称',

  `CODE` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '编码',

  `F_01` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '价格',

  `F_02` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '品牌',

  `F_03` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '商品名',

  `F_04` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '规格',

  `F_05` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '全名',

  `F_06` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '产地',

  `F_07` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'F_07',

  `F_08` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '开始时间',

  `F_09` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '结束时间',

  `F_10` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '二维码',

  `F_11` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '质检员',

  `F_20` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '促销价',

  `F_12` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'F_12',

  `F_13` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'F_13',

  `F_14` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'F_14',

  `F_32` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'F_32',

  `F_15` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '商品内部编码',

  PRIMARY KEY (`ID`) USING BTREE

) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;



以上是我的另一个项目的mysql，现在我新谢了一个项目，他只做一个功能，就是录入电子价签的硬件编号跟对应的键值密钥，用扫码枪一个个录入。

CREATE DATABASE IF NOT EXISTS antd_auth_db;



USE antd_auth_db;



CREATE TABLE IF NOT EXISTS users (

  id INT AUTO_INCREMENT PRIMARY KEY,

  username VARCHAR(50) NOT NULL UNIQUE,

  password VARCHAR(100) NOT NULL,

  email VARCHAR(100) NOT NULL UNIQUE,

  role ENUM('admin', 'user', 'guest') DEFAULT 'user',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- 

-- -- 创建初始管理员账户 (密码: ant.design)

-- INSERT INTO users (username, password, email, role)

-- VALUES ('admin', '$2a$10$X7aMYf/JZ9s8hqfS6g.AoOdKJ0wPZy2EGwfutPE/RvQj5CD4LnkZW', 'admin@example.com', 'admin');

-- 

-- -- 创建初始普通用户账户 (密码: ant.design)

-- INSERT INTO users (username, password, email, role)

-- VALUES ('user', '$2a$10$X7aMYf/JZ9s8hqfS6g.AoOdKJ0wPZy2EGwfutPE/RvQj5CD4LnkZW', 'user@example.com', 'user');



这是我新写的系统，写出这个专门存电子价签信息的表。

config\db.js

const mysql = require("mysql2/promise");

require("dotenv").config();



const pool = mysql.createPool({

  host: process.env.DB_HOST,

  user: process.env.DB_USER,

  password: process.env.DB_PASSWORD,

  database: process.env.DB_NAME,

  waitForConnections: true,

  connectionLimit: 10,

  queueLimit: 0,

});

module.exports = pool;

app.js

const express = require("express");

const cors = require("cors");

require("dotenv").config();



const authRoutes = require("./routes/authRoutes");



const app = express();



// 中间件

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));



// 路由

app.use("/", authRoutes);



// 错误处理

app.use((err, req, res, next) => {

  console.error(err.stack);

  res.status(500).json({

    status: "error",

    message: "服务器内部错误",

  });

});



// 启动服务器

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(`服务器运行在端口 ${PORT}`);

});

models\esl.js

空

就是写一个电子价签的增删改查的接口，以及你觉得可能需要的接口。



一下是前端的一个示例界面

import { addRule, removeRule, rule, updateRule } from '@/services/ant-design-pro/api';

import { PlusOutlined } from '@ant-design/icons';

import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';

import {

  FooterToolbar,

  ModalForm,

  PageContainer,

  ProDescriptions,

  ProFormText,

  ProFormTextArea,

  ProTable,

} from '@ant-design/pro-components';

import { FormattedMessage, useIntl } from '@umijs/max';

import { Button, Drawer, Input, message } from 'antd';

import React, { useRef, useState } from 'react';

import type { FormValueType } from './components/UpdateForm';

import UpdateForm from './components/UpdateForm';



/**

 * @en-US Add node

 * @zh-CN 添加节点

 * @param fields

 */

const handleAdd = async (fields: API.RuleListItem) => {

  const hide = message.loading('正在添加');

  try {

    await addRule({ ...fields });

    hide();

    message.success('Added successfully');

    return true;

  } catch (error) {

    hide();

    message.error('Adding failed, please try again!');

    return false;

  }

};



/**

 * @en-US Update node

 * @zh-CN 更新节点

 *

 * @param fields

 */

const handleUpdate = async (fields: FormValueType) => {

  const hide = message.loading('Configuring');

  try {

    await updateRule({

      name: fields.name,

      desc: fields.desc,

      key: fields.key,

    });

    hide();



    message.success('Configuration is successful');

    return true;

  } catch (error) {

    hide();

    message.error('Configuration failed, please try again!');

    return false;

  }

};



/**

 *  Delete node

 * @zh-CN 删除节点

 *

 * @param selectedRows

 */

const handleRemove = async (selectedRows: API.RuleListItem[]) => {

  const hide = message.loading('正在删除');

  if (!selectedRows) return true;

  try {

    await removeRule({

      key: selectedRows.map((row) => row.key),

    });

    hide();

    message.success('Deleted successfully and will refresh soon');

    return true;

  } catch (error) {

    hide();

    message.error('Delete failed, please try again');

    return false;

  }

};



const TableList: React.FC = () => {

  /**

   * @en-US Pop-up window of new window

   * @zh-CN 新建窗口的弹窗

   *  */

  const [createModalOpen, handleModalOpen] = useState<boolean>(false);

  /**

   * @en-US The pop-up window of the distribution update window

   * @zh-CN 分布更新窗口的弹窗

   * */

  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);



  const [showDetail, setShowDetail] = useState<boolean>(false);



  const actionRef = useRef<ActionType>();

  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();

  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);



  /**

   * @en-US International configuration

   * @zh-CN 国际化配置

   * */

  const intl = useIntl();



  const columns: ProColumns<API.RuleListItem>[] = [

    {

      title: (

        <FormattedMessage

          id="pages.searchTable.updateForm.ruleName.nameLabel"

          defaultMessage="Rule name"

        />

      ),

      dataIndex: 'name',

      render: (dom, entity) => {

        return (

          <a

            onClick={() => {

              setCurrentRow(entity);

              setShowDetail(true);

            }}

          >

            {dom}

          </a>

        );

      },

    },

    {

      title: <FormattedMessage id="pages.searchTable.titleDesc" defaultMessage="Description" />,

      dataIndex: 'desc',

      valueType: 'textarea',

    },

    {

      title: (

        <FormattedMessage

          id="pages.searchTable.titleCallNo"

          defaultMessage="Number of service calls"

        />

      ),

      dataIndex: 'callNo',

      sorter: true,

      hideInForm: true,

      renderText: (val: string) =>

        `${val}${intl.formatMessage({

          id: 'pages.searchTable.tenThousand',

          defaultMessage: ' 万 ',

        })}`,

    },

    {

      title: <FormattedMessage id="pages.searchTable.titleStatus" defaultMessage="Status" />,

      dataIndex: 'status',

      hideInForm: true,

      valueEnum: {

        0: {

          text: (

            <FormattedMessage

              id="pages.searchTable.nameStatus.default"

              defaultMessage="Shut down"

            />

          ),

          status: 'Default',

        },

        1: {

          text: (

            <FormattedMessage id="pages.searchTable.nameStatus.running" defaultMessage="Running" />

          ),

          status: 'Processing',

        },

        2: {

          text: (

            <FormattedMessage id="pages.searchTable.nameStatus.online" defaultMessage="Online" />

          ),

          status: 'Success',

        },

        3: {

          text: (

            <FormattedMessage

              id="pages.searchTable.nameStatus.abnormal"

              defaultMessage="Abnormal"

            />

          ),

          status: 'Error',

        },

      },

    },

    {

      title: (

        <FormattedMessage

          id="pages.searchTable.titleUpdatedAt"

          defaultMessage="Last scheduled time"

        />

      ),

      sorter: true,

      dataIndex: 'updatedAt',

      valueType: 'dateTime',

      renderFormItem: (item, { defaultRender, ...rest }, form) => {

        const status = form.getFieldValue('status');

        if (`${status}` === '0') {

          return false;

        }

        if (`${status}` === '3') {

          return (

            <Input

              {...rest}

              placeholder={intl.formatMessage({

                id: 'pages.searchTable.exception',

                defaultMessage: 'Please enter the reason for the exception!',

              })}

            />

          );

        }

        return defaultRender(item);

      },

    },

    {

      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,

      dataIndex: 'option',

      valueType: 'option',

      render: (_, record) => [

        <a

          key="config"

          onClick={() => {

            handleUpdateModalOpen(true);

            setCurrentRow(record);

          }}

        >

          <FormattedMessage id="pages.searchTable.config" defaultMessage="Configuration" />

        </a>,

        <a key="subscribeAlert" href="https://procomponents.ant.design/">

          <FormattedMessage

            id="pages.searchTable.subscribeAlert"

            defaultMessage="Subscribe to alerts"

          />

        </a>,

      ],

    },

  ];



  return (

    <PageContainer>

      <ProTable<API.RuleListItem, API.PageParams>

        headerTitle={intl.formatMessage({

          id: 'pages.searchTable.title',

          defaultMessage: 'Enquiry form',

        })}

        actionRef={actionRef}

        rowKey="key"

        search={{

          labelWidth: 120,

        }}

        toolBarRender={() => [

          <Button

            type="primary"

            key="primary"

            onClick={() => {

              handleModalOpen(true);

            }}

          >

            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />

          </Button>,

        ]}

        request={rule}

        columns={columns}

        rowSelection={{

          onChange: (_, selectedRows) => {

            setSelectedRows(selectedRows);

          },

        }}

      />

      {selectedRowsState?.length > 0 && (

        <FooterToolbar

          extra={

            <div>

              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}

              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}

              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />

              &nbsp;&nbsp;

              <span>

                <FormattedMessage

                  id="pages.searchTable.totalServiceCalls"

                  defaultMessage="Total number of service calls"

                />{' '}

                {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}

                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />

              </span>

            </div>

          }

        >

          <Button

            onClick={async () => {

              await handleRemove(selectedRowsState);

              setSelectedRows([]);

              actionRef.current?.reloadAndRest?.();

            }}

          >

            <FormattedMessage

              id="pages.searchTable.batchDeletion"

              defaultMessage="Batch deletion"

            />

          </Button>

          <Button type="primary">

            <FormattedMessage

              id="pages.searchTable.batchApproval"

              defaultMessage="Batch approval"

            />

          </Button>

        </FooterToolbar>

      )}

      <ModalForm

        title={intl.formatMessage({

          id: 'pages.searchTable.createForm.newRule',

          defaultMessage: 'New rule',

        })}

        width="400px"

        open={createModalOpen}

        onOpenChange={handleModalOpen}

        onFinish={async (value) => {

          const success = await handleAdd(value as API.RuleListItem);

          if (success) {

            handleModalOpen(false);

            if (actionRef.current) {

              actionRef.current.reload();

            }

          }

        }}

      >

        <ProFormText

          rules={[

            {

              required: true,

              message: (

                <FormattedMessage

                  id="pages.searchTable.ruleName"

                  defaultMessage="Rule name is required"

                />

              ),

            },

          ]}

          width="md"

          name="name"

        />

        <ProFormTextArea width="md" name="desc" />

      </ModalForm>

      <UpdateForm

        onSubmit={async (value) => {

          const success = await handleUpdate(value);

          if (success) {

            handleUpdateModalOpen(false);

            setCurrentRow(undefined);

            if (actionRef.current) {

              actionRef.current.reload();

            }

          }

        }}

        onCancel={() => {

          handleUpdateModalOpen(false);

          if (!showDetail) {

            setCurrentRow(undefined);

          }

        }}

        updateModalOpen={updateModalOpen}

        values={currentRow || {}}

      />



      <Drawer

        width={600}

        open={showDetail}

        onClose={() => {

          setCurrentRow(undefined);

          setShowDetail(false);

        }}

        closable={false}

      >

        {currentRow?.name && (

          <ProDescriptions<API.RuleListItem>

            column={2}

            title={currentRow?.name}

            request={async () => ({

              data: currentRow || {},

            })}

            params={{

              id: currentRow?.name,

            }}

            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}

          />

        )}

      </Drawer>

    </PageContainer>

  );

};



export default TableList;

及其组件

import {

  ProFormDateTimePicker,

  ProFormRadio,

  ProFormSelect,

  ProFormText,

  ProFormTextArea,

  StepsForm,

} from '@ant-design/pro-components';

import { FormattedMessage, useIntl } from '@umijs/max';

import { Modal } from 'antd';

import React from 'react';



export type FormValueType = {

  target?: string;

  template?: string;

  type?: string;

  time?: string;

  frequency?: string;

} & Partial<API.RuleListItem>;



export type UpdateFormProps = {

  onCancel: (flag?: boolean, formVals?: FormValueType) => void;

  onSubmit: (values: FormValueType) => Promise<void>;

  updateModalOpen: boolean;

  values: Partial<API.RuleListItem>;

};



const UpdateForm: React.FC<UpdateFormProps> = (props) => {

  const intl = useIntl();

  return (

    <StepsForm

      stepsProps={{

        size: 'small',

      }}

      stepsFormRender={(dom, submitter) => {

        return (

          <Modal

            width={640}

            styles={{

              body: {

                padding: '32px 40px 48px',

              },

            }}

            destroyOnClose

            title={intl.formatMessage({

              id: 'pages.searchTable.updateForm.ruleConfig',

              defaultMessage: '规则配置',

            })}

            open={props.updateModalOpen}

            footer={submitter}

            onCancel={() => {

              props.onCancel();

            }}

          >

            {dom}

          </Modal>

        );

      }}

      onFinish={props.onSubmit}

    >

      <StepsForm.StepForm

        initialValues={{

          name: props.values.name,

          desc: props.values.desc,

        }}

        title={intl.formatMessage({

          id: 'pages.searchTable.updateForm.basicConfig',

          defaultMessage: '基本信息',

        })}

      >

        <ProFormText

          name="name"

          label={intl.formatMessage({

            id: 'pages.searchTable.updateForm.ruleName.nameLabel',

            defaultMessage: '规则名称',

          })}

          width="md"

          rules={[

            {

              required: true,

              message: (

                <FormattedMessage

                  id="pages.searchTable.updateForm.ruleName.nameRules"

                  defaultMessage="请输入规则名称！"

                />

              ),

            },

          ]}

        />

        <ProFormTextArea

          name="desc"

          width="md"

          label={intl.formatMessage({

            id: 'pages.searchTable.updateForm.ruleDesc.descLabel',

            defaultMessage: '规则描述',

          })}

          placeholder={intl.formatMessage({

            id: 'pages.searchTable.updateForm.ruleDesc.descPlaceholder',

            defaultMessage: '请输入至少五个字符',

          })}

          rules={[

            {

              required: true,

              message: (

                <FormattedMessage

                  id="pages.searchTable.updateForm.ruleDesc.descRules"

                  defaultMessage="请输入至少五个字符的规则描述！"

                />

              ),

              min: 5,

            },

          ]}

        />

      </StepsForm.StepForm>

      <StepsForm.StepForm

        initialValues={{

          target: '0',

          template: '0',

        }}

        title={intl.formatMessage({

          id: 'pages.searchTable.updateForm.ruleProps.title',

          defaultMessage: '配置规则属性',

        })}

      >

        <ProFormSelect

          name="target"

          width="md"

          label={intl.formatMessage({

            id: 'pages.searchTable.updateForm.object',

            defaultMessage: '监控对象',

          })}

          valueEnum={{

            0: '表一',

            1: '表二',

          }}

        />

        <ProFormSelect

          name="template"

          width="md"

          label={intl.formatMessage({

            id: 'pages.searchTable.updateForm.ruleProps.templateLabel',

            defaultMessage: '规则模板',

          })}

          valueEnum={{

            0: '规则模板一',

            1: '规则模板二',

          }}

        />

        <ProFormRadio.Group

          name="type"

          label={intl.formatMessage({

            id: 'pages.searchTable.updateForm.ruleProps.typeLabel',

            defaultMessage: '规则类型',

          })}

          options={[

            {

              value: '0',

              label: '强',

            },

            {

              value: '1',

              label: '弱',

            },

          ]}

        />

      </StepsForm.StepForm>

      <StepsForm.StepForm

        initialValues={{

          type: '1',

          frequency: 'month',

        }}

        title={intl.formatMessage({

          id: 'pages.searchTable.updateForm.schedulingPeriod.title',

          defaultMessage: '设定调度周期',

        })}

      >

        <ProFormDateTimePicker

          name="time"

          width="md"

          label={intl.formatMessage({

            id: 'pages.searchTable.updateForm.schedulingPeriod.timeLabel',

            defaultMessage: '开始时间',

          })}

          rules={[

            {

              required: true,

              message: (

                <FormattedMessage

                  id="pages.searchTable.updateForm.schedulingPeriod.timeRules"

                  defaultMessage="请选择开始时间！"

                />

              ),

            },

          ]}

        />

        <ProFormSelect

          name="frequency"

          label={intl.formatMessage({

            id: 'pages.searchTable.updateForm.object',

            defaultMessage: '监控对象',

          })}

          width="md"

          valueEnum={{

            month: '月',

            week: '周',

          }}

        />

      </StepsForm.StepForm>

    </StepsForm>

  );

};



export default UpdateForm;
/**
 * @name 代理的配置
 * @see 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 *
 * @doc https://umijs.org/docs/guides/proxy
 */
export default {
  // 如果需要自定义本地开发服务器  请取消注释按需调整
  // dev: {
  //   // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
  //   '/api/': {
  //     // 要代理的地址
  //     target: 'https://preview.pro.ant.design',
  //     // 配置了这个可以从 http 代理到 https
  //     // 依赖 origin 的功能可能需要这个，比如 cookie
  //     changeOrigin: true,
  //   },
  // },
  /**
   * @name 详细的代理配置
   * @doc https://github.com/chimurai/http-proxy-middleware
   */
  test: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/api/': {
      target: 'https://proapi.azurewebsites.net',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};

后端的端口为3000。
PS E:\WebstormProjects\antd_mysql_esl\src>    tree /f /a | findstr /v /i /r /c:"^.*\\.umi.*$"
? ?? ???? PATH ??
????? 64A1-2447
E:.
|   access.ts
|   app.tsx
|   global.less
|   global.tsx
|   manifest.json
|   requestErrorConfig.ts
|   service-worker.js
|   typings.d.ts
|
+---.umi
|   |   appData.json
|   |   exports.ts
|   |   testBrowser.tsx
|   |   tsconfig.json
|   |   typings.d.ts
|   |   umi.ts
|   |
|   +---core
|   |       defineApp.ts
|   |       EmptyRoute.tsx
|   |       helmet.ts
|   |       helmetContext.ts
|   |       history.ts
|   |       historyIntelli.ts
|   |       plugin.ts
|   |       pluginConfig.ts
|   |       pluginConfigJoi.d.ts
|   |       polyfill.ts
|   |       route.tsx
|   |       terminal.ts
|   |
|   +---plugin-access
|   |       context.ts
|   |       index.tsx
|   |       runtime.tsx
|   |       types.d.ts
|   |
|   +---plugin-antd
|   |       runtime.tsx
|   |       runtimeConfig.d.ts
|   |       types.d.ts
|   |
|   +---plugin-initialState
|   |       @@initialState.ts
|   |       Provider.tsx
|   |       runtime.tsx
|   |       runtimeConfig.d.ts
|   |
|   +---plugin-layout
|   |       Exception.tsx
|   |       icons.tsx
|   |       index.ts
|   |       Layout.css
|   |       Layout.tsx
|   |       Logo.tsx
|   |       rightRender.tsx
|   |       runtime.tsx
|   |       runtimeConfig.d.ts
|   |       types.d.ts
|   |
|   +---plugin-locale
|   |       index.ts
|   |       locale.tsx
|   |       localeExports.ts
|   |       runtime.tsx
|   |       runtimeConfig.d.ts
|   |       SelectLang.tsx
|   |
|   +---plugin-model
|   |       index.tsx
|   |       model.ts
|   |       runtime.tsx
|   |
|   +---plugin-moment2dayjs
|   |       runtime.tsx
|   |
|   +---plugin-openapi
|   |       openapi.tsx
|   |
|   \---plugin-request
|           index.ts
|           request.ts
|           runtimeConfig.d.ts
|           types.d.ts
|
+---components
|   |   index.ts
|   |
|   +---Footer
|   |       index.tsx
|   |
|   +---HeaderDropdown
|   |       index.tsx
|   |
|   \---RightContent
|           AvatarDropdown.tsx
|           index.tsx
|
+---locales
|   |   bn-BD.ts
|   |   en-US.ts
|   |   fa-IR.ts
|   |   id-ID.ts
|   |   ja-JP.ts
|   |   pt-BR.ts
|   |   zh-CN.ts
|   |   zh-TW.ts
|   |
|   +---bn-BD
|   |       component.ts
|   |       globalHeader.ts
|   |       menu.ts
|   |       pages.ts
|   |       pwa.ts
|   |       settingDrawer.ts
|   |       settings.ts
|   |
|   +---en-US
|   |       component.ts
|   |       globalHeader.ts
|   |       menu.ts
|   |       pages.ts
|   |       pwa.ts
|   |       settingDrawer.ts
|   |       settings.ts
|   |
|   +---fa-IR
|   |       component.ts
|   |       globalHeader.ts
|   |       menu.ts
|   |       pages.ts
|   |       pwa.ts
|   |       settingDrawer.ts
|   |       settings.ts
|   |
|   +---id-ID
|   |       component.ts
|   |       globalHeader.ts
|   |       menu.ts
|   |       pages.ts
|   |       pwa.ts
|   |       settingDrawer.ts
|   |       settings.ts
|   |
|   +---ja-JP
|   |       component.ts
|   |       globalHeader.ts
|   |       menu.ts
|   |       pages.ts
|   |       pwa.ts
|   |       settingDrawer.ts
|   |       settings.ts
|   |
|   +---pt-BR
|   |       component.ts
|   |       globalHeader.ts
|   |       menu.ts
|   |       pages.ts
|   |       pwa.ts
|   |       settingDrawer.ts
|   |       settings.ts
|   |
|   +---zh-CN
|   |       component.ts
|   |       globalHeader.ts
|   |       menu.ts
|   |       pages.ts
|   |       pwa.ts
|   |       settingDrawer.ts
|   |       settings.ts
|   |
|   \---zh-TW
|           component.ts
|           globalHeader.ts
|           menu.ts
|           pages.ts
|           pwa.ts
|           settingDrawer.ts
|           settings.ts
|
+---pages
|   |   404.tsx
|   |   Admin.tsx
|   |   Welcome.tsx
|   |
|   +---EslKeyManagement
|   +---EslKeyScannerInput
|   +---TableList
|   |   |   index.tsx
|   |   |
|   |   \---components
|   |           UpdateForm.tsx
|   |
|   \---User
|       \---Login
|           |   index.tsx
|           |   login.test.tsx
|           |
|           \---__snapshots__
|                   login.test.tsx.snap
|
+---services
|   +---ant-design-pro
|   |       api.ts
|   |       index.ts
|   |       login.ts
|   |       typings.d.ts
|   |
|   +---esl
|   \---swagger
|           index.ts
|           pet.ts
|           store.ts
|           typings.d.ts
|           user.ts
|
\---utils
PS E:\WebstormProjects\antd_mysql_esl\src>

现在也请新增一个专门用来给扫码枪不停的入库的前端界面。

发挥你的想象力。写出你认为最完美的代码。说中文。

