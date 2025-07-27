# Interactive User Management System

一个基于命令行的交互式用户管理系统，使用 React 和 Ink 构建。

## 功能特性

- 🎨 精美的终端用户界面
- ✅ 表单验证和错误处理
- 💾 用户数据持久化存储 (JSON 文件)
- 📋 用户列表查看和管理
- ✏️ 用户信息编辑功能
- 🗑️ 用户删除功能
- ⌨️ 完整的键盘导航支持
- 🔄 流畅的页面切换动画

## 界面预览

![主界面](https://placehold.co/600x400/000000/FFFFFF?text=Main+Interface)
_主界面和菜单选项_

![用户表单](https://placehold.co/600x400/000000/FFFFFF?text=User+Form)
_用户信息填写表单_

![用户列表](https://placehold.co/600x400/000000/FFFFFF?text=User+List)
_用户列表和管理界面_

## 安装

```bash
$ npm install --global my-ink-cli-01
```

## 使用方法

```bash
$ my-ink-cli-01
```

运行命令后，您将看到一个交互式界面，可以通过以下方式操作：

### 导航控制

- **↑/↓ 箭头键**: 在菜单选项间切换
- **Enter**: 确认选择或提交表单
- **← / Backspace**: 返回上一步
- **Tab / Shift+Tab**: 在表单字段间切换
- **Esc**: 返回主菜单或退出当前操作
- **Ctrl+C**: 退出程序

### 功能说明

1. **填写新用户信息**

   - 按步骤填写用户信息
   - 包含姓名、邮箱、年龄、部门和经验级别
   - 实时验证输入数据

2. **查看和编辑用户信息**
   - 浏览已有用户列表
   - 选择用户进行编辑或删除
   - 确认删除操作以防止误删

## 技术架构

### 核心技术栈

- [React](https://reactjs.org/) - UI 库
- [Ink](https://github.com/vadimdemedes/ink) - 终端渲染库
- [TypeScript](https://www.typescriptlang.org/) - 类型安全的 JavaScript
- [fs-extra](https://github.com/jprichardson/node-fs-extra) - 文件系统操作

### 组件结构

```
App
├── HomeScreen (首页和菜单)
├── MainForm (主表单)
│   ├── ProgressBar (进度条)
│   └── FormFields (表单字段)
└── User Management
    ├── UserListScreen (用户列表)
    └── UserEditScreen (用户编辑)
```

### 数据持久化

用户数据存储在项目目录下的 `data/users.json` 文件中，采用 JSON 格式存储。

## 开发指南

### 本地开发

```bash
# 克隆项目
git clone <repository-url>
cd my-ink-cli-01

# 安装依赖
npm install

# 构建项目
npm run build

# 运行开发版本
npm run dev
```

### 项目结构

```
my-ink-cli-01/
├── source/           # 源代码目录
│   ├── components/   # React组件
│   ├── services/     # 数据服务
│   ├── app.tsx       # 主应用组件
│   └── cli.tsx       # CLI入口
├── data/             # 数据存储目录
├── dist/             # 编译输出目录
└── README.md         # 项目文档
```

### 组件说明

- **HomeScreen**: 应用首页和主菜单
- **MainForm**: 用户信息填写表单
- **ProgressBar**: 表单填写进度指示器
- **FormFields**: 表单字段组件
- **UserListScreen**: 用户列表和管理界面
- **UserEditScreen**: 用户信息编辑界面

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目。

## 许可证

MIT © 2025
