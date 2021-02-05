#!/bin/bash

# 更新web数据
cd /data/gitee/nuobel_blog
git pull


# 安装更新
#npm install

# 打包
npm run build

# 删除资源
#rm -rf /data/web/default/*

# 等待30s
sleep 30s

# 移动资源
cp -rf ./public/*  /data/web/default/

# 删除
#rm -r ./dist

## 
echo "更新web服务成功$(date '+%Y-%m-%d %H:%M:%S')"