# Railway 部署指南

## 方案一：通过GitHub部署（推荐✅）

这是最简单的方式，不需要升级Node.js。

### 步骤：

1. **创建GitHub仓库**
   - 访问 https://github.com/new
   - 创建新仓库（例如：deviceip-server）
   - 不要初始化README等文件

2. **推送代码到GitHub**
   ```bash
   cd deviceip-server
   git remote add origin https://github.com/你的用户名/deviceip-server.git
   git branch -M main
   git push -u origin main
   ```

3. **在Railway部署**
   - 访问 https://railway.app
   - 使用GitHub登录
   - 点击 "New Project"
   - 选择 "Deploy from GitHub repo"
   - 选择 deviceip-server 仓库
   - Railway会自动检测Node.js项目并部署

4. **获取部署URL**
   - 部署完成后，点击项目
   - 在 "Settings" → "Domains" 中生成域名
   - 访问 `your-domain.up.railway.app/deviceip` 测试

---

## 方案二：使用Railway CLI部署

Railway CLI需要Node.js 16+版本。

### 1. 升级Node.js（如果需要）

**使用nvm升级：**
```bash
# 安装最新LTS版本
nvm install --lts

# 使用新版本
nvm use --lts

# 验证版本
node --version  # 应该显示 v18.x 或更高
```

### 2. 安装Railway CLI
```bash
npm install -g @railway/cli
```

### 3. 登录Railway
```bash
railway login
```
或使用token登录：
```bash
railway login --token 3bb63ba7-9c2e-40f2-a539-0ff11fc64f8a
```

### 4. 初始化并部署
```bash
cd deviceip-server
railway init
railway up
```

### 5. 生成公开域名
```bash
railway domain
```

---

## 方案三：手动使用Token部署

如果CLI有问题，可以使用Railway API：

```bash
cd deviceip-server

# 使用curl上传项目
curl -X POST https://backboard.railway.app/graphql/v2 \
  -H "Authorization: Bearer 3bb63ba7-9c2e-40f2-a539-0ff11fc64f8a" \
  -H "Content-Type: application/json" \
  -d '{"query":"mutation { projectCreate(input: {name: \"deviceip-server\"}) { id } }"}'
```

---

## 验证部署

部署成功后，访问以下URL测试：

- 首页：`https://your-domain.up.railway.app`
- API：`https://your-domain.up.railway.app/deviceip`

期望返回：
```json
{
  "ip": "你的IP地址",
  "timestamp": "2025-11-03T12:52:23.803Z"
}
```

---

## 环境变量配置（可选）

如果需要自定义端口或其他配置：

1. 在Railway项目中点击 "Variables"
2. 添加环境变量：
   - `PORT`: Railway会自动设置
   - 其他自定义变量可按需添加

---

## 故障排查

### 部署失败
- 检查 `package.json` 中的 `start` 脚本是否正确
- 确认 `node_modules` 已被 `.gitignore` 忽略
- 查看Railway部署日志

### 无法访问
- 确认已生成公开域名
- 检查服务是否正在运行
- 查看Railway的运行日志

### 端口错误
- 确认代码使用了 `process.env.PORT`
- Railway会自动注入PORT环境变量

---

## 当前推荐

由于您的Node.js版本是 v14.17.5，**推荐使用方案一（GitHub部署）**，这是最简单且无需升级的方式。

需要帮助完成部署吗？