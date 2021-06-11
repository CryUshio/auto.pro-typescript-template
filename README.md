# AutoJS Pro Typescript Template
## 快速开始
#### 安装依赖
```
npm install --registry=https://registry.npm.taobao.org
```
#### 重启编辑器
- 随便点开一个 ts 文件，如果有弹窗提示，选择 allow。这是 eslint 在请求权限。
- 重启编辑器刷新 eslint

#### 常用命令
##### npm run dev
启动 AutoJS Pro + web 构建，输出到 dist 文件夹。

##### npm run web
启动本地服务器，可在局域网内访问。在 `./config/config.ts` 中可以配置自己的本地电脑 IP，怎么查看请自行百度。

##### npm run build
打包整个项目到 dist 目录。

#### 温馨提示
- 如果发现控制台有一些奇怪的报错，请尝试删除编译缓存文件夹 `node_modules/.cache` 。
- 网页报错？那是因为你加载了一些只有在 AutoJS 里才能使用的 runtime，并且网站是通过局域网运行在你的电脑上的，电脑上没有 AutoJS 环境。想解决的话，加上环境判断，只在 AutoJS 下运行相关代码，本地跑的时候 mock 一下吧。
