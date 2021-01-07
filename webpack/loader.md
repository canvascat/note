# 从 element-push 中学习 webpack loader

element-plus 的 website dev 起服务和打包都是用的 webpack，使用到了 `vue-loader` 来处理 `vue` 文件，使用 `babel-loader` 处理 `js/ts` 文件，样式文件和字体图标分别使用了对应的 `css-loader`， `url-loader` 等，相关配置在 `website/webpack.config.js` 中。

文档展示主要的 md 文件，使用了 `website/md-loader/index.js` 自己实现的 `md-loader`。

```js
const config = {
  //...
  module: {
    rules: [
      // ...
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false,
              },
            },
          },
          {
            loader: path.resolve(__dirname, './md-loader/index.js'),
          },
        ],
      },
      // ...
    ],
  },
  // ...
}
```

配置的 `module.rules` 属性就是针对资源模块的加载规则配置，其中的每个规则对象都需要设置 `test` 和 `use` 两个属性：

- test 属性，是一个正则表达式，用来匹配打包过程中所遇到文件路径，这里我们是以 .md 结尾；
- use 属性，用来指定匹配到的文件需要使用的 loader，这里用到的是自定义的 md-loader。

有了这些配置，打包过程会将 markdown 文件会交给 md-loader 处理过后再由 Webpack 打包。

```js
const md = require('./config')

module.exports = function(source) {
  const content = md.render(source)
  // ...
}
```

第一步使用 `md.render` 将输入的 md 文件内容解析为 html，定义在 `website/md-loader/config.js` 文件中，主要使 `markdown-it-chain` 进行md文件的解析，并配置 `markdown-it-anchor` 用于处理锚点，`markdown-it-container` 处理自定义 md 模块，`highlight.js` 处理代码高亮。自定义 :::demo 模块使用 `website/md-loader/container.js` 处理：

```js
const mdContainer = require('markdown-it-container')

module.exports = md => {
  md.use(mdContainer, 'demo', {
    validate(params) {
      return params.trim().match(/^demo\s*(.*)$/)
    },
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : ''
        const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : ''
        return `<demo-block>
        ${description ? `<div>${md.render(description)}</div>` : ''}
        <!--element-demo: ${content}:element-demo-->
        `
      }
      return '</demo-block>'
    },
  })

  md.use(mdContainer, 'tip')
  md.use(mdContainer, 'warning')
}
```

```js
  const startTag = '<!--element-demo:'
  const startTagLen = startTag.length
  const endTag = ':element-demo-->'
  const endTagLen = endTag.length

  let componenetsString = ''
  let id = 0 // demo 的 id
  let output = [] // 输出的内容
  let start = 0 // 字符串开始位置

  let commentStart = content.indexOf(startTag)
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen)
  while (commentStart !== -1 && commentEnd !== -1) {
    output.push(content.slice(start, commentStart))

    const commentContent = content.slice(commentStart + startTagLen, commentEnd)
    const html = stripTemplate(commentContent)
    const script = stripScript(commentContent)
    let demoComponentContent = genInlineComponentText(html, script)
    const demoComponentName = `element-demo${id}`
    output.push(`<template #source><${demoComponentName} /></template>`)
    componenetsString += `${JSON.stringify(demoComponentName)}: ${demoComponentContent},`

    // 重新计算下一次的位置
    id++
    start = commentEnd + endTagLen
    commentStart = content.indexOf(startTag, start)
    commentEnd = content.indexOf(endTag, commentStart + startTagLen)
  }

  // 仅允许在 demo 不存在时，才可以在 Markdown 中写 script 标签
  // todo: 优化这段逻辑

  let pageScript = ''
  if (componenetsString) {
    pageScript = `<script lang="ts">
      import * as Vue from 'vue';
      export default {
        name: 'component-doc',
        components: {
          ${componenetsString}
        }
      }
    </script>`
  } else if (content.indexOf('<script>') === 0) { // 硬编码，有待改善
    start = content.indexOf('</script>') + '</script>'.length
    pageScript = content.slice(0, start)
  }

  output.push(content.slice(start))
  const result = `
  <template>
    <section class="content element-doc">
      ${output.join('')}
    </section>
  </template>
  ${pageScript}
  `
  return result
```

然后通过 `'<!--element-demo:'` 和 `':element-demo-->'` 两个标签匹配 demo 内容，使用 `stripTemplate` 和 `stripScript` 方法匹配 `<template>` 和 `<script>` 标签内容，并使用 `genInlineComponentText` 组装。componenetsString 是用来拼接注册components，output则是存储最后输出的字符串。最后将所有的字符组装为一个 vue 文件格式的字符串输出，后面的处理就交给 vue-loader 处理。

这里可以发现，多个 Loader 执行顺序是 **从后往前执行** 的。

