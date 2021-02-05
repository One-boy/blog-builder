/**
 *  接受码云webhooks 请求，更新nuobel.com网站数据
 */

const { exec } = require("child_process")
const bodyParser = require("body-parser")
const express = require("express")
const app = express()

// 监听端口，测试
const PORT = 443
// 密码
const PASSWORD = "123456"

app.use(bodyParser.json())

app.post("/webhook", function (req, res) {
  res.send("收到！")
  console.log("收到码云post请求", req.headers)
  if (
    req.headers &&
    req.headers["x-gitee-token"] &&
    req.headers["x-gitee-token"] === PASSWORD
  ) {
    if (req.body && req.body.ref === "refs/heads/blog-release") {
      console.log("token和refs验证通过，更新web服务。")
      exec("/bin/bash ./reBuild.sh", (error, stdout, stderr) => {
        if (error) {
          console.error(error)
          return
        }
        console.log("stdout:", stdout)
      })
    }
  }
})

// 监听服务
console.log("正在启动服务...")
app.listen(PORT, "", () => {
  console.log(`服务已启动，监听${PORT}端口`)
})
