### markdown博客生成器

#### 关键词
- markdown博客生成器，markdown静态网站生成器

#### 功能：
- 通过在文件夹中编写markdown文件，可以一键生成按照您的目录排版的静态页面

#### 使用方法
- `git clone`本项目
- `npm install`
- 项目根目录下创建您的博客文件夹：如`blog`
- 配置文件`config.js`（也可忽略此步，使用默认）
- 执行`node run.js`
- 拷贝`dist`文件夹下内容到您的web服务器目录
- 打开您的网站访问

#### 环境
- `nodeJs>=10.10`：需要使用`nodeJs`版本大于等于`10.10.0`
- 代码高亮使用`highlight.js`

#### 举例：
- 有一个笔记目录，文件结构如下：
```
--blog
  --javascript学习笔记
    --js高级程序.md
    --html5_CanvasAPI指南.md
  --java学习笔记
    --ssh学习指南.md
  --金融学习笔记
    --怎么理财.md
```
- 那么我们可以配置博客生成器
```
在config.js文件夹下配置:

// 采用的模板名词
const TEMPLATE_NAME = 'tp1'
// 模板路径
const TEMPLATE_PATH = './template'

// 博客路径
const BLOG_PATH = './blog'

```
- 然后执行`node run.js`
```
成功后会在dist文件夹下有静态页面
拷贝在您的服务器就行了
```

#### 其它
- 目前只有一个模板`tp1`