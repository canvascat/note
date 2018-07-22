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
`git log` 查看最近三条提交日志
`git log --pretty=oneline` 单行显示所以日志
`git reset --hard HEAD^` 回退到上个版本
`git reset --hard <commitId>` 回退到指定版本
`git reflog` 查看历史命令，用来撤销版本回退操作

### 2. 工作区和暂存区
隐藏的`.git`文件夹为git的版本库，其中的stage叫做暂存区
`git add`就是把文件添加到暂存区
然后通过`git commit`把暂存区的内容提交到当前分支
新建文件在没有`git add`之前的状态是Untracked的
add后会变为changes to be committed（已暂存）
commit后则是nothing to commit, working tree clean

### 3. 管理修改
`cat <fileName>` 在终端预览文件内容
`git commit` 只会提交 `git add` 后暂存区的内容
如果`git add`后再进行修改然后`git commit`就只会提交`git add`之前的内容
`git diff HEAD -- <fileName>` 查看工作区内文件和版本库中的差异
