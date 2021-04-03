# websites

调用GitHub提供的API接口对该库的issues进行整理生成符合格式的json，做为[vhxubo/website-navigation](https://github.com/vhxubo/website-navigation)后端接口

## 工作流程

1. 监听仓库pull,issues[edited, deleted, closed, labeled, unlabeled]动态，使用GitHub Action触发`index.js`执行
2. 调用接口获取该仓库/指定仓库的所有lable
3. 遍历每个lable下面的数据，验证标题格式`[alt](https://xxxxxx)`
4. 转化为json文件
5. 上传更新

## 如何使用

1. fork本项目
2. 对[build.yml](.github/workflows/build.yml)进行环境配置，参见[环境配置](#环境配置)
3. 新建Issue，参见[格式定义](#格式定义)：在按要求填写内容之后，先点击`Submit new issue`，再设置label

### 环境配置

```yml
REPOSITORY=用户名/仓库名（默认配置为Action所在仓库）
TOKEN=OAuth授权TOKEN
```

PS：TOKEN可有可无，如果没有配置的话，一个小时只能使用60个请求，这要看你的标签数，获取所有标签时消耗一次请求，每获取一个标签内容消耗一次请求

### 格式定义

- issues的标题格式：`[alt](https://xxxxxx)`
- issues的内容：该网站的描述
- issues的状态：opened
- issues的label：有且仅有一个

**可以使用[复制 MarkDown 格式的超链接到剪贴板](https://greasyfork.org/zh-CN/scripts/403081-%E5%A4%8D%E5%88%B6-markdown-%E6%A0%BC%E5%BC%8F%E7%9A%84%E8%B6%85%E9%93%BE%E6%8E%A5%E5%88%B0%E5%89%AA%E8%B4%B4%E6%9D%BF)油猴脚本快速生成符合要求的格式**

## TODO

- 标签排序展示
- 增加更多自定义内容

## 参考

- [我在写blog的时候用到的github api接口 · Issue #4 · Aisen60/blog](https://github.com/Aisen60/blog/issues/4)

- [授权 OAuth 应用程序 - GitHub Docs](https://docs.github.com/cn/developers/apps/authorizing-oauth-apps)
