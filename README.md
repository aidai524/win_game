# SOL Game - 幸运转盘游戏

这是一个基于Solana区块链的幸运转盘游戏，类似于[degenspin.com](https://www.degenspin.com/)。

## 功能特点

- 幸运转盘游戏，用户可以旋转轮盘获得奖励
- 连接Solana钱包进行支付和领取奖励
- 响应式设计，支持移动设备和桌面设备
- 实时显示赢家和历史结果

## 技术栈

- 前端: React.js, Next.js
- 区块链交互: Solana Web3.js
- 钱包连接: Solana Wallet Adapter
- 样式: Tailwind CSS
- 动画: GSAP 或 Framer Motion

## 项目结构

```
/
├── public/            # 静态资源
├── src/               # 源代码
│   ├── app/           # Next.js 应用路由
│   ├── components/    # 可复用组件
│   ├── hooks/         # 自定义钩子
│   ├── lib/           # 实用工具和函数
│   └── styles/        # 全局样式
├── package.json       # 依赖管理
└── README.md          # 项目文档
```

## 开发计划

1. 创建基本项目架构
2. 实现转盘组件和动画
3. 添加钱包连接功能
4. 实现下注逻辑
5. 连接Solana区块链
6. 添加历史结果和赢家列表
7. 优化UI/UX和响应式设计
8. 测试和部署

## 使用方法

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 开发模式运行

```bash
npm run dev
# 或
yarn dev
```

### 构建生产版本

```bash
npm run build
# 或
yarn build
```

### 启动生产服务

```bash
npm start
# 或
yarn start
```

## 游戏规则

1. 连接Solana钱包
2. 选择下注金额
3. 点击旋转按钮开始游戏
4. 等待转盘停止，查看结果
5. 如果赢了，奖励将自动发送到您的钱包

## 联系方式

如有任何问题或建议，请联系我们。
