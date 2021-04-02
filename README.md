# websites

- issues的标题格式必须遵守`[alt](https://xxxxxx)`
- issues的内容为该网站的描述
- issues需要为opened
- issues需要有label

## 操作方法

1. fork本项目
2. 对[build.yml](.github/workflows/build.yml)进行环境配置
3. 新建Issue：在按要求填写内容之后，先点击`Submit new issue`，再设置label

## 功能

调用GitHub提供的API接口对该库的issues进行整理生成符合格式的json，然后使用cdn进行加速，为后端接口

监听仓库pull,issues[edited, deleted, closed, labeled, unlabeled]动态，使用GitHub Action触发该项目执行

执行顺序：调用接口获取该仓库/指定仓库的所有lable，对每个lable下面的数据进行整理并返回json数据

## 环境配置

```yml
REPOSITORY=用户名/仓库名（若不设置则为GitHub Action所在仓库）
TOKEN=OAuth授权TOKEN
```

### 使用jsdelivr加速

https://cdn.jsdelivr.net/gh/[username]/[repos]/api/urls.json

GitHub Action运行结束后会输出属于该仓库的cdn连接

## 其他

- 每个issue设置一个标签，否则会重复出现
- 只获取未关闭的issues
- TOKEN可有可无，如果没有配置的话，一个小时只能使用60个请求，这要看你的标签数，获取所有标签时消耗一次请求，每获取一个标签内容消耗一次请求

## TODO

- 标签排序展示
- 增加更多自定义内容

## 参考

- [我在写blog的时候用到的github api接口 · Issue #4 · Aisen60/blog](https://github.com/Aisen60/blog/issues/4)

- [授权 OAuth 应用程序 - GitHub Docs](https://docs.github.com/cn/developers/apps/authorizing-oauth-apps)