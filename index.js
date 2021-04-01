const axios = require('axios').default
const dayjs = require('dayjs')
const fs = require('fs')
const path = require('path')

require('dotenv').config()
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)

if (process.env.TOKEN)
  axios.defaults.headers = {
    Authorization: `token ${process.env.TOKEN}`,
  }

if (!process.env.REPOSITORY) {
  console.log('需要配置好REPOSITORY才可以正常使用')
  return
}

// 数据格式化
function createItem({ title, body: description }) {
  const result = title.match(/\[(.*?)\]\((.*?)\)/)
  return {
    name: result[1],
    url: result[2],
    description,
  }
}

async function main() {
  // 获取标签
  const { data: labels } = await axios.get(
    `https://api.github.com/repos/${process.env.REPOSITORY}/labels`
  )

  // * axios的url记得encode，否则Request path contains unescaped characters
  const promises = labels.map(label =>
    axios.get(
      encodeURI(
        `https://api.github.com/repos/${process.env.REPOSITORY}/issues?labels=${label.name}`
      )
    )
  )

  const result = await Promise.all(promises)
  const list = []

  for (let i in result) {
    const { data: items } = result[i]

    const label = labels[i]
    if (items.length === 0) {
      continue
    }

    const newItems = []
    for (let item of items) {
      if (/\[(.*?)\]\((.*?)\)/.test(item.title)) newItems.push(createItem(item))
    }

    list.push({
      label: label.name,
      items: newItems,
    })
  }

  // 在之前就遇到过这种情况，欸，搞成i18n了，应该是时区切换
  const obj = {
    author: process.env.REPOSITORY.split('/')[0],
    github: `https://github.com/${process.env.REPOSITORY}`,
    updateTime: dayjs().tz('Asia/ShangHai').format(),
    list,
  }

  console.log(JSON.stringify(obj, null, 2))

  if (!fs.existsSync('api')) {
    fs.mkdirSync('api')
  }

  fs.writeFileSync(path.join(__dirname, '/api/urls.json'), JSON.stringify(obj))

  console.log(
    `api url: https://cdn.jsdelivr.net/gh/${process.env.REPOSITORY}/api/urls.json`
  )
}

main()
