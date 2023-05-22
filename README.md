## 样式校验

基于[stylelint](https://stylelint.io/)进行样式校验，支持校验 `.css` `.scss` `.vue`，结合[vscode-stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)插件在[vscode](https://code.visualstudio.com/)中实时对样式错误或警告进行提示

下述命令行可对所有样式文件（忽略的排除在外）进行校验并对错误及警告尝试修复

```sh
npm run stylelint
```

## 脚本校验

基于[eslint](https://eslint.org/)进行代码校验，结合[vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)插件在[vscode](https://code.visualstudio.com/)中实时对脚本错误或警告进行提示

下述命令行可对所有脚本（忽略的排除在外）进行校验并对错误及警告尝试修复

```sh
npm run lint
```

## 代码美化

基于[prettier](https://prettier.io/)进行代码美化，结合[prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)插件在[vscode](https://code.visualstudio.com/)中对文件进行保存时自动美化代码

下述命令行可对所有文件（忽略的排除在外）进行代码美化

```sh
npm run format
```

## TodoTree

基于[vscode](https://code.visualstudio.com/)插件[todo-tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)

```sh
// BUG ...
// FIXME ...
// TODO ...
// HACK ...
// XXX ...
// TAG ...
// DONE ...
// NOTE ...
// INFO ...
```

## Git Commit Message 规范

Commit Message 包括 `type`、`scope`、`subject` 三部分，其中 `type`、`subject` 是必须的，而 `scope` 是可选的。

```sh
<type>(<scope>): <subject>
```

**type** 用于说明 commit 的类型，只允许使用下面几个标识：

- **feat** 新功能
- **fix** 修复 bug
- **docs** 仅包含文档的修改
- **style** 格式化变动，不影响代码逻辑。比如删除多余的空白，删除分号等
- **refactor** 重构，既不是新增功能，也不是修改 bug 的代码变动
- **perf** 性能优化
- **test** 增加测试
- **build** 构建工具或外部依赖包的修改，比如更新依赖包的版本等
- **ci** 持续集成的配置文件或脚本的修改
- **chore** 杂项，其他不修改源代码与测试代码的修改
- **revert** 撤销某次提交

## 命名规范

- **组件文件名称** 采用 `UpperCamelCase` 命名法
- **目录名称** 采用 `kebab-case` 命名法
- **其他文件名称** 采用 `kebab-case` 命名法

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```
