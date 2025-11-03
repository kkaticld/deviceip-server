const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// 获取客户端IP地址的辅助函数
function getClientIP(req) {
  // 按优先级检查各种可能的IP来源
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    // x-forwarded-for 可能包含多个IP，取第一个
    return forwarded.split(',')[0].trim();
  }
  
  const realIP = req.headers['x-real-ip'];
  if (realIP) {
    return realIP;
  }
  
  // 使用连接的远程地址
  return req.connection.remoteAddress || 
         req.socket.remoteAddress || 
         req.connection.socket.remoteAddress ||
         req.ip;
}

// /deviceip 路径返回设备IP地址
app.get('/deviceip', (req, res) => {
  const clientIP = getClientIP(req);
  
  // 返回JSON格式的响应
  res.json({
    ip: clientIP,
    timestamp: new Date().toISOString()
  });
});

// 首页
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>设备IP查询服务</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 50px auto;
          padding: 20px;
          background-color: #f5f5f5;
        }
        .container {
          background: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
          color: #333;
        }
        .info {
          background: #e8f4f8;
          padding: 15px;
          border-radius: 4px;
          margin: 20px 0;
        }
        code {
          background: #f4f4f4;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: monospace;
        }
        a {
          color: #0066cc;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>设备IP查询服务</h1>
        <div class="info">
          <h3>如何使用：</h3>
          <p>访问 <a href="/deviceip"><code>/deviceip</code></a> 路径可以获取您的IP地址</p>
        </div>
        <p>您的当前IP地址：<strong id="ip">加载中...</strong></p>
      </div>
      <script>
        // 自动获取并显示IP
        fetch('/deviceip')
          .then(response => response.json())
          .then(data => {
            document.getElementById('ip').textContent = data.ip;
          })
          .catch(error => {
            document.getElementById('ip').textContent = '获取失败';
          });
      </script>
    </body>
    </html>
  `);
});

// 启动服务器
app.listen(port, () => {
  console.log(`设备IP服务运行在 http://localhost:${port}`);
  console.log(`访问 http://localhost:${port}/deviceip 获取IP地址`);
});