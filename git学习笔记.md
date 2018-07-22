# git学习笔记

## 创建版本库

通过`git init`命令将文件夹变为git仓库
```bash
mkdir <folderName>
cd <folderName>
pwd
git init
```
`ls -ah`可以看见隐藏目录

## 版本管理

`git status`查看仓库当前状态
`git diff <fileName>`查看上次提交后修改内容
提交更改到仓库
```bash
git add <fileName>
git commit -m '提交信息'
```

### 1. 版本回退

