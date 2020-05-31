---
title: 搭建个人博客 Hexo & Github Pages
date: 2016-04-07
path: '/build-your-blog-with-hexo-github-pages'
tldr: 工欲善其事，必先利其器。在开发过程中用到的软件有 Nodejs / Sublime Text3 / Git 等，参考资料主要是官方文档。
tags: ['Hexo']
cover: './cover.png'
---

最终效果图：
![SimonCorner](http://oaz5uxplb.bkt.clouddn.com/blog/blog-shot.png)

## 安装配置

### 安装

安装很简单，只需要几分钟的时间，前提是已经安装了 **Nodejs**

```
$ npm install -g hexo-cli
$ hexo -v
```

### 建立博客目录

```
$ hexo init <folder>
$ cd <folder>
$ npm install
```

上面的几行命令会把你指定的文件夹初始化为博客目录，目录如下：

<!-- more -->

```
<folder>
  _config.yml
  package.json
  scaffolds
  source
  	_drafts
  	_posts
  themes
```

### 配置

有关站点的配置都在 `<folder>/_config.yml` & `<folder>/themes/_config.yml` 文件中修改，具体参数参见[官方文档](https://hexo.io/zh-cn/docs/configuration.html)

### 命令

- `hexo init <folder>` 初始化
- `hexo new <title>` 新建文章
- `hexo generate` 生成静态文件
  <table><thead><tr><th>选项</th><th>描述</th></tr></thead><tbody><tr><td><code>-d</code>, <code>--deploy</code></td><td>文件生成后立即部署网站</td></tr><tr><td><code>-w</code>, <code>--watch</code></td><td>监视文件变动</td></tr></tbody></table>
- `hexo publish <title>` 发表草稿
- `heox server` 启动服务器
  <table><thead><tr><th>选项</th><th>描述</th></tr></thead><tbody><tr><td><code>-p</code>, <code>--port</code></td><td>重设端口</td></tr><tr><td><code>-s</code>, <code>--static</code></td><td>只使用静态文件</td></tr><tr><td><code>-l</code>, <code>--log</code></td><td>启动日记记录，使用覆盖记录格式</td></tr></tbody></table>
- `hexo deploy` 部署网站
  <table><thead><tr><th>参数</th><th>描述</th></tr></thead><tbody><tr><td><code>-g</code>, <code>--generate</code></td><td>部署之前预先生成静态文件</td></tr></tbody></table>
- `hexo clean` 清除缓存文件 `db.json` 和静态文件 `public`
- `hexo list` 列出网站资料

### 生成 RSS

安装 RSS 插件 `hexo-generator-feed` 插件

```
$ npm install hexo-generator-feed --save
```

编辑站点配置文件：

```yaml
feed:
  type: atom
  path: atom.xml
  limit: 20
```

### 生成 sitemap.xml

安装插件 `hexo-generator-sitemap`

```
$ npm install hexo-generator-sitemap --save
```

编辑配置文件：

```yaml
sitemap:
  path: sitemap.xml
```

### 通过 Git 方式部署

编辑站点配置文件，如果部署在 GitHub 上会自动检测 `branch`

```yaml
deploy:
  type: git
  repo: <repo URL>
  branch:
  message:
```

## 绑定域名

1. 首先得有个域名，申请域名的网站国外的有 [GoDaddy](https://sg.godaddy.com/) 等，国内的[万网](https://wanwang.aliyun.com)等
2. 在 `/source` 目录下新建 `CNAME` 文件，输入自己的域名 `coderfe.cn`
3. 登陆[DnsPod](https://www.dnspod.cn/)，添加域名解析，只需添加**第一项**和**第四项**就 OK

   ![解析记录](http://oaz5uxplb.bkt.clouddn.com/blog/dnspod.png)

## 用到的免费服务

- [七牛云存储](http://www.qiniu.com/)
- [DnsPod](https://www.dnspod.cn/)
- [多说](http://duoshuo.com/)

## 更新日志

> 2016-07-27 优化图片链接
