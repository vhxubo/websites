const axios = require('axios').default
const dayjs = require('dayjs')
const fs = require('fs')
const path = require('path')

require('dotenv').config()

if (process.env.TOKEN)
  axios.defaults.headers = {
    Authorization: `token ${process.env.TOKEN}`,
  }

if (!process.env.USERNAME || !process.env.REPOS) {
  console.log('需要配置好USERNAME和REPOS才可以正常使用')
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
    `https://api.github.com/repos/${process.env.USERNAME}/${process.env.REPOS}/labels`
  )

  // * axios的url记得encode，否则Request path contains unescaped characters
  const promises = labels.map(label =>
    axios.get(
      encodeURI(
        `https://api.github.com/repos/${process.env.USERNAME}/${process.env.REPOS}/issues?labels=${label.name}`
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

  const obj = {
    author: process.env.USERNAME,
    updateTime: dayjs().locale('zh-cn').format(),
    list,
  }

  console.log(JSON.stringify(obj, null, 2))

  fs.writeFile(path.join(__dirname, 'urls.json'), JSON.stringify(obj), e => {
    if (e) console.log(e)
  })
}

main()
