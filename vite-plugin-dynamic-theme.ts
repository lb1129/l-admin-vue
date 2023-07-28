import { type PluginOption, createFilter } from 'vite'
import { generate } from '@ant-design/colors'

const filter = createFilter(/.css|less|sass|scss|stylus$/)

function vitePluginDynamicTheme(color: string): PluginOption {
  const colors = generate(color)
  const matchColors = [colors[5], colors[4], colors[0]]
  let styleStr = ''
  const hadTransform = new Set()
  function loop(code: string) {
    let idx = -1
    let done = false
    let result = ''
    while (!done) {
      ++idx
      const char = code[idx]
      const nextChar = code[idx + 1]
      let closeIdx = -1
      // 注释区块跳过
      if (char === '/') {
        /* */
        if (nextChar === '*') {
          closeIdx = code.indexOf('*/', idx + 2)
          if (closeIdx > -1) {
            idx = closeIdx + 1
          } else {
            // 文件内容有错误
            done = true
          }
        } else if (nextChar === '/') {
          //
          closeIdx = code.indexOf('\n', idx + 2)
          if (closeIdx > -1) {
            idx = closeIdx + 1
          } else {
            // 文件内容有错误
            done = true
          }
        } else {
          // 文件内容有错误
          done = true
        }
      } else {
        // 样式区块
        // 选择器结束idx
        const selectorEndIdx = code.indexOf('{', idx)
        if (selectorEndIdx > -1) {
          let selectorStyleEndIdx = -1
          // 选择器样式结束idx 需考虑嵌套
          let nestDone = false
          let nestIdx = selectorEndIdx
          let hadNest = false
          let hadNestFlag = false
          while (!nestDone) {
            ++nestIdx
            const nestChar = code[nestIdx]
            const nestNextChar = code[nestIdx + 1]
            let nestCloseIdx = -1
            // 注释区块跳过
            if (nestChar === '/') {
              /* */
              if (nestNextChar === '*') {
                nestCloseIdx = code.indexOf('*/', nestIdx + 2)
                if (nestCloseIdx > -1) {
                  nestIdx = nestCloseIdx + 1
                } else {
                  // 文件内容有错误
                  nestDone = true
                }
              } else if (nestNextChar === '/') {
                //
                nestCloseIdx = code.indexOf('\n', nestIdx + 2)
                if (nestCloseIdx > -1) {
                  nestIdx = nestCloseIdx + 1
                } else {
                  // 文件内容有错误
                  nestDone = true
                }
              }
            } else {
              if (nestChar === '{') {
                hadNest = true
                hadNestFlag = true
              } else if (nestChar === '}') {
                if (hadNest) hadNest = false
                else {
                  selectorStyleEndIdx = nestIdx
                  nestDone = true
                }
              }
            }
            if (nestIdx === code.length - 1) {
              nestDone = true
            }
          }
          if (selectorStyleEndIdx > -1) {
            const styleBlockStr = code.slice(selectorEndIdx + 1, selectorStyleEndIdx)
            if (hadNestFlag) {
              const nestRes = loop(styleBlockStr)
              if (nestRes) result += `${code.slice(idx, selectorEndIdx + 1)}${nestRes}}`
            } else {
              // 过滤包含颜色值的样式项 其他样式项不要
              const styleBlockArr = styleBlockStr.split(';')
              const styleBlockHadColorArr = styleBlockArr.filter((block) =>
                matchColors.some((color) => block.indexOf(color) > -1)
              )
              if (
                styleBlockHadColorArr.length &&
                // NOTE 排除 ant-btn:hover (可抽取成配置参数)
                code.slice(idx, selectorEndIdx + 1).indexOf('.ant-btn:hover') === -1
              ) {
                // 将样式区块加入结果中
                result += `${code.slice(idx, selectorEndIdx + 1)}${styleBlockHadColorArr.join(
                  ';'
                )}}`
              }
            }
            idx = selectorStyleEndIdx
          } else {
            // 文件内容有错误
            done = true
          }
        } else {
          // 文件内容有错误
          done = true
        }
      }
      if (idx === code.length - 1) {
        done = true
      }
    }
    return result
  }
  // NOTE 额外要处理的样式 (可抽取成配置参数)
  const extraStyle = `.ant-btn:not(.ant-btn-primary):hover, .ant-btn:not(.ant-btn-primary):focus{
    color: #40a9ff;
    border-color: #40a9ff;
  }`
  return {
    name: 'vite-plugin-dynamic-theme',
    transformIndexHtml() {
      return [
        {
          tag: 'style',
          attrs: {
            type: 'text/css',
            'data-color': colors[5],
            id: 'vite-plugin-dynamic-theme'
          },
          children: `${styleStr}${extraStyle}`,
          injectTo: 'body'
        }
      ]
    },
    transform(code, id) {
      if (filter(id)) {
        if (!hadTransform.has(id)) {
          hadTransform.add(id)
          styleStr += loop(code)
        }
      }
    }
  }
}

export default vitePluginDynamicTheme
