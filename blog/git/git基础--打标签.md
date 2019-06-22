> git版本：v2.6
- 参考文档[打标签](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%89%93%E6%A0%87%E7%AD%BE)

![aaa](images/baidu.png)

## git tag
- git可以对某一时间点上的版本打上标签
- 人们在发布某个软件版本（如v1.0）的时候，j经常这么做
##### 列出已有标签
- `git tag`
- 如果标签较多，也可以加条件：`git tag -l 'v1.*'`

##### 新建标签
- 标签有`轻量级(lightweight)`的和`含附注的(annotated)`的
- 含附注标签可以加`-m 'xxxx'`参数写上备注或说明
```
轻量级：git tag v1.2
含附注：git tag -a v1.2 -m 'my 1.2 version'
```
- 可以通过`git show v1.2`查看相应标签的版本信息

##### 后期加注标签
- 有时候我们忘了在某个时候加个标签，或者想在之前的某个提交加注标签，如下：
```
git log --pretty=oneline //单行模式列出提交记录

4682c3261057305bdd616e23b64b0857d832627b added a todo file
166ae0c4d3f420721acbb115cc33848dfcc2121a started write support
9fceb02d0ae598e95dc970b74767f19372d61af8 updated rakefile
964f16d36dfccde844893cac5b347e7b3d44abbc commit the todo
8a5cbc430f1a9c3d00faaeffd07798508422908a updated readme

//这时候我想给updated ragefile这个节点打上一个v1.2标签，如下：
git tag -a v1.2 9fceb02

```

##### 分享标签（push到服务器）
- 默认情况下，`git push`命令并不会把标签传送到远端服务器上
- 只有显示命令才能分享标签到远端仓库
- 命令格式如同推送分支，如：`git push origin [tagname]`
- `git push origin v1.2`
- 如果需要一次性推送所有标签：`git push origin --tags`

##### 删除标签
- 删除本地的标签：`git tag -d <tagname>`
- 删除远程：`git push origin :refs/tags/<tagname>`
- 示例：
```
git tag -d v1.2
git push origin :refs/tags/v1.2
```

##### 检出标签
- 如果你想查看某个标签指向的文件版本，可以使用`git checkout <tagname>`
- 不过这个时候，你不能提交修改(因为处于**分离头指针[detached HEAD]**)，除非你在此标签上新建一个分支：
> git checkout -b <new-branch> <tagname>

