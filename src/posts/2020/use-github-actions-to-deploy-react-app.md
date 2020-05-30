---
title: 使用 GitHub Actions 将 React App 部署到 GitHub Pages
date: 2020-05-05
path: '/2020/use-github-actions-to-deploy-react-app'
tldr: 简单记录一下使用 GitHub Action 的过程
tags: ['CI', '工具', 'React', 'GitHub Pages']
---

最近接到一个需求，做一个类似下面这种页面的 demo，原本让用小程序实现，但是后来发现貌似没法用小程序实现，就改用 Web 来实现了。后来给别人展示的时候，发现我总不能发给人家一堆 node_modules 呀，于是就想部署到 GitHub Pages。其实不用 GitHub Actions 也可以，只不过每次 push 之后多敲一次命令：`npm run deploy`，但是偷懒也应该要认真偷。

## 手动部署

由于这个项目是用 create-react-app 生成的，所以参考一下它的[部署文档]()，可以看到其实挺简单的：

1. 在 `package.json` 中添加 `homepage` 字段，其中 `<my-app>` 可以是项目名称

   ```json
   "homepage": "https://myusername.github.io/<my-app>"
   ```

2. 安装 `gh-pages` 依赖，并在 `package.json` 添加 `deploy` 脚本，其中 `predeploy` 会在 `deploy` 脚本运行之前自动执行

   ```shell
   npm i -D gh-pages
   ```

   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```

3. 运行 `deploy` 脚本

   ```shell
   npm run deploy
   ```

有可能遇到 gh-pages 分支无法创建的问题，运行下面的命令，清一下缓存就 OK 了：

```shell
rm -rf node_modules/gh-pages/.cache
```

## GitHub Actions 部署

GitHub Actions 做的是同样的事情，只不过把 `npm run deploy` 这一步交给了 CI 来做。

1. 创建一个 workflow 文件

   ```shell
   touch .github/.main.yaml
   ```

2. 修改内容

   ```yaml
   name: CI

   on:
     push:
       branches: [ master ]
     pull_request:
       branches: [ master ]

   jobs:
     build:
       runs-on: ubuntu-latest
         steps:
         - uses: actions/checkout@v2

         - name: Use Node.js ${{ matrix.node-version }}
           uses: actions/setup-node@v1
           with:
             node-version: ${{ matrix.node-version }}

        -  name: Deploy
           run: |
             git config user.name <username>
             git config user.email <email>
             git remote set-url origin https://${{ secrets.<personal_access_token> }}@github.com/<user>/<repo>.git
             npm install
             npm run deploy
   ```

3. 最后将 `<>` 内的内容替换自己的配置即可，其中 `<personal_access_token>` 需要在生成以后添加到项目里的 `secrets` 里

到这里就完成了，只要触发 `push` 操作，GitHub Actions 就会自动运行部署。
