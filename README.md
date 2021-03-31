# websites

- issues标题格式必须遵守`[alt](https://xxxxxx)`
- issues内容为该标签的描述

## 功能

调用GitHub提供的API接口对该库的issues进行整理生成符合格式的json，然后使用cdn进行加速，为后端接口

监听issues动态，使用GitHub Action触发该项目执行

## 环境配置

```
USERNAME=用户名
REPOS=仓库名
TOKEN=OAuth授权TOKEN
```

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