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

## 部署到Railway

详细的部署指南请查看 [`DEPLOYMENT.md`](DEPLOYMENT.md)

**推荐方案（无需升级Node.js）：**
1. 将代码推送到GitHub
2. 在Railway.app连接GitHub仓库
3. 自动部署完成

您的Railway Token已配置：`3bb63ba7-9c2e-40f2-a539-0ff11fc64f8a`

## 许可证

MIT