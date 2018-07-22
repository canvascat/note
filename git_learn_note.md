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

### 4. 撤销修改
`git checkout -- <fileName>` 回到最后一次 `git add`/`git commit` 时的状态，即删除所以未暂存的内容，丢弃工作区的修改
`git reset HEAD <fileName>` 撤销暂存区的修改（撤销 `git add` ）

### 5. 删除文件
`rm <fileName>` 删除文件
`git rm <fileName>` 从版本库删除文件

## 远程仓库
`git remote add origin xxx` 将本地仓库与远程仓库关联
`git push -u origin master` 将当前分支 master 推送到远程仓库，第一次添加`-u`会将本地 master 分支推送到远程新的 master 分支，并关联起来
`git clone xxx` 从远程仓库克隆到本地
git 支持 ssh 和 https 协议，但是 ssh 支持的原生 git 协议速度更快

### 1. 分支管理

#### 创建与合并分支
HEAD 指向当前分支
`git checkout -b dev` 创建并切换到 dev 分支
相当于
```bash
git branch dev # 创建dev分支
git checkout dev # 切换到dev分支
```
`git branch` 查看当前分支
```bash
git checkout master # 切换到master分支
git merge dev # 将dev分支合并到当前分支
```
`git merge`s 合并指定分支到当前分支
`git branch -d dev` 删除 dev 分支