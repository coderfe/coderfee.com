---
title: macOS 折腾记
date: 2020-04-18
path: /macos/setup
tldr: macOS 折腾记：某一天脑子一抽把电脑还原了，之后折腾了半天，于是就有了这篇文章。
tags: ['工具']
cover: './cover.jpg'
---

## Homebrew

```shell
# 安装
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

# 配置国内镜像
git -C "$(brew --repo)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git

git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git

git -C "$(brew --repo homebrew/cask)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-cask.git

git -C "$(brew --repo homebrew/cask-fonts)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-cask-fonts.git

git -C "$(brew --repo homebrew/cask-drivers)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-cask-drivers.git

brew update

brew tap homebrew/cask-versions

brew tap homebrew/cask-fonts

brew cask install iterm2 alfred one-switch v2rayu google-chrome firefox-developer-edition microsoft-edge visual-studio-code-insiders adguard nvm jetbrains-toolbox font-jetbrains-mono appcleaner
```

- iTerm2 终端
- Alfred 快捷启动器（Alt + Space）
- One Switch 快捷切换工具（夜间模式、勿扰模式……）
- V2rayU 梯子
- Google Chrome 浏览器
- Firefox 浏览器
- Edge 浏览器
- VSCode Insiders 编辑器
- AdGuard 广告拦截
- nvm Node.js 版本管理工具
- JetBrains Toolbox JetBrains 全家桶
- JetBrains Mono 字体
- Appcleaner 软件卸载

## App Store

- Bear
- 印象笔记
- The Unarchive
- QQ 音乐
- 微信
- Spark
- MindNode

## 其他

- [NeatDownloadManager](https://www.neatdownloadmanager.com/)
- [腾讯柠檬](https://lemon.qq.com/)

## 终端优化

1. 使用 iTerm 替换系统自带终端，下载 iTerm 配色
2. 使用 Powerlevel10k 主题

   ```shell
   # 安装
   brew install romkatv/powerlevel10k/powerlevel10k
   echo 'source /usr/local/opt/powerlevel10k/powerlevel10k.zsh-theme' >>! ~/.zshrc

   # 修改 zshrc
   vim ~./zshrc
   ZSH_THEME="powerlevel10k/powerlevel10k"

   # 手动配置
   p10k configure
   ```

## Screenshoot

![screenshoot](./apps.png)

![screenshoot](./vscode.png)
