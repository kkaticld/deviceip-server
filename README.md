# 设备IP查询服务

一个简单的Web服务器，用于返回访问设备的IP地址。

## 功能特点

- 访问 `/deviceip` 路径返回设备IP地址（JSON格式）
- 支持多种IP获取方式（处理代理、负载均衡等场景）
- 提供友好的Web界面

## 安装步骤

1. 确保已安装 Node.js（建议 v14 或更高版本）

2. 安装依赖：
```bash
cd deviceip-server
npm install
```

## 运行方法

启动服务器：
```bash
npm start
```

服务器将在 `http://localhost:3000` 上运行

## API使用

### 获取IP地址

**请求：**
```
GET /deviceip
```

**响应示例：**
```json
{
  "ip": "127.0.0.1",
  "timestamp": "2025-11-03T12:28:30.847Z"
}
```

### 首页

访问 `http://localhost:3000` 可以看到一个简单的Web界面，自动显示您的IP地址。

## 技术栈

- Node.js
- Express.js

## 注意事项

- 默认端口为 3000，可在 `server.js` 中修改
- 服务器会尝试从多个来源获取真实IP（支持代理场景）
- 本地访问时可能显示 `::1` 或 `127.0.0.1`（IPv6/IPv4 本地回环地址）

## Railway 部署

### 非交互式 CLI 部署

**前置要求：**
- Node.js 16+ 版本
- Railway CLI

**部署命令：**

```bash
# 1. 安装 Railway CLI（首次使用）
npm install -g @railway/cli

# 2. 登录 Railway（首次使用）
railway login

# 3. 一键部署（所有命令可以连续执行）
railway init --name deviceip-server && \
railway up --detach && \
railway service deviceip-server && \
railway domain
```

**说明：**
- `railway init --name deviceip-server` - 创建项目（可自定义项目名）
- `railway up --detach` - 上传代码并后台部署
- `railway service deviceip-server` - 链接到服务
- `railway domain` - 生成公开域名

**部署完成后：**
- 访问生成的域名 `https://xxx.up.railway.app/deviceip` 测试 API
- 预期返回：`{"ip":"你的IP地址","timestamp":"2025-11-03T14:22:24.614Z"}`

## 许可证

MIT